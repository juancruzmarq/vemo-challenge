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

## Conexion a la base de datos

1 - Crear una base de datos en PostgreSQL
2 - Crear un archivo .env en la raiz del proyecto con el siguiente contenido:

```bash
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/vemo?schema=public"
```

Donde postgres:postgres es el usuario y contraseña de la base de datos y vemo es el nombre de la base de datos. 5432 es el puerto por defecto de PostgreSQL y public es el schema por defecto.

## Levantar el proyecto

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Swagger

http://localhost:3000/api

### Tecnologias

- NodeJS
- NestJS
- Prisma
- PostgreSQL
- Swagger
- class-validator
- class-transformer
- ExcelJS

#### Omiciones y supuestos

- Se omitio crear los modulos de continente, lenguaje, moneda y capital.
- Se omitio crear una tabla bandera
- Se eligio solo el nombre comun del pais
- Se omitio crear en cada llamada al job los registros, por el contrario se crea una vez y luego se actualiza.
- En el caso de la busqueda por orden alfabetico, se ordena solo en una propiedad, es decir, si se ordena por nombre, no se puede ordenar por capital.
- Se omitio la creacion de test unitarios y de integracion
- En el enunciado se aclara que la obtencion de los datos de la API se puede hacer al iniciar la aplicacion o en intervalos regulares, se opto por ambas opciones, al iniciar la aplicacion y cada 24 horas, para que existan datos en la base de datos al probar la aplicacion.

<h6>Excel</h6>

src/example.xlsx > Excel de ejemplo que se obtiene en la ruta /pais/excel
