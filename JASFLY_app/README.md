# JASFLY Frontend - Guía de Uso

Esta guía explica cómo ejecutar, entender y trabajar con la aplicación frontend de JASFLY, construida con Ionic y Angular.

## 🚀 Cómo iniciar el Frontend

El frontend está configurado para comunicarse con el backend en `http://localhost:3000`. Asegúrate de que el backend esté corriendo primero usando `docker-compose up --build`.

Para iniciar la aplicación frontend en modo de desarrollo:

1. Abre una terminal.
2. Navega al directorio del proyecto de Angular:
   ```bash
   cd JASFLY_app/myApp
   ```
3. Ejecuta el servidor de desarrollo de Ionic:
   ```bash
   ionic serve
   ```
   *(Esto abrirá automáticamente la aplicación en tu navegador web en `http://localhost:8100` y recargará la página automáticamente cuando modifiques el código).*

---

## 📂 Estructura Principal del Proyecto

Los archivos principales en los que trabajarás se encuentran en `src/app/`:

*   **`interfaces/`**: Define los modelos de datos que coinciden con el backend (`Flight`, `Pilot`, `Helicopter`). ¡Importante! Estas interfaces deben tener los mismos nombres de variables que devuelve la base de datos (por ejemplo, `pilotoId`, `helicopteroId`).
*   **`flights/`**: Contiene la lógica principal de la aplicación relacionada con los vuelos.
    *   **`flight.service.ts`**: El servicio principal que realiza las peticiones HTTP (`GET`, `POST`, `PUT`) al backend.
    *   **`flight-list/`**: La pantalla principal (Historial de Vuelos). Muestra la lista de todos los vuelos extraídos desde la base de datos.
    *   **`flights/flight-form/`**: El formulario utilizado para **Crear** un nuevo registro de vuelo y para visualizar el **Resumen** o editarlo.

---

## 🧩 Flujo de Trabajo y Pantallas

### 1. Historial de Vuelos (`/flight-list`)
*   Se carga automáticamente al entrar a la aplicación.
*   Llama al backend para obtener los `Helicópteros`, `Pilotos` y `Vuelos`.
*   Aprovecha las consultas con `include` del backend para mostrar datos anidados (por ejemplo, el modelo del helicóptero usando `flight.Helicoptero.modelo`).
*   Posee un botón para **Sincronizar** (recargar los datos) y otro para iniciar un **Nuevo Registro**.

### 2. Formulario de Vuelo (`/flight-form`)
*   Permite seleccionar un piloto y un helicóptero desde listas desplegables.
*   Registra las horas de vuelo mediante los botones "Iniciar Actividad" y "Finalizar Actividad".
*   Permite ingresar odómetros, tiros de agua, etc.
*   Al guardar, se envía un `POST` al backend y redirige al historial.

### 3. Resumen de Vuelo (`/flight-form/:id`)
*   Si a la ruta se le pasa un ID (por ejemplo, haciendo clic en un vuelo del historial), la pantalla entra en modo "Resumen".
*   Muestra un desglose completo, calculando automáticamente las **Horas de Vuelo**.

---

## 🔧 Buenas Prácticas y Solución de Problemas

1.  **CORS**: Si en la consola del navegador ves errores de CORS o "Access to XMLHttpRequest", significa que el backend no tiene configurado el acceso, o el contenedor de Docker está apagado. Revisa la terminal del backend.
2.  **Errores `undefined` en pantalla**: Si un campo dice *undefined*, revisa que las variables en tu HTML (ej. `flight.pilotoId`) coincidan exactamente, incluyendo mayúsculas y minúsculas, con lo que está definido en `src/app/interfaces/` y con lo que responde el JSON de la API.
3.  **Compilador de Angular**: Ionic mostrará errores en la terminal si intentas usar una variable en el `.html` que no está declarada en tu archivo `.ts` o en sus interfaces.

¡Feliz codificación! 🚁🔥
