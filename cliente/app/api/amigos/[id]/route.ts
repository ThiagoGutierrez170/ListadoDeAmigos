import { NextResponse } from "next/server"

// Base de datos simulada
const amigos = [
  {
    id: 1,
    nombre: "Juan Pérez García",
    fechaCumpleanos: "1990-05-15",
    fechaRegistro: "2024-01-10",
  },
  {
    id: 2,
    nombre: "María González López",
    fechaCumpleanos: "1988-08-22",
    fechaRegistro: "2024-01-15",
  },
  {
    id: 3,
    nombre: "Carlos Rodríguez Martínez",
    fechaCumpleanos: "1995-03-10",
    fechaRegistro: "2024-02-01",
  },
]

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const body = await request.json()
    const { nombre, fechaCumpleanos } = body

    // Validaciones
    if (!nombre || nombre.trim().length < 10) {
      return NextResponse.json({ error: "El nombre debe tener al menos 10 caracteres" }, { status: 400 })
    }

    if (!fechaCumpleanos) {
      return NextResponse.json({ error: "La fecha de cumpleaños es obligatoria" }, { status: 400 })
    }

    const index = amigos.findIndex((a) => a.id === id)

    if (index === -1) {
      return NextResponse.json({ error: "Amigo no encontrado" }, { status: 404 })
    }

    amigos[index] = {
      ...amigos[index],
      nombre: nombre.trim(),
      fechaCumpleanos,
    }

    return NextResponse.json(amigos[index])
  } catch (error) {
    return NextResponse.json({ error: "Error al actualizar el amigo" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const id = Number.parseInt(params.id)
  const index = amigos.findIndex((a) => a.id === id)

  if (index === -1) {
    return NextResponse.json({ error: "Amigo no encontrado" }, { status: 404 })
  }

  amigos.splice(index, 1)

  return NextResponse.json({ message: "Amigo eliminado exitosamente" })
}
