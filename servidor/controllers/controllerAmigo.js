import mongoose from 'mongoose';
import Amigo from '../models/amigoModel.js';

const controllerAmigo = {

    crearAmigo: async (req, res) => {
        try {
            const { nombre, fechaCumple } = req.body;
            if (!nombre || !fechaCumple) {
                return res.status(400).json({ error: 'Faltan datos' });
            }
            const nuevoAmigo = await Amigo.create(req.body);
            return res.status(201).json(nuevoAmigo);
        } catch (error) {
            return res.status(400).json({ error: 'Error al crear un dato de un amigo' });
        }
    },

    obtenerAmigo: async (req, res) => {
        try {
            const amigo = await Amigo.find();
            res.json(amigo);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener datos del amigo' });
        }
    },

    obtenerAmigoById: async (req, res) => {
        try {
            const { id } = req.params;
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ error: 'ID no válido' });
            }
            const amigo = await Amigo.findById(id);
            if (!amigo) {
                res.status(404).json({ mensaje: "Datos del amigo no encontrada" });
                return;
            }
            res.json(amigo);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Error al obtener los datos del amigo' });
        }
    },

    actualizarAmigo: async (req, res) => {
        try {
            const { id } = req.params;
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ error: 'ID no válido' });
            }
            const amigoActualizado = await Musica.findByIdAndUpdate(id, req.body, { new: true });
            if (!amigoActualizado) {
                res.status(404).json({ mensaje: "Datos del amigo no encontrada" });
                return;
            }
            res.json(amigoActualizado);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Error al actualizar datos del amigo' });
        }
    },

    eliminarAmigo: async (req, res) => {
        try {
            const { id } = req.params;
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ error: 'ID no válido' });
            }
            const amigoEliminado = await Musica.findByIdAndDelete(id);
            if (!amigoEliminado) {
                res.status(404).json({ mensaje: "Datos del amigo no encontrada" });
                return;
            }
            res.json({ mensaje: "Datos del amigO eliminada correctamente" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Error al eliminar datos del amig0' });
        }
    }
};

export default controllerAmigo;
