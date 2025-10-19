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

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = Number.parseInt(params.id)
  const amigo = amigos.find((a) => a.id === id)

  if (!amigo) {
    return NextResponse.json({ error: "Amigo no encontrado" }, { status: 404 })
  }

  return NextResponse.json(amigo)
}
