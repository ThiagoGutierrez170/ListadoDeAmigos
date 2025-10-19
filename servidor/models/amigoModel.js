import { model, Schema } from 'mongoose';

const AmigoSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        minlength: [10, 'El nombre debe tener al menos 5 caracteres'],
        maxlength: [255, 'El nombre no puede tener más de 255 caracteres']
    },
    fechaCumple: {
        type: Date,
        required: [true, 'La fecha del cumple es obligatorio'],
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const Amigo = model('Amigo', AmigoSchema);

export default Amigo;