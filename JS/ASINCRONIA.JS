// console.log("Inicio");

// setTimeout(() => {
//     console.log("Buscando Alumnos...");
// }, 3000);

// console.log("Fin");

// function saludar ()
// {
//     console.log("Hola");
// }

// function ejecutar(funcion)
// {
//     funcion();
// }
// ejecutar(saludar);

// function despedirse()
// {
//     console.log("Adios");
// }
// setTimeout(despedirse, 2000);

// setTimeout(() => {
//     console.log("Buscando Profesores...");
// }, 4000);

// setTimeout(() => {
//     console.log("Buscando Materias...");
// }, 5000);


// console.log("Abriendo SGA")
// setTimeout(() => {
//     console.log("Alumnos Cargados")
// }, 3000);
// console.log("El usuario puede seguir navegando")


// console.log("Solicitar Lista de Alumnos..")
// setTimeout(() => {
//     console.log("Lista de Alumnos Cargada")
// },5000);
// console.log("El usuario puede seguir navegando")

// function obtenerAlumnos()
// {
//   return new Promise((resolve) =>
//     {
//     setTimeout(() =>
//         {
//             console.log("Ya tengo el arreglo");
//             resolve(["Juan", "Pedro", "Maria"]);
//         },3000);
//     })
// }
// obtenerAlumnos().then((alumnos) =>
//  {     console.log(alumnos);
// })

// async function iniciar()
// {
//     const alumnos = await obtenerAlumnos();
//     console.log(alumnos);
// }
// iniciar();

// function obtenerClima()
// {
//     return new Promise((resolve) =>
//     {
//         setTimeout(() =>
//         {
//             console.log("Ya tengo la información del clima");
//             resolve("22°C - Soleado" );
//         }, 3000);
//     });
// }
// obtenerClima().then((clima) =>
// {
//     console.log(clima);
// })

// async function mostrarClima()
// {
//     const clima = await obtenerClima();
//     console.log(clima);
// }
// mostrarClima();

async function prueba()
{
    const respuesta = await fetch("https://jsonplaceholder.typicode.com/users")
    console.log(respuesta);
}
prueba()


