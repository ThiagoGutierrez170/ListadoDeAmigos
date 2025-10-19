import { Router } from 'express';
import controllerAmigo from '../controllers/controllerAmigo.js';

const rutaAmigo = Router();

rutaAmigo.get('/listar', controllerMusica.obtenerAmigo);
rutaAmigo.post('/nuevo', controllerMusica.crearAmigo);
rutaAmigo.get('/buscar/:id', controllerMusica.obtenerAmigoById);
rutaAmigo.put('/:id', controllerMusica.actualizarAmigo);
rutaAmigo.delete('/:id', controllerMusica.eliminarAmigo);

export default rutaAmigo;