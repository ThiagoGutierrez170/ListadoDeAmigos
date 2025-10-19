// server/config/config.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Cargar las variables de entorno desde .env

const MONGO_URL = process.env.MONGO_URL;

const connectarDB = async () => {
    try {
        await mongoose.connect(MONGO_URL, {
            dbName: 'ListadoDeAmigos'
        });
        console.log('MongoDB conectado');
    } catch (error) {
        console.error('Error al conectar a MongoDB:', error.message);
        process.exit(1);
    }
};

export default connectarDB; 
