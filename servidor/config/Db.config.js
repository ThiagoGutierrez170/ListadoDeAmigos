// server/config/config.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Cargar las variables de entorno desde .env

const connectarDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB conectado');
    } catch (error) {
        console.error('Error al conectar a MongoDB:', error.message);
        process.exit(1);
    }
};

export default connectarDB; 