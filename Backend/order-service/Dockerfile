# Stage 1: Build dependencies
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Stage 2: Final image
FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app ./

EXPOSE 5004

CMD ["npm", "start"]