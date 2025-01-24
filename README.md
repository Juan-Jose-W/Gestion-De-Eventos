# Gestión de Eventos

Este proyecto es una aplicación de gestión de eventos que permite a los usuarios registrarse, iniciar sesión y gestionar sus eventos. La aplicación está dividida en un backend y un frontend.

## Funcionalidades

### Autenticación
- **Registro de Usuario**: Los usuarios pueden registrarse proporcionando un correo electrónico y una contraseña. La contraseña se almacena de forma segura utilizando bcrypt.
- **Inicio de Sesión**: Los usuarios pueden iniciar sesión con su correo electrónico y contraseña. Se genera un token JWT para la autenticación.

### CRUD de Eventos
- **Crear un Evento**: Los usuarios autenticados pueden crear nuevos eventos proporcionando detalles como nombre, fecha, hora, ubicación y descripción.
- **Obtener Todos los Eventos**: Cualquier usuario puede ver todos los eventos disponibles.
- **Obtener Mis Eventos**: Los usuarios autenticados pueden ver solo los eventos que han creado.
- **Obtener un Evento por ID**: Los usuarios pueden ver los detalles de un evento específico utilizando su ID.
- **Actualizar un Evento**: Los usuarios autenticados pueden actualizar los detalles de un evento existente.
- **Eliminar un Evento**: Los usuarios autenticados pueden eliminar un evento específico.

## Estructura del Proyecto

- **backend/**: Contiene la lógica del servidor, incluyendo la configuración de rutas y modelos.
- **frontend/**: Contiene la interfaz de usuario de la aplicación.

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/Juan-Jose-W/Gestion-De-Eventos.git
   ```

2. Navega al directorio del backend y frontend y ejecuta:
   ```bash
   npm install
   ```

## Iniciar el Backend

1. Navega al directorio del backend:
   ```bash
   cd backend
   ```

2. Inicia el servidor:
   ```bash
   npm start o
   npm run dev
   ```

## Iniciar el Frontend

1. Navega al directorio del frontend:
   ```bash
   cd frontend
   ```

2. Inicia la aplicación:
   ```bash
   npm start
   ```
