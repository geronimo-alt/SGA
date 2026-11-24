import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useColorScheme } from "@mui/material/styles";

export default function SelectorTema() {
    const { mode, setMode } = useColorScheme();

    return (
        <FormControl size="small" variant="outlined" className="theme-selector">
            <InputLabel id="theme-mode-label">Tema</InputLabel>
            <Select
                labelId="theme-mode-label"
                value={mode ?? "system"}
                label="Tema"
                onChange={(event) => setMode(event.target.value)}
                inputProps={{ "aria-label": "Seleccionar tema" }}
            >
                <MenuItem value="system">Sistema</MenuItem>
                <MenuItem value="light">Claro</MenuItem>
                <MenuItem value="dark">Oscuro</MenuItem>
            </Select>
        </FormControl>
    );
}
