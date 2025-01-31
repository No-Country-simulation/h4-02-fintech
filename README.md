![iupi](https://github.com/user-attachments/assets/0c295b15-c021-4d24-9912-d0bb067b460d)

![Estado del Proyecto](https://img.shields.io/badge/Estado-Lanzamiento-green) ![PRs Welcome](https://img.shields.io/badge/PRs-welcome-green) ![Java](https://img.shields.io/badge/Java-007396?logo=java&logoColor=white&color=007396) ![Spring Boot](https://img.shields.io/badge/Spring--Boot-6DB33F?logo=spring-boot&logoColor=white&color=6DB33F) ![Spring Security](https://img.shields.io/badge/Spring--Security-6DB33F?logo=spring-security&logoColor=white&color=6DB33F) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?logo=postgresql&logoColor=white&color=336791) ![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB&color=61DAFB) ![JWT](https://img.shields.io/badge/JWT-black?logo=json-web-tokens&logoColor=white&color=black) ![Swagger](https://img.shields.io/badge/Swagger-85EA2D?logo=swagger&logoColor=black&color=85EA2D) ![Postman](https://img.shields.io/badge/Postman-FF6C37?logo=postman&logoColor=white&color=FF6C37) ![Thymeleaf](https://img.shields.io/badge/Thymeleaf-005F0F?logo=thymeleaf&logoColor=white&color=005F0F) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?logo=tailwindcss&logoColor=white&color=06B6D4) ![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white&color=2496ED) ![Figma](https://img.shields.io/badge/Figma-000000?logo=figma&logoColor=white&color=000000) ![Git](https://img.shields.io/badge/Git-F05032?logo=git&logoColor=white&color=F05032) ![Slack](https://img.shields.io/badge/Slack-4A154B?logo=slack&logoColor=white&color=4A154B) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white&color=3178C6)

# IUPI - Plataforma Financiera para el Ahorro e Inversión

## 📌 Sobre el Proyecto

IUPI es una aplicación diseñada para incluir financieramente a la población argentina en un contexto económico complejo y cambiante. Nuestra plataforma brinda herramientas intuitivas y accesibles que facilitan el ahorro y la inversión para personas de diferentes edades y niveles de experiencia.

## 🚀 Funcionalidades Clave

- 📢 **Noticias financieras personalizadas** obtenidas a través de integraciones con APIs de fuentes confiables.
- 💡 **Tips y términos financieros diarios** para mejorar la educación financiera.
- 🗣️ **Foro interactivo** para compartir análisis y estrategias de inversión.
- 📈 **Herramientas para el ahorro e inversión**, adaptadas a distintos perfiles de riesgo.

## 📄 Documentación y vídeo de presentación

La documentación para el cliente y un video a modo de presentación se encuentra en un archivo de drive compartido en el cual se podrá acceder a toda la información y flujos del proyecto.

[Google drive](https://drive.google.com/drive/folders/1HFAL2TtVbyFZHMYeTxPR0Yk78lqQnoiK)

[Vídeo de presentación](https://www.youtube.com/watch?v=h5FeWcmCuYY&ab_channel=LionelStaricoff)

## 🖥️ Documentación de la API

La documentación de la API se puede acceder a través de Swagger. Utiliza la siguiente URL para ver todos los endpoints disponibles, así como los detalles sobre las solicitudes y respuestas.

[Ver Documentación de API en Swagger](https://financial-al.up.railway.app/swagger-ui/index.html)

## 👨🏿‍💻 Demo de la Aplicación

Puedes probar las funcionalidades de la aplicación accediendo a los siguientes enlaces:

### Plataforma Web

[IUPI Fintech](https://iupi.vercel.app/)

Este es el acceso para gestionar los aspectos financieros de la aplicación.

**Notas:**

- Usa las credenciales proporcionadas para acceder a las funcionalidades protegidas o regístrate para crear tu propia cuenta.
- Si necesitas más información, contáctanos.

## ⚡️ Ejecución del proyecto

### Guía de configuración del Frontend

#### 1️⃣ Ir a la carpeta `client`

Antes de ejecutar cualquier comando, navega al directorio del frontend:

```
cd client
```

#### 2️⃣ Crear un archivo `.env`

Crea un archivo `.env` en la carpeta `client` y añade las siguientes variables:

```
# URL base de la API para desarrollo local
VITE_API_URL=http://localhost:8080/api/v1/

# URL base de la API para producción (Descomentar cuando se despliegue)
# VITE_API_URL=https://fintech-production.up.railway.app/api/v1/

# Dominio de Auth0 (Reemplazar con el dominio real de Auth0)
VITE_APP_AUTH0_DOMAIN=

# ID de cliente de Auth0 (Reemplazar con el ID real de Auth0)
VITE_APP_AUTH0_CLIENT_ID=
```

**Notas:**

- `VITE_API_URL` es la URL de la API backend. Usa la versión de localhost para desarrollo y la URL de producción cuando despliegues la aplicación.
- `VITE_APP_AUTH0_DOMAIN` y `VITE_APP_AUTH0_CLIENT_ID` son necesarios para la autenticación. Completa estos valores con los datos correctos desde el panel de Auth0.

---

#### 3️⃣ Instalar dependencias

Ejecuta el siguiente comando dentro de la carpeta `client` para instalar todas las dependencias necesarias:

```
npm install
```

#### 4️⃣ Iniciar el servidor de desarrollo

Ejecuta el siguiente comando para iniciar el frontend en modo desarrollo:

```
npm run dev
```

#### 5️⃣ Construir para producción

Ejecuta el siguiente comando para generar la compilación para producción:

```
npm run build
```

### Guía de configuración del Backend

#### 1️⃣ Ir a la carpeta `server/h4-02/h4-02`

Navega al directorio del backend:

```
cd server/h4-02/h4-02
```

#### 2️⃣ Crear un archivo `.env`

Crea un archivo `.env` y añade las siguientes variables:

```
SPRING_DATASOURCE_URL="jdbc:postgresql://localhost:5432/Fintech?user=lionel&password=1234"
SPRING_DATASOURCE_USERNAME=lionel
SPRING_DATASOURCE_PASSWORD=1234
SPRING_DATASOURCE_DB=Fintech
JWT_SECRET=
EMAIL_USERNAME=iupifintech.sup@gmail.com
EMAIL_PASSWORD=
FRONTEND_URL=http://localhost:5173
BACKEND_URL=http://localhost:8080
AUTH0_PUBLIC_KEYS_URI=
AUTH0_CLIENT_ID=
```

#### 3️⃣ Instalar dependencias

Ejecuta el siguiente comando dentro de la carpeta para correr el servidor en linux / macos:

```
./mvnw spring-boot:run

```

En windows:

```
./mvnw.cmd spring-boot:run

```

---

## 🪪 Licencia

Este proyecto está bajo la licencia de [IUPI Fitech versión 1.0.0](./LICENSE).

## 👮🏿 Políticas de seguridad

For detailed information about our security policy, please refer to the [SECURITY.md](SECURITY.md) file.

## 🥶 Agradecimientos

Este proyecto fue posible gracias a la organización de Hackathon por parte de [No Country](https://www.nocountry.tech/). Agradecemos a todo su equipo por brindar un espacio donde los desarrolladores pueden poner en práctica sus habilidades y colaborar en proyectos reales, contribuyendo al crecimiento profesional de todos los participantes.

## 👥 Equipo del Proyecto

### 🎨 Diseño UX

- **Claudia Stocco** - [LinkedIn](https://www.linkedin.com/in/claudia-stocco) / [GitHub](https://github.com/ClaudiaSTOCCO)

### 🕵️‍♀️ QA

- **Agostina Roggero** - [LinkedIn](https://www.linkedin.com/in/agostina-roggero/)

### 💻 Desarrollo

- **Lionel Staricoff** - [LinkedIn](https://www.linkedin.com/in/lionel-staricoff/) / [GitHub](https://github.com/LionelStaricoff)
- **Jefferson Panchi** - [LinkedIn](https://www.linkedin.com/in/jefferson-panchi-chacon/) / [GitHub](https://github.com/jfpanchi)
- **Nicolás Ibarra** - [GitHub](https://github.com/HikingCarrot7)
- **Juan Campos** - [LinkedIn](https://www.linkedin.com/in/jumacaq/) / [GitHub](https://github.com/jumacaq)

---

¡Gracias por apoyar IUPI! 🚀
