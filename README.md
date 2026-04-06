# JASFLY Backend API 🚁

## 🛠️ Tecnologías Utilizadas

- **Node.js** & **Express.js**: Para el enrutamiento y la creación de la API REST.
- **Sequelize**: Como ORM (Object-Relational Mapping) para interactuar con la base de datos de una forma ágil.
- **PostgreSQL**: Motor de base de datos relacional.
- **Docker & Docker Compose**: Para aislar el entorno de desarrollo y estandarizar la infraestructura del equipo.

## 💻 Requisitos Previos

Si deseas correr el proyecto asegurando que todo funcione inmediatamente instalar:
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) 
- *Alternativa Clásica:* [Node.js](https://nodejs.org/) (Versión 18+) y un servidor local de [PostgreSQL](https://www.postgresql.org/).

## 🚀 Guía de Instalación y Uso (Con Docker)

La forma más rápida de unirse al desarrollo es usando Docker. Este método encenderá tanto la base de datos como la API automáticamente.
instruciones: 
1. **Inicia Docker Desktop** en tu computadora.
2. Abre una terminal en la raíz del proyecto.
3. Ejecuta el comando :
   ```bash
   docker-compose up --build
   ```
4. ¡Listo! La API estará encendida en `http://localhost:3000` y PostgreSQL en el puerto `5432`.
   > *Nota: Cualquier cambio que hagas y guardes en los archivos se reflejará instantáneamente en el contenedor.*

## ⚙️ Uso Local (Sin Docker)

Si decides conectarte a una base de datos local preexistente:

1. Crea o renombra tu archivo local `.env` fijándote en la estructura esperada:
   ```env
   PORT=3000
   DB_HOST=localhost
   DB_PORT=5432      
   DB_NAME=jasfly_db  
   DB_USER=app_user  
   DB_PASSWORD="algo seguro"  
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Arranca el servidor (y de paso Sequelize creará/sincronizará tus tablas):
   ```bash
   npm run dev
   ```

