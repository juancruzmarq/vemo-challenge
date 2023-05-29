# Vemo Challenge Backend

## Enunciado

Debes desarrollar una API que permita mostrar información sobre los países del mundo.

#### Pasos

1. Configura un proyecto Node.js con Express o Nest.js como el framework web.
2. Utiliza Sequelize o tu ORM de preferencia para interactuar con una base de datos relacional.
3. Crea una base de datos para almacenar la información de los países. Define un modelo de datos adecuado que contenga los campos: Nombre, Capital, Moneda, Continente, Lenguaje, Población y Bandera.
4. Implementa un script o una ruta en el backend que obtenga los datos de los países desde la siguiente API: https://restcountries.com/v3.1/all . Al iniciar la aplicación o en intervalos regulares (por ejemplo, cada 24 horas), ejecuta este script o ruta para almacenar los datos de los países en la base de datos.
5. Crea rutas en el backend para realizar las siguientes operaciones:
   a. Obtener la lista de países desde la base de datos, incluyendo todos los campos.
   b. Realizar búsquedas en la base de datos por nombre, capital o continente, y devolver los resultados filtrados.
   c. Ordenar la lista de países alfabéticamente por cualquiera de los campos mencionados anteriormente.
   d. Obtener la información detallada de un país específico a través de su ID o algún identificador único.
   e. Enviar un excel con los datos filtrados por pais
6. Implementa las validaciones y el manejo de errores adecuados en el backend.

##### Opcional:

1. Agrege rutas de actividades q se puedan hacer en cada pais
2. Mande un mail diario con el excel

## Installation

```bash
$ npm install
```

## Levantar el proyecto

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

- Author - Juan Cruz Marquez

### Descripcion de la solucion

Para la solucion del problema se utilizo el framework NestJS, el cual es un framework de NodeJS que permite crear aplicaciones escalables y robustas, utilizando Typescript como lenguaje de programacion.

Para la base de datos se utilizo Postgres, y para la conexion con la base de datos se utilizo el ORM Sequelize.

Para la validacion de los datos se utilizo la libreria class-validator, la cual permite validar los datos de los DTOs de una manera sencilla y eficiente.
