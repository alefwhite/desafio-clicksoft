# Use a imagem oficial do Node.js baseada no Alpine Linux para menor tamanho
FROM node:18-alpine AS base

# Instalar pnpm
RUN npm install -g pnpm

# Definir o diretório de trabalho
WORKDIR /app

# Copiar arquivos de configuração do pnpm
COPY package.json pnpm-lock.yaml ./

# Stage para instalação de dependências
FROM base AS deps

# Instalar dependências de produção e desenvolvimento
RUN pnpm install --frozen-lockfile

# Stage para build da aplicação
FROM base AS build

# Copiar node_modules da stage anterior
COPY --from=deps /app/node_modules ./node_modules

# Copiar código fonte
COPY . .

# Build da aplicação
RUN pnpm run build

# Instalar apenas dependências de produção
RUN pnpm prune --prod

# Stage final para produção
FROM node:18-alpine AS production

# Instalar pnpm
RUN npm install -g pnpm

# Criar usuário não-root para segurança
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 adonisjs

# Definir o diretório de trabalho
WORKDIR /app

# Copiar arquivos necessários para produção
COPY --from=build --chown=adonisjs:nodejs /app/build ./
COPY --from=build --chown=adonisjs:nodejs /app/node_modules ./node_modules
COPY --from=build --chown=adonisjs:nodejs /app/package.json ./package.json

# Mudar para o usuário não-root
USER adonisjs

# Expor a porta da aplicação
EXPOSE 3333

# Definir variáveis de ambiente
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3333

# Comando para iniciar a aplicação
CMD ["node", "bin/server.js"]
