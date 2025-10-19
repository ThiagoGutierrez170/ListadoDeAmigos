import { Router } from 'express';
import controllerAmigo from '../controllers/controllerAmigo.js';

const rutaAmigo = Router();

rutaAmigo.get('/listar', controllerAmigo.obtenerAmigo);
rutaAmigo.post('/nuevo', controllerAmigo.crearAmigo);
rutaAmigo.get('/buscar/:id', controllerAmigo.obtenerAmigoById);
rutaAmigo.put('/:id', controllerAmigo.actualizarAmigo);
rutaAmigo.delete('/:id', controllerAmigo.eliminarAmigo);

export default rutaAmigo;