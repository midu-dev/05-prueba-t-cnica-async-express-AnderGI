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
    return cb(null, result);
  });

  client.on("error", (err) => {
    return cb(err, null);
  });
};

ping("midu.dev", (err, info) => {
  if (err) console.error(err);
  console.log(info);
});

// # EJERCICIO 2
export function obtenerDatosPromise() {
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
export function procesarArchivo(cb) {
  let textoProcesado;
  fs.readFile("input.txt", "utf8", (error, contenido) => {
    if (error) {
      cb(gestionarErrores(error, true), null);
    }

    // El set timeout puede sobrar porque no es necesario añadir a un proceso asincrono mas latencia
    textoProcesado = contenido.toUpperCase();
    fs.writeFile("output.txt", textoProcesado, (error) => {
      if (error) {
        cb(gestionarErrores(error, false), null);
      }
    });

    // Aqui ya habra escrito y no habra errores pro tanto se puede sacar del if
    console.log("Archivo procesado y guardado con éxito");
    return cb(null, contenido);
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

// # EJERCICIO 4

// Lo arreglaria cambiando las funciones sincronas por asincronas
// Para evitar bloquear el hilo de ejecución principal
// En este caso se podria llegar utilizar el método Promise.allSettled
// para que las tareas se realizen de manera concurrente
// y devuelvan bien un array de las promesas con el resultado o el error
// pero no se rechaza si una de las promesxas falla

export async function leerArchivos() {
  try {
    const archivos = await Promise.allSettled([
      fsP.readFile("archivo1.txt", "utf8"),
      fsP.readFile("archivo2.txt", "utf8"),
      fsP.readFile("archivo3.txt", "utf8"),
    ]);
    const resultMssg = archivos.map((promise) => promise.value).join(" ");

    return resultMssg;
  } catch (err) {
    console.log(err);
  }
}

// # EJERCICIO 5
export async function delay(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve("Resuelta"), ms);
  });
}
