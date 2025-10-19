import { NextResponse } from "next/server"

// Simulación de base de datos en memoria
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

const nextId = 4

export async function GET() {
  return NextResponse.json(amigos)
}

// Exportar para uso en otras rutas
export { amigos, nextId }
