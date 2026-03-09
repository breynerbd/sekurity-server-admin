# 🔐 Sekurity Server - Admin Service

**Sekurity Server Admin** es un microservicio encargado de la **administración y moderación del sistema de seguridad de la plataforma**.

Este servicio permite a los administradores gestionar y supervisar:

- Comentarios de usuarios
- Reportes generados por los usuarios
- Calificaciones de reportes
- Usuarios del sistema
- Zonas registradas
- Estadísticas y control del sistema

El servicio está desarrollado con **Node.js, Express y PostgreSQL**, implementando mecanismos de seguridad como **rate limiting, validaciones de actividad diaria y manejo centralizado de errores**.

---

# 🚀 Tecnologías Utilizadas

- **Node.js**
- **Express.js**
- **PostgreSQL**
- **Sequelize (ORM)**
- **Helmet** – Seguridad de cabeceras HTTP
- **CORS** – Control de acceso
- **Docker**
- **Rate Limiting**

---

# 📁 Estructura del Proyecto

```
sekurity-server-admin
│
├── configs
│   ├── app.js
│   ├── cors-configuration.js
│   ├── dailyLimit-validators.js
│   ├── db.js
│   └── helmet-configuration.js
│
├── middlewares
│   ├── daily-limit-validators.js
│   ├── handle-errors.js
│   └── request-limit.js
│
├── src
│   ├── comments
│   ├── internals
│   ├── ratings
│   ├── reports
│   ├── users
│   ├── zones
│   └── associations.js
│
├── docker-compose.yml
├── Dockerfile
├── .env
├── index.js
├── package.json
└── README.md
```

---

# ⚙️ Instalación

## 1️⃣ Clonar el repositorio

```bash
git clone https://github.com/tu-repositorio/sekurity-server-admin.git
cd sekurity-server-admin
```

## 2️⃣ Instalar dependencias

```bash
npm install
```

## 3️⃣ Configurar variables de entorno

Crear un archivo `.env` en la raíz del proyecto:

```
PORT=3005

DB_NAME=sekurity
DB_USER=postgres
DB_PASSWORD=admin
DB_HOST=db
DB_PORT=5432

JWT_SECRET=F8dK92msLxQ1pZtW7eHrC4nVuY5aGbT3jRkP6qXsDfL8vNmH2wEcY9u1zT4sR
```

---

# 🗄️ Base de Datos

El servicio utiliza **PostgreSQL** como sistema de almacenamiento de datos.

Las entidades principales incluyen:

- **Users**
- **Comments**
- **Reports**
- **Ratings**
- **Zones**

Las relaciones entre estas entidades se definen en:

```
src/associations.js
```

---

# 📡 Funcionalidades Principales

El servidor permite a los administradores:

- Supervisar comentarios publicados
- Administrar reportes generados por usuarios
- Analizar estadísticas de reportes
- Gestionar calificaciones de reportes
- Administrar usuarios del sistema
- Gestionar zonas disponibles
- Aplicar reglas de seguridad del sistema

---

# 🌐 API Routes

A continuación se describen las principales rutas disponibles en el servicio.

---

# 💬 Comments Routes

**Base URL**

```
/comments
```

| Método | Endpoint | Descripción |
|------|------|------|
| GET | `/comments` | Obtener todos los comentarios |
| DELETE | `/comments/:id` | Eliminar un comentario |

Estas rutas permiten a los administradores **moderar contenido generado por los usuarios**.

---

# 🚨 Reports Routes

**Base URL**

```
/reports
```

| Método | Endpoint | Descripción |
|------|------|------|
| GET | `/reports` | Obtener todos los reportes |
| GET | `/reports/:id` | Obtener un reporte por ID |
| PATCH | `/reports/:id/status` | Actualizar estado del reporte |
| DELETE | `/reports/:id` | Eliminar un reporte |

Estas rutas permiten **gestionar incidentes reportados dentro del sistema**.

---

# ⭐ Ratings Routes

**Base URL**

```
/ratings
```

| Método | Endpoint | Descripción |
|------|------|------|
| GET | `/ratings` | Obtener todas las calificaciones |
| GET | `/ratings/averageByReport` | Obtener promedio de calificaciones por reporte |

Las calificaciones ayudan a **priorizar incidentes importantes dentro del sistema**.

---

# 👤 Users Routes

**Base URL**

```
/users
```

| Método | Endpoint | Descripción |
|------|------|------|
| GET | `/users` | Obtener todos los usuarios |
| GET | `/users/:id` | Obtener usuario por ID |
| PATCH | `/users/:id/deactivate` | Desactivar usuario |

Estas rutas permiten a los administradores **gestionar y supervisar cuentas del sistema**.

---

# 📍 Zones Routes

**Base URL**

```
/zones
```

| Método | Endpoint | Descripción |
|------|------|------|
| POST | `/zones` | Crear una zona |
| GET | `/zones` | Obtener todas las zonas |
| PUT | `/zones/:id` | Actualizar una zona |
| DELETE | `/zones/:id` | Eliminar una zona |

Las zonas representan **regiones o áreas dentro del sistema de reportes**.

---

# ⚙️ Internal Routes

**Base URL**

```
/internals
```

| Método | Endpoint | Descripción |
|------|------|------|
| POST | `/internals/sync-user` | Sincronizar usuario desde el servicio de autenticación |

Esta ruta es utilizada para **mantener sincronizados los usuarios entre microservicios**.

---

# 🛡️ Seguridad del Sistema

El servidor implementa varias **capas de seguridad**.

---

## 🚫 Rate Limiting

Limita la cantidad de solicitudes que puede realizar un cliente para **prevenir abusos**.

Middleware:

```
middlewares/request-limit.js
```

---

## 📅 Validación de límites diarios

Controla la cantidad de acciones permitidas dentro del sistema.

Archivo:

```
middlewares/daily-limit-validators.js
```

---

## ⚠️ Manejo global de errores

El sistema utiliza un **middleware centralizado** para manejar errores de la aplicación.

Archivo:

```
middlewares/handle-errors.js
```

---

# 🔗 Asociaciones de Modelos

Las relaciones entre entidades del sistema se configuran en:

```
src/associations.js
```

Esto permite manejar relaciones como:

- Usuario → Comentarios
- Usuario → Reportes
- Reporte → Ratings
- Usuario → Ratings

---

# 🐳 Docker

El proyecto incluye soporte completo para **contenedores Docker**.

## Construir la imagen

```bash
docker build -t sekurity-server-admin .
```

## Ejecutar contenedor

```bash
docker run -p 3005:3005 sekurity-server-admin
```

---

# 🐳 Docker Compose

El proyecto incluye un archivo:

```
docker-compose.yml
```

que permite levantar el servidor junto con la **base de datos PostgreSQL**.

## Ejecutar

```bash
docker-compose up --build
```