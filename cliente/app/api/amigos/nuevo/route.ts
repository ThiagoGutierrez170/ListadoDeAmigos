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

let nextId = 4

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { nombre, fechaCumpleanos } = body

    // Validaciones
    if (!nombre || nombre.trim().length < 10) {
      return NextResponse.json({ error: "El nombre debe tener al menos 10 caracteres" }, { status: 400 })
    }

    if (!fechaCumpleanos) {
      return NextResponse.json({ error: "La fecha de cumpleaños es obligatoria" }, { status: 400 })
    }

    const nuevoAmigo = {
      id: nextId++,
      nombre: nombre.trim(),
      fechaCumpleanos,
      fechaRegistro: new Date().toISOString().split("T")[0],
    }

    amigos.push(nuevoAmigo)

    return NextResponse.json(nuevoAmigo, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Error al crear el amigo" }, { status: 500 })
  }
}
