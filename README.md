# Description

## Correr en dev

1. Clonar el directorio
2. Crear una copia del ``` .env.template``` y renombrarlo a ```.env``` y cambiar las variables de entorno
3. Instalar las dependencias  ```pnpm install```
4. Levantar la base de datos ``` docker compose up -d```
5. Correr las migraciones de prisma ```npx prisma migrate dev```
6. Ejecutar el seed ```pnpm run seed```
7. Correr el proyecto ```pnpm run dev```
8. Limpiar el localStorage del navegador
