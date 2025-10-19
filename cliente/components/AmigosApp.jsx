"use client"

import { useState, useEffect, useCallback } from "react"
import AmigosList from "./AmigosList"
import AmigoFormModal from "./AmigoFormModal"
import DeleteConfirmModal from "./DeleteConfirmModal"
import Toast from "./Toast"
import { Button } from "@/components/ui/button"
import { UserPlus } from "lucide-react"

const API_BASE_URL = "http://localhost:8080/api/amigos"

export default function AmigosApp() {
  const [amigos, setAmigos] = useState([])
  const [loading, setLoading] = useState(true)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingAmigo, setEditingAmigo] = useState(null)
  const [deletingAmigo, setDeletingAmigo] = useState(null)
  const [toast, setToast] = useState(null)

  const showToast = useCallback((message, type = "success") => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 4000)
  }, [])

  const fetchAmigos = useCallback(async () => {
    try {
      setLoading(true)
      const response = await fetch(`${API_BASE_URL}/listar`)
      if (!response.ok) throw new Error("Error al cargar amigos")
      const data = await response.json()
      setAmigos(data)
    } catch (error) {
      showToast("Error al cargar la lista de amigos", "error")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }, [showToast])

  useEffect(() => {
    fetchAmigos()
  }, [fetchAmigos])

  const handleCreate = () => {
    setEditingAmigo(null)
    setIsFormOpen(true)
  }

  const handleEdit = async (id) => {
    try {
      console.log("[v0] Editando amigo con ID:", id)
      const response = await fetch(`${API_BASE_URL}/buscar/${id}`)
      console.log("[v0] Response status:", response.status)

      if (!response.ok) throw new Error("Error al cargar amigo")

      const data = await response.json()
      console.log("[v0] Datos recibidos de la API:", data)
      console.log("[v0] Tipo de fechaCumpleanos:", typeof data.fechaCumpleanos)

      setEditingAmigo(data)
      setIsFormOpen(true)
    } catch (error) {
      console.error("[v0] Error completo:", error)
      showToast("Error al cargar los datos del amigo", "error")
    }
  }

  const handleDelete = (amigo) => {
    setDeletingAmigo(amigo)
  }

  const confirmDelete = async () => {
    try {
      console.log("ID de eliminación:", deletingAmigo.id);
      const response = await fetch(`${API_BASE_URL}/${deletingAmigo.id}`, {
        method: "DELETE",
      })
      if (!response.ok) throw new Error("Error al eliminar amigo")

      await fetchAmigos()
      showToast("Amigo eliminado exitosamente", "success")
      setDeletingAmigo(null)
    } catch (error) {
      showToast("Error al eliminar el amigo", "error")
      console.error(error)
    }
  }

  // components/AmigosApp.jsx
  const handleSubmit = async (formData) => {
    try {
      const url = editingAmigo ? `${API_BASE_URL}/${editingAmigo.id}` : `${API_BASE_URL}/nuevo`
      const method = editingAmigo ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        // 1. Intenta leer el cuerpo del error (si es JSON)
        const errorText = await response.text()
        let errorMessage = `Error ${response.status}: ${response.statusText}`
        try {
          const errorData = JSON.parse(errorText)
          errorMessage = errorData.message || errorText // Asume que el backend devuelve un objeto { message: "..." }
        } catch {
          // Si no es JSON, usa el texto crudo o el estado HTTP
          errorMessage = errorText || errorMessage
        }

        // Muestra el mensaje de error específico de la API
        throw new Error(errorMessage)
      }

      await fetchAmigos()
      showToast(editingAmigo ? "Amigo actualizado exitosamente" : "Amigo creado exitosamente", "success")
      setIsFormOpen(false)
      setEditingAmigo(null)
    } catch (error) {
      // Muestra el mensaje de error capturado, que ahora puede ser el de la API
      showToast(`Error al guardar: ${error.message}`, "error")
      console.error(error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-4xl font-bold text-gray-900">Gestión de Amigos</h1>
            <Button onClick={handleCreate} size="lg" className="gap-2">
              <UserPlus className="w-5 h-5" />
              Nuevo Amigo
            </Button>
          </div>
          <p className="text-muted-foreground text-lg">Administra tu lista de amigos y sus fechas importantes</p>
        </div>

        <AmigosList amigos={amigos} loading={loading} onEdit={handleEdit} onDelete={handleDelete} />

        <AmigoFormModal
          isOpen={isFormOpen}
          onClose={() => {
            setIsFormOpen(false)
            setEditingAmigo(null)
          }}
          onSubmit={handleSubmit}
          editingAmigo={editingAmigo}
        />

        <DeleteConfirmModal
          isOpen={!!deletingAmigo}
          onClose={() => setDeletingAmigo(null)}
          onConfirm={confirmDelete}
          amigoName={deletingAmigo?.nombre}
        />

        {toast && <Toast message={toast.message} type={toast.type} />}
      </div>
    </div>
  )
}
