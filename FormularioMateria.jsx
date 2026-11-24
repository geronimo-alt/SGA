import { useState } from "react"
import { Alert, Box, Button, MenuItem, Paper, TextField, Typography} from "@mui/material"

const API_MATERIAS = "http://localhost:3000/materias"

function crearFormulario(materia = null) {
    return {
        codigo: materia?.codigo ?? "",
        nombre: materia?.nombre ?? "",
        descripcion: materia?.descripcion ?? "",
        cargaHoraria: materia?.cargaHoraria ?? "",
        estado: materia?.estado ?? "activa"
    }
}

function FormularioMateria({ onMateriaCreada, materiaEditar, onCancelar }) {
    const [formulario, setFormulario] = useState(() => crearFormulario(materiaEditar))
    const [error, setError] = useState("")
    const [guardando, setGuardando] = useState(false)

    function manejarCambio(evento) {
        const { name, value } = evento.target
        setFormulario(actual => ({ ...actual, [name]: value }))
        setError("")
    }

    async function guardar(evento) {
        evento.preventDefault()
        setError("")

        const codigo = formulario.codigo.trim()
        const nombre = formulario.nombre.trim()
        const descripcion = formulario.descripcion.trim()
        const cargaHoraria = Number(formulario.cargaHoraria)

        if (!codigo || !nombre || !formulario.cargaHoraria || !formulario.estado) {
            setError("Completá el código, el nombre, la carga horaria y el estado.")
            return
        }
        if (descripcion.length === 0 && formulario.descripcion.length > 0) {
            setError("La descripción no puede contener únicamente espacios.")
            return
        }
        if (!Number.isInteger(cargaHoraria) || cargaHoraria <= 0) {
            setError("La carga horaria debe ser un número entero mayor que cero.")
            return
        }

        const editando = Boolean(materiaEditar)
        const url = editando
            ? `${API_MATERIAS}/${encodeURIComponent(materiaEditar.codigo)}`
            : API_MATERIAS
        const datosMateria = {
            codigo,
            nombre,
            descripcion,
            cargaHoraria,
            estado: formulario.estado
        }

        setGuardando(true)
        try {
            const respuesta = await fetch(url, {
                method: editando ? "PUT" : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(datosMateria)
            })
            const resultado = await respuesta.json()

            if (!respuesta.ok) {
                throw new Error(resultado.mensaje || "No se pudo guardar la materia.")
            }

            setFormulario(crearFormulario())
            onMateriaCreada(editando ? "modificada" : "registrada")
        } catch (error) {
            console.error("Error al guardar la materia:", error)
            setError(error instanceof TypeError
                ? "No se pudo conectar con el servidor."
                : error.message)
        } finally {
            setGuardando(false)
        }
    }

    return (
        <Paper
            component="section"
            elevation={0}
            sx={{
                p: { xs: 2.5, sm: 3.5 },
                mb: 3,
                border: 1,
                borderColor: "divider",
                borderRadius: 4,
                bgcolor: "background.paper"
            }}
        >
            <Typography component="h2" variant="h5" sx={{ mb: 2.5, fontWeight: 700 }}>
                {materiaEditar ? "Editar materia" : "Nueva materia"}
            </Typography>
            <Box
                component="form"
                onSubmit={guardar}
                sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))" },
                    gap: 2
                }}
            >
                <TextField
                    id="codigo"
                    name="codigo"
                    label="Código"
                    value={formulario.codigo}
                    onChange={manejarCambio}
                    required
                    slotProps={{ htmlInput: { maxLength: 20 } }}
                    fullWidth
                />
                <TextField
                    id="nombre"
                    name="nombre"
                    label="Nombre"
                    value={formulario.nombre}
                    onChange={manejarCambio}
                    required
                    slotProps={{ htmlInput: { maxLength: 120 } }}
                    fullWidth
                />
                <TextField
                    id="cargaHoraria"
                    name="cargaHoraria"
                    label="Carga horaria"
                    type="number"
                    value={formulario.cargaHoraria}
                    onChange={manejarCambio}
                    required
                    slotProps={{ htmlInput: { min: 1, step: 1 } }}
                    fullWidth
                />
                <TextField
                    id="estado"
                    name="estado"
                    label="Estado"
                    value={formulario.estado}
                    onChange={manejarCambio}
                    select
                    required
                    fullWidth
                >
                    <MenuItem value="activa">Activa</MenuItem>
                    <MenuItem value="inactiva">Inactiva</MenuItem>
                </TextField>
                <TextField
                    id="descripcion"
                    name="descripcion"
                    label="Descripción"
                    value={formulario.descripcion}
                    onChange={manejarCambio}
                    slotProps={{ htmlInput: { maxLength: 500 } }}
                    multiline
                    fullWidth
                    sx={{ gridColumn: "1 / -1" }}
                />
                <Box
                    sx={{
                        gridColumn: "1 / -1",
                        display: "flex",
                        justifyContent: "flex-end",
                        flexWrap: "wrap",
                        gap: 1.5,
                        mt: 1
                    }}
                >
                    {materiaEditar && (
                        <Button type="button" onClick={onCancelar} disabled={guardando} variant="outlined">
                            Cancelar
                        </Button>
                    )}
                    <Button type="submit" variant="contained" disabled={guardando}>
                        {guardando ? "Guardando..." : materiaEditar ? "Guardar cambios" : "Guardar"}
                    </Button>
                </Box>
                {error && (
                    <Alert severity="error" role="alert" sx={{ gridColumn: "1 / -1" }}>
                        {error}
                    </Alert>
                )}
            </Box>
        </Paper>
    )
}

export default FormularioMateria
