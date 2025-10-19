// server.js
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import connectDB from './config/Db.config.js';

// Cargar variables de entorno
dotenv.config();

// Inicializar aplicación
const app = express();

// Middlewares globales
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

// Rutas base
import exampleRouter from './src/routes/example.routes.js';

app.use('/api/example', exampleRouter);

// Conexión a la base de datos e inicialización
connectDB()
  .then(async () => {
    console.log('Conexión a la base de datos establecida.');

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error al conectar a la base de datos:', err.message);
  });
