"use client"

import { useState } from "react"
import { AmigosTable } from "./AmigosTable"
import { AmigoForm } from "./AmigoForm"
import { AmigoDetails } from "./AmigoDetails"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export function AmigosManager() {
  const [view, setView] = useState("list")
  const [selectedAmigo, setSelectedAmigo] = useState(null)
  const [refreshKey, setRefreshKey] = useState(0)

  const handleAdd = () => {
    setSelectedAmigo(null)
    setView("add")
  }

  const handleEdit = (amigo) => {
    setSelectedAmigo(amigo)
    setView("edit")
  }

  const handleView = (amigo) => {
    setSelectedAmigo(amigo)
    setView("details")
  }

  const handleSuccess = () => {
    setView("list")
    setSelectedAmigo(null)
    setRefreshKey((prev) => prev + 1)
  }

  const handleCancel = () => {
    setView("list")
    setSelectedAmigo(null)
  }

  return (
    <div className="space-y-6">
      {view === "list" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Lista de Amigos</h2>
            <Button onClick={handleAdd} className="gap-2">
              <Plus className="h-4 w-4" />
              Agregar Amigo
            </Button>
          </div>
          <AmigosTable
            key={refreshKey}
            onEdit={handleEdit}
            onView={handleView}
            onRefresh={() => setRefreshKey((prev) => prev + 1)}
          />
        </div>
      )}

      {(view === "add" || view === "edit") && (
        <AmigoForm amigo={selectedAmigo} onSuccess={handleSuccess} onCancel={handleCancel} />
      )}

      {view === "details" && selectedAmigo && (
        <AmigoDetails amigo={selectedAmigo} onEdit={() => handleEdit(selectedAmigo)} onBack={handleCancel} />
      )}
    </div>
  )
}
