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
- **Actualizar un Evento**: Los usuarios pueden actualizar los detalles de un evento existente.
- **Eliminar un Evento**: Los usuarios pueden eliminar un evento específico.

## Tecnologías Utilizadas

### Backend
- **Node.js**: Entorno de ejecución para JavaScript en el servidor.
- **Express**: Framework para construir aplicaciones web y APIs.
- **MongoDB**: Base de datos NoSQL para almacenar datos de usuarios y eventos.
- **Mongoose**: Biblioteca para modelar datos en MongoDB.
- **Bcrypt**: Biblioteca para encriptar contraseñas.
- **JSON Web Token (JWT)**: Para la autenticación de usuarios.

### Frontend
- **React**: Biblioteca para construir interfaces de usuario.
- **React Router**: Para la navegación entre diferentes componentes.
- **Axios**: Para realizar solicitudes HTTP al backend.
- **Material-UI**: Biblioteca de componentes de interfaz de usuario para React.
- **CSS**: Para el estilo de la aplicación.

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
   npm start o npm run dev
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

## Contribuciones

Las contribuciones son bienvenidas. Si deseas contribuir, por favor abre un issue o envía un pull request.
