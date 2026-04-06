FROM node:20-alpine

# Establecer nuestro directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar el package.json y package-lock.json primero (buena práctica para aprovechar el caché de Docker)
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código del proyecto
COPY . .

# Exponer el puerto en el que corre tu app
EXPOSE 3000

# El comando que arranca el servidor para desarrollo (usando tu script dev)
CMD ["npm", "run", "dev"]
