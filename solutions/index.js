import net from "node:net";
import fs from "node:fs";
import fsP from "node:fs/promises";

// # EJERCICIO 1
// Según este test ping recibe una ip y un callback
// Habria que añadir el cb
export const ping = (ip, cb) => {
  // High resolution real time -> [segundos, nanosegundos]
  const startTime = process.hrtime();

  // Establecer conexión para cliente
  const client = net.connect({ port: 80, host: ip }, () => {
    client.end();
    const result = { time: process.hrtime(startTime), ip };
    // Se supone que no hay errores
    // ¿El return aquí sobraria porque la funcion es asincrona y su
    // valor no es capturado por ningun código sincrono?
    cb(null, result);
  });

  client.on("error", (err) => {
    cb(err, null);
  });
};

ping("midu.dev", (err, info) => {
  if (err) console.error(err);
  console.log(info);
});

// # EJERCICIO 2
export function obtenerDatosPromise(callback) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve({ data: "datos importantes" }), 2000);
  });
}

// # EJERCICIO 3

const gestionarErrores = (error, estaLeyendo) => {
  console.error(
    `Error ${estaLeyendo ? "leyendo" : "guardando"} el archivo:`,
    error.message
  );
  // Devolver el error con error
  return new Error(error);
};

// La función lee un archivo input.txt en formato utf8 y transforma su contenido en mayúsculas
// Para luego escribirlo en un archivo output.txt (que se crea si no existe)
// Tanto en la lectura como escritura se gestionan los errores
// Devolviendo un mensaje por consola y un error con el error del proceso
export async function procesarArchivo() {
  let textoProcesado;
  fs.readFile("input.txt", "utf8", (error, contenido) => {
    if (error) {
      gestionarErrores(error, true);
    }

    // El set timeout puede sobrar porque no es necesario añadir a un proceso asincrono mas latencia
    textoProcesado = contenido.toUpperCase();
    fs.writeFile("output.txt", textoProcesado, (error) => {
      if (error) {
        gestionarErrores(error, false);
      }
    });

    // Aqui ya habra escrito y no habra errores pro tanto se puede sacar del if
    console.log("Archivo procesado y guardado con éxito");
    return contenido;
  });
}

export async function procesarArchivoPromise() {
  // tu código aquí
  // Primero Leo
  let archivo;
  try {
    archivo = await fsP.readFile("input.txt", "utf8");
  } catch (error) {
    gestionarErrores(error, true);
  }

  // Aqui no hay errores
  // Por lo que proceso el archivo poniendolo todo en mayúsculas
  const textoProcesado = archivo.toUpperCase();
  // Luego Escribo
  try {
    await fsP.writeFile("output.txt", textoProcesado);
    console.log("Archivo procesado y guardado con éxito");
    return archivo;
  } catch (error) {
    gestionarErrores(error, false);
  }
}

/*
// # EJERCICIO 4
export function leerArchivos() {
  const archivo1 = fs.readSync("archivo1.txt", "utf8");
  const archivo2 = fs.readSync("archivo2.txt", "utf8");
  const archivo3 = fs.readSync("archivo3.txt", "utf8");

  return `${archivo1} ${archivo2} ${archivo3}`;
}

// # EJERCICIO 5
export async function delay() {
  // ...
}
*/
