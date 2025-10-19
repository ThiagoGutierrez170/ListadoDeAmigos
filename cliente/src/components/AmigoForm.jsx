"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, ArrowLeft } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function AmigoForm({ amigo, onSuccess, onCancel }) {
  const [nombre, setNombre] = useState("")
  const [fechaCumpleanos, setFechaCumpleanos] = useState("")
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    if (amigo) {
      setNombre(amigo.nombre)
      setFechaCumpleanos(amigo.fechaCumpleanos)
    }
  }, [amigo])

  const validate = () => {
    const newErrors = {}

    if (!nombre.trim()) {
      newErrors.nombre = "El nombre es obligatorio"
    } else if (nombre.trim().length < 10) {
      newErrors.nombre = "El nombre debe tener al menos 10 caracteres"
    }

    if (!fechaCumpleanos) {
      newErrors.fechaCumpleanos = "La fecha de cumpleaños es obligatoria"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validate()) return

    try {
      setLoading(true)

      const url = amigo ? `/api/amigos/${amigo.id}` : "/api/amigos/nuevo"
      const method = amigo ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: nombre.trim(),
          fechaCumpleanos,
        }),
      })

      if (!response.ok) throw new Error("Error al guardar")

      toast({
        title: "Éxito",
        description: amigo ? "Amigo actualizado correctamente" : "Amigo agregado correctamente",
      })

      onSuccess()
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo guardar el amigo",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <Button variant="ghost" size="icon" onClick={onCancel} aria-label="Volver">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <CardTitle>{amigo ? "Editar Amigo" : "Agregar Nuevo Amigo"}</CardTitle>
            <CardDescription>
              {amigo ? "Actualiza la información del amigo" : "Completa el formulario para agregar un nuevo amigo"}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="nombre">
              Nombre <span className="text-destructive">*</span>
            </Label>
            <Input
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Ingresa el nombre completo (mínimo 10 caracteres)"
              className={errors.nombre ? "border-destructive" : ""}
              disabled={loading}
            />
            {errors.nombre && <p className="text-sm text-destructive">{errors.nombre}</p>}
            <p className="text-xs text-muted-foreground">{nombre.length}/10 caracteres mínimos</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="fechaCumpleanos">
              Fecha de Cumpleaños <span className="text-destructive">*</span>
            </Label>
            <Input
              id="fechaCumpleanos"
              type="date"
              value={fechaCumpleanos}
              onChange={(e) => setFechaCumpleanos(e.target.value)}
              className={errors.fechaCumpleanos ? "border-destructive" : ""}
              disabled={loading}
            />
            {errors.fechaCumpleanos && <p className="text-sm text-destructive">{errors.fechaCumpleanos}</p>}
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Guardando...
                </>
              ) : amigo ? (
                "Actualizar Amigo"
              ) : (
                "Agregar Amigo"
              )}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
