require("dotenv").config() 

const express = require("express") 
const cors = require("cors")
const mongoose = require("mongoose")

const conectarDB = require("./config/database")
const alumnosRoutes = require("./routes/alumnos.routes") 
const docentesRoutes = require("./routes/docentes.routes")
const authRoutes = require("./routes/authRoutes")
const materiasRoutes = require("./routes/materia.routes")

const app = express() 

app.use(express.json()) 
app.use(cors()) 
app.use("/alumnos", alumnosRoutes) 
app.use("/docentes", docentesRoutes)
app.use("/auth", authRoutes)
app.use("/materias", materiasRoutes)

const PORT = process.env.PORT || 3000

app.use((error, req, res, next) => {
    if (res.headersSent) {
        return next(error)
    }

    console.error("Error en la solicitud:", error)

    if (error.code === 11000) {
        return res.status(409).json({ mensaje: "El código ya existe" })
    }

    if (error.name === "ValidationError" || error.name === "CastError") {
        return res.status(400).json({ mensaje: "Los datos enviados no son válidos" })
    }

    if (error instanceof SyntaxError && error.status === 400 && "body" in error) {
        return res.status(400).json({ mensaje: "El cuerpo JSON no es válido" })
    }

    if (mongoose.connection.readyState !== 1
        || ["MongoNetworkError", "MongoServerSelectionError"].includes(error.name)) {
        return res.status(503).json({ mensaje: "La base de datos no está disponible" })
    }

    res.status(500).json({ mensaje: "Ocurrió un error interno. Intente nuevamente." })
})

async function iniciarServidor() {
    await conectarDB()
    const port = process.env.PORT || 3000
    app.listen(port, () => {
        console.log(`Servidor funcionando en http://localhost:${port}`)
    })
}

iniciarServidor().catch(error => {
    console.error("No se pudo iniciar el servidor:", error.message)
    process.exitCode = 1
})
