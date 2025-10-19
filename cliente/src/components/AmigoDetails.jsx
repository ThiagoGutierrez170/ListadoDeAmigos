"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Calendar, Clock, User } from "lucide-react"
import { formatDate } from "@/lib/date-utils"

export function AmigoDetails({ amigo, onEdit, onBack }) {
  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <Button variant="ghost" size="icon" onClick={onBack} aria-label="Volver">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <CardTitle>Detalles del Amigo</CardTitle>
            <CardDescription>Información completa del amigo</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
            <User className="h-5 w-5 text-primary mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-muted-foreground mb-1">Nombre</p>
              <p className="text-lg font-semibold">{amigo.nombre}</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
            <Calendar className="h-5 w-5 text-primary mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-muted-foreground mb-1">Fecha de Cumpleaños</p>
              <p className="text-lg font-semibold">{formatDate(amigo.fechaCumpleanos)}</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
            <Clock className="h-5 w-5 text-primary mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-muted-foreground mb-1">Fecha de Registro</p>
              <p className="text-lg font-semibold">{formatDate(amigo.fechaRegistro)}</p>
            </div>
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <Button onClick={onEdit} className="flex-1">
            Editar Amigo
          </Button>
          <Button variant="outline" onClick={onBack}>
            Volver
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
