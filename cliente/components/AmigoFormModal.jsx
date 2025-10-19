"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function AmigoFormModal({ isOpen, onClose, onSubmit, editingAmigo }) {
  const [formData, setFormData] = useState({
    nombre: "",
    fechaCumple: "",
    timestamp: "",
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (editingAmigo) {
      setFormData({
        nombre: editingAmigo.nombre || "",
        fechaCumple: editingAmigo.fechaCumple
          ? new Date(editingAmigo.fechaCumple).toISOString().split("T")[0]
          : "",
      })
    } else {
      setFormData({ nombre: "", fechaCumple: "" })
    }
    setErrors({})
  }, [editingAmigo, isOpen])

  const validate = () => {
    const newErrors = {}

    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es obligatorio"
    } else if (formData.nombre.trim().length < 10) {
      newErrors.nombre = "El nombre debe tener al menos 10 caracteres"
    }

    if (!formData.fechaCumple) {
      newErrors.fechaCumple = "La fecha de cumpleaños es obligatoria"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validate()) return

    setIsSubmitting(true)
    try {
      await onSubmit(formData)
      setFormData({ nombre: "", fechaCumple: "" })
      setErrors({})
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">{editingAmigo ? "Editar Amigo" : "Nuevo Amigo"}</DialogTitle>
          <DialogDescription>
            {editingAmigo ? "Actualiza la información de tu amigo" : "Completa los datos para agregar un nuevo amigo"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="nombre">
              Nombre <span className="text-destructive">*</span>
            </Label>
            <Input
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Ingresa el nombre completo"
              className={errors.nombre ? "border-destructive" : ""}
              autoFocus
            />
            {errors.nombre && <p className="text-sm text-destructive">{errors.nombre}</p>}
            <p className="text-xs text-muted-foreground">Mínimo 10 caracteres</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="fechaCumple">
              Fecha de Cumpleaños <span className="text-destructive">*</span>
            </Label>
            <Input
              id="fechaCumple"
              name="fechaCumple"
              type="date"
              value={formData.fechaCumple}
              onChange={handleChange}
              className={errors.fechaCumple ? "border-destructive" : ""}
            />
            {errors.fechaCumple && <p className="text-sm text-destructive">{errors.fechaCumple}</p>}
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Guardando..." : editingAmigo ? "Actualizar" : "Crear"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
