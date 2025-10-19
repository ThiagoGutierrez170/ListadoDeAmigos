import { model, Schema } from 'mongoose';

const AmigoSchema = new Schema(
    {
        nombre: {
            type: String,
            required: [true, 'El nombre es obligatorio'],
            minlength: [5, 'El nombre debe tener al menos 5 caracteres'],
            maxlength: [255, 'El nombre no puede tener más de 255 caracteres']
        },
        fechaCumple: {
            type: Date,
            required: [true, 'La fecha del cumple es obligatoria']
        },
        timestamp: {
            type: Date,
            default: Date.now
        }
    },
    {
        toJSON: {
            virtuals: true,
            transform: (doc, ret) => {
                ret.id = ret._id.toString();
                delete ret._id;
                delete ret.__v;
                return ret;
            }
        }
    }
);

const Amigo = model('Amigo', AmigoSchema);

export default Amigo;
