import mongoose from 'mongoose';
import Amigo from '../models/amigoModel.js';

const controllerAmigo = {
    // POST /api/amigos/nuevo
    crearAmigo: async (req, res) => {
        try {
            const { nombre, fechaCumple } = req.body;
            if (!nombre || !fechaCumple) {
                return res.status(400).json({ error: 'Faltan datos (nombre y fechaCumple son requeridos)' });
            }
            // Mongoose manejará la conversión de fecha si el schema es Date
            const nuevoAmigo = await Amigo.create(req.body);
            return res.status(201).json(nuevoAmigo);
        } catch (error) {
            console.error('Error al crear un amigo:', error.message);
            // Captura errores de validación de Mongoose
            if (error.name === 'ValidationError') {
                return res.status(400).json({ error: error.message });
            }
            return res.status(500).json({ error: 'Error del servidor al crear amigo' });
        }
    },

    // GET /api/amigos/listar
    obtenerAmigo: async (req, res) => {
        try {
            const amigos = await Amigo.find();
            res.json(amigos);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error del servidor al obtener amigos' });
        }
    },

    // GET /api/amigos/buscar/:id
    obtenerAmigoById: async (req, res) => {
        try {
            const { id } = req.params;
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ error: 'ID no válido' });
            }
            const amigo = await Amigo.findById(id);
            if (!amigo) {
                return res.status(404).json({ mensaje: "Amigo no encontrado" });
            }
            res.json(amigo);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error del servidor al obtener amigo' });
        }
    },

    // PUT /api/amigos/:id
    actualizarAmigo: async (req, res) => {
        try {
            const { id } = req.params;
            const updateData = req.body;

            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ error: 'ID no válido' });
            }

            // Mongoose automáticamente ignora campos no definidos y valida el tipo
            const amigoActualizado = await Amigo.findByIdAndUpdate(
                id,
                updateData,
                { new: true, runValidators: true } // runValidators for schema validation
            );

            if (!amigoActualizado) {
                return res.status(404).json({ mensaje: 'Amigo no encontrado' });
            }

            // Mejor respuesta: devuelve el objeto actualizado
            res.status(200).json(amigoActualizado);

        } catch (error) {
            console.error('Error al actualizar amigo desde el servidor:', error);
            if (error.name === 'ValidationError') {
                return res.status(400).json({ error: error.message });
            }
            res.status(500).json({ mensaje: 'Error del servidor al actualizar amigo' });
        }
    },

    // DELETE /api/amigos/:id
    eliminarAmigo: async (req, res) => {
        try {
            const { id } = req.params;
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ error: 'ID no válido' });
            }
            const amigoEliminado = await Amigo.findByIdAndDelete(id);
            if (!amigoEliminado) {
                return res.status(404).json({ mensaje: "Amigo no encontrado" });
            }
            // Mejor respuesta: 200 OK sin cuerpo o 204 No Content
            res.status(200).json({ mensaje: "Amigo eliminado correctamente" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error del servidor al eliminar amigo' });
        }
    }
};

export default controllerAmigo;