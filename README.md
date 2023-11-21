[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/OLtUzx2d)
[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=12985338&assignment_repo_type=AssignmentRepo)
# Prueba Técnica JavaScript + Node.js

Escribe las soluciones en el archivo `solutions/index.js` manteniendo el nombre de las funciones y sus `export`. Usa `ESModules` en tu proyecto de Node.js

1 - Arregla esta función para que el código posterior funcione como se espera:

```javascript
import net from 'node:net'

export const ping = (ip) => {
  const startTime = process.hrtime()

  const client = net.connect({ port: 80, host: ip }, () => {
    client.end()
    return { time: process.hrtime(startTime), ip }
  })
  
  client.on('error', (err) => {
    throw err
    client.end()
  })
}

ping('midu.dev', (err, info) => {
  if (err) console.error(err)
  console.log(info)
})
```

2 - Transforma la siguiente función para que funcione con promesas en lugar de callbacks:

```javascript
export function obtenerDatosPromise(callback) {
  setTimeout(() => {
    callback(null, { data: 'datos importantes' });
  }, 2000);
}
```

3 - Explica qué hace la funcion. Identifica y corrige los errores en el siguiente código.

Si ves algo innecesario, elimínalo. Luego mejoralo para que siga funcionando con callback y luego haz lo que consideres para mejorar su legibilidad.

Luego crea la función `procesarArchivoPromise` para que haga lo mismo pero con promesas.

```javascript
export function procesarArchivo() {
  fs.readFile('input.txt', 'utf8', (error, contenido) => {
    if (error) {
      console.error('Error leyendo archivo:', error.message);
      return false;
    }

    setTimeout(() => {
      const textoProcesado = contenido.toUpperCase();

      fs.writeFile('output.txt', textoProcesado, error => {
        if (error) {
          console.error('Error guardando archivo:', error.message);
          return false;
        }

        console.log('Archivo procesado y guardado con éxito');
        return true
      });

    }, 1000);
  });
}
```

4 - ¿Cómo mejorarías el siguiente código y por qué? Arregla los tests si es necesario:

```javascript
import fs from 'node:fs';

export function leerArchivos() {
  const archivo1 = fs.readSync('archivo1.txt', 'utf8');
  const archivo2 = fs.readSync('archivo2.txt', 'utf8');
  const archivo3 = fs.readSync('archivo3.txt', 'utf8');

  return `${archivo1} ${archivo2} ${archivo3}`
}

leerArchivos();
```

5 - Escribe una funcion `delay` que retorne una promesa que se resuelva después de `n` milisegundos. Por ejemplo:

```javascript
export async function delay () {
  // ...
}

delay(3000).then(() => console.log('Hola mundo'));
// o..
await delay(3000)
console.log('Hola mundo')
```

6 - Diseña una API REST utilizando Express que permite a los usuarios crear, leer, modificar, actualizar y eliminar elementos de una lista.

La lista tendrá objetos que tienen la siguiente forma:

```javascript
{
  id: 1,
  content: 'Item 1'
}
```

Haz la solución en el archivo `solutions/server.js` y exporta el `app` y `server` creado.

Instala Express con `npm install express`. No te preocupes por CORS.
