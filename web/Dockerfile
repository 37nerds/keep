FROM node:20-alpine

WORKDIR /app

RUN npm install -g pnpm@latest

COPY package.json package.json
COPY pnpm-lock.yaml pnpm-lock.yaml

RUN pnpm install
