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

  // Función de mapeo robusta (Ya la tenías, la mantenemos para seguridad)
  const mapAmigoId = (amigo) => ({
    ...amigo,
    id: amigo.id || (amigo._id ? amigo._id.toString() : undefined)
  })

  const fetchAmigos = useCallback(async () => {
    try {
      setLoading(true)
      const response = await fetch(`${API_BASE_URL}/listar`)
      if (!response.ok) throw new Error("Error al cargar amigos")
      const data = await response.json()

      const amigosConId = data.map(mapAmigoId); // Usamos la función de mapeo

      setAmigos(amigosConId)
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
      // Paso 1: Obtener los datos individuales (se necesita el ID)
      const response = await fetch(`${API_BASE_URL}/buscar/${id}`)
      if (!response.ok) throw new Error("Error al cargar amigo")

      const data = await response.json()

      // Paso 2: Usar la función de mapeo para asegurar que el objeto tenga 'id'
      const amigoConId = mapAmigoId(data);

      setEditingAmigo(amigoConId); // <-- ¡El objeto editingAmigo ahora tiene 'id'!
      setIsFormOpen(true)
    } catch (error) {
      console.error("[v0] Error completo:", error)
      showToast("Error al cargar los datos del amigo", "error")
    }
  }

  const handleDelete = (amigo) => {
    // Paso 3: Asegurar que el objeto a eliminar tiene 'id'
    setDeletingAmigo(mapAmigoId(amigo))
  }

  const confirmDelete = async () => {
    try {
      // Aquí deletingAmigo.id YA debe ser válido gracias a mapAmigoId en handleDelete
      console.log("ID de eliminación:", deletingAmigo.id);
      if (!deletingAmigo.id) throw new Error("ID de eliminación no encontrado.")

      const response = await fetch(`${API_BASE_URL}/${deletingAmigo.id}`, {
        method: "DELETE",
      })
      if (!response.ok) throw new Error("Error al eliminar amigo")

      await fetchAmigos()
      showToast("Amigo eliminado exitosamente", "success")
      setDeletingAmigo(null)
    } catch (error) {
      showToast(`Error al eliminar: ${error.message}`, "error")
      console.error(error)
    }
  }

  // components/AmigosApp.jsx
  const handleSubmit = async (formData) => {
    try {
      // Paso 4: Construcción segura de la URL para PUT/POST
      // Si estamos editando, usamos editingAmigo.id. Si es null, es 'nuevo'.
      const id = editingAmigo?.id;

      const url = id ? `${API_BASE_URL}/${id}` : `${API_BASE_URL}/nuevo`
      const method = id ? "PUT" : "POST"

      // Registro de seguridad
      console.log(`[v0] Intentando ${method} en URL: ${url}`)
      if (id && !id.includes('-') && id.length !== 24) {
        console.warn("[v0] ID parece no ser un ObjectId válido, pero se está usando.")
      }

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        // Manejo de errores de la API (lo dejaste bien, lo mantengo)
        const errorText = await response.text()
        let errorMessage = `Error ${response.status}: ${response.statusText}`
        try {
          const errorData = JSON.parse(errorText)
          errorMessage = errorData.error || errorData.message || errorText
        } catch {
          errorMessage = errorText || errorMessage
        }
        throw new Error(errorMessage)
      }

      await fetchAmigos()
      showToast(id ? "Amigo actualizado exitosamente" : "Amigo creado exitosamente", "success")
      setIsFormOpen(false)
      setEditingAmigo(null)
    } catch (error) {
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