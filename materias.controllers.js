const Materia = require("../models/Materia")


async function obtenerMaterias(req, res) {
    const materias = await Materia.find()
    res.json(materias)
}

async function obtenerMateria(req, res) {
    const materia = await Materia.findOne({ codigo: req.params.codigo })
    if (!materia) {
        return res.status(404).json({ mensaje: "Materia no encontrada" })
    }
    res.json(materia)
}

async function crearMateria(req, res) {
    const validacion = normalizarYValidarMateria(req.body)
    if (validacion.error) {
        return res.status(400).json({ mensaje: validacion.error })
    }

    const existe = await Materia.findOne({ codigo: validacion.materia.codigo })
    if (existe) {
        return res.status(409).json({ mensaje: "El código ya existe" })
    }

    const nuevaMateria = await Materia.create(validacion.materia)
    res.status(201).json(nuevaMateria)
}

async function actualizarMateria(req, res) {
    const validacion = normalizarYValidarMateria(req.body, true)
    if (validacion.error) {
        return res.status(400).json({ mensaje: validacion.error })
    }

    const materiaActual = await Materia.findOne({ codigo: req.params.codigo })
    if (!materiaActual) {
        return res.status(404).json({ mensaje: "Materia no encontrada" })
    }

    const codigoNuevo = validacion.materia.codigo
    if (codigoNuevo) {
        const existe = await Materia.findOne({ codigo: codigoNuevo })
        if (existe && existe.codigo !== materiaActual.codigo) {
            return res.status(409).json({ mensaje: "El código ya existe" })
        }
    }

    const materiaActualizada = await Materia.findOneAndUpdate(
        { codigo: materiaActual.codigo },
        { $set: validacion.materia },
        { returnDocument: "after", runValidators: true }
    )
    if (!materiaActualizada) {
        return res.status(404).json({ mensaje: "Materia no encontrada" })
    }
    res.json(materiaActualizada)
}

async function eliminarMateria(req, res) {
    const materia = await Materia.findOneAndDelete({ codigo: req.params.codigo })
    if (!materia) {
        return res.status(404).json({ mensaje: "Materia no encontrada" })
    }
    res.json({ mensaje: "Materia eliminada correctamente" })
}

module.exports = {
    obtenerMaterias,
    obtenerMateria,
    crearMateria,
    actualizarMateria,
    eliminarMateria
}

function validarObjeto(body) {
    return body !== null && typeof body === "object" && !Array.isArray(body)
}

function normalizarYValidarMateria(body, parcial = false) {
    if (!validarObjeto(body)) {
        return { error: "El cuerpo de la solicitud debe ser un objeto" }
    }

    const materia = {}
    const campos = ["codigo", "nombre", "descripcion", "cargaHoraria", "estado"]

    for (const campo of campos) {
        if (Object.hasOwn(body, campo)) {
            materia[campo] = body[campo]
        }
    }

    if (!parcial) {
        for (const campo of ["codigo", "nombre", "cargaHoraria", "estado"]) {
            if (!Object.hasOwn(materia, campo)) {
                return { error: `El campo ${campo} es obligatorio` }
            }
        }
    } else if (Object.keys(materia).length === 0) {
        return { error: "Debe enviar al menos un campo para modificar" }
    }

    if (Object.hasOwn(materia, "codigo")) {
        if (typeof materia.codigo !== "string" || !materia.codigo.trim()) {
            return { error: "El código debe ser un texto no vacío" }
        }
        materia.codigo = materia.codigo.trim()
        if (materia.codigo.length > 20) {
            return { error: "El código no puede superar los 20 caracteres" }
        }
    }

    if (Object.hasOwn(materia, "nombre")) {
        if (typeof materia.nombre !== "string" || !materia.nombre.trim()) {
            return { error: "El nombre debe ser un texto no vacío" }
        }
        materia.nombre = materia.nombre.trim()
        if (materia.nombre.length > 120) {
            return { error: "El nombre no puede superar los 120 caracteres" }
        }
    }

    if (Object.hasOwn(materia, "descripcion")) {
        if (typeof materia.descripcion !== "string") {
            return { error: "La descripción debe ser un texto" }
        }
        if (materia.descripcion.length > 0 && !materia.descripcion.trim()) {
            return { error: "La descripción no puede contener únicamente espacios" }
        }
        materia.descripcion = materia.descripcion.trim()
        if (materia.descripcion.length > 500) {
            return { error: "La descripción no puede superar los 500 caracteres" }
        }
    }

    if (Object.hasOwn(materia, "cargaHoraria")
        && (!Number.isInteger(materia.cargaHoraria) || materia.cargaHoraria <= 0)) {
        return { error: "La carga horaria debe ser un número entero mayor que cero" }
    }

    if (Object.hasOwn(materia, "estado")
        && !["activa", "inactiva"].includes(materia.estado)) {
        return { error: "El estado solo puede ser activa o inactiva" }
    }

    return { materia }
}
