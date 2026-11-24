const mongoose = require("mongoose")

const materiaSchema = new mongoose.Schema({
    codigo: {
        type: String,
        unique: true,
        required: [true, "El código de la materia es obligatorio"],
        trim: true,
        maxlength: [20, "El código no puede superar los 20 caracteres"]
    },
    nombre: {
        type: String,
        required: [true, "El nombre de la materia es obligatorio"],
        trim: true,
        maxlength: [120, "El nombre no puede superar los 120 caracteres"]
    },
    descripcion: {
        type: String,
        trim: true,
        maxlength: [500, "La descripción no puede superar los 500 caracteres"],
        default: ""
    },
    cargaHoraria: {
        type: Number,
        required: [true, "La carga horaria de la materia es obligatoria"],
        min: [1, "La carga horaria debe ser mayor que cero"],
        validate: {
            validator: Number.isInteger,
            message: "La carga horaria debe ser un número entero"
        }
    },
    estado: {
        type: String,
        required: [true, "El estado es obligatorio"],
        enum: {
            values: ["activa", "inactiva"],
            message: "El estado solo puede ser activa o inactiva"
        }
    }
}, {
    versionKey: false
})

module.exports = mongoose.model("Materia", materiaSchema)
