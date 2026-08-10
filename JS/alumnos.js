// async function obtenerAlumnos() {
//     const respuesta = await fetch("https://jsonplaceholder.typicode.com/users");
//     const alumnos = await respuesta.json();
//     return alumnos;
// }

// function mostrarAlumnos() 
// {
//     console.table(alumnos);
//     console.log(alumnos[0]);
// }

// async function iniciar()
// {
//     const alumnos = await obtenerAlumnos();
//     mostrarAlumnos(alumnos);
// }

function mostrarAlumnos(alumnos)
{
    console.log(typeof alumnos)
    localStorage.setItem("alumnos", JSON.stringify(alumnos))
    const datos = localStorage.getItem("alumnos");
    console.log(typeof datos)
    console.log(datos)
    const alumnosRecuperados = JSON.parse(datos)
    console.log(typeof alumnosRecuperados, )
}

