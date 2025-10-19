// server/config/config.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Cargar las variables de entorno desde .env

const URL_DB = process.env.MONGODB_URI;

const connectarDB = async () => {
    try {
        await mongoose.connect(URL_DB, {
            dbName: 'ListadoDeAmigos'
        });
        console.log('MongoDB conectado');
    } catch (error) {
        console.error('Error al conectar a MongoDB:', error.message);
        process.exit(1);
    }
};

export default connectarDB; 
