# 🎓 Clicksoft - Sistema de Gestão Escolar

> **Desafio Backend Node.js** - Sistema completo para gestão de professores, estudantes e salas de aula.

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias](#-tecnologias)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
- [Configuração](#-configuração)
- [Executando a Aplicação](#-executando-a-aplicação)
- [API Endpoints](#-api-endpoints)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Banco de Dados](#-banco-de-dados)
- [Testes](#-testes)
- [Docker](#-docker)
- [Contribuição](#-contribuição)

## 📖 Sobre o Projeto

O **Clicksoft** é um sistema de gestão escolar desenvolvido com **AdonisJS 6** que permite:

- Cadastro e gerenciamento de **professores** e **estudantes**
- Criação e administração de **salas de aula**
- Sistema de **matrícula** de estudantes em salas
- **Autenticação JWT** com middlewares de autorização
- **Controle de acesso** baseado em tipos de usuário
- **API RESTful** completa e documentada

## ✨ Funcionalidades

### 👨‍🏫 Professores

- ✅ Cadastro, visualização, edição e exclusão
- ✅ Criação e gerenciamento de salas de aula
- ✅ Alocação de estudantes em suas salas
- ✅ Listagem de estudantes por sala
- ✅ Controle de capacidade das salas

### 👨‍🎓 Estudantes

- ✅ Cadastro, visualização, edição e exclusão
- ✅ Visualização das salas matriculadas
- ✅ Informações detalhadas do professor e sala

### 🏫 Salas de Aula

- ✅ Criação com número, capacidade e disponibilidade
- ✅ Controle de lotação máxima
- ✅ Relacionamento professor-estudantes via tabela pivot
- ✅ Gerenciamento completo pelo professor proprietário

### 🔐 Autenticação & Autorização

- ✅ Sistema de login/logout com JWT
- ✅ Middlewares de proteção por tipo de usuário
- ✅ Controle granular de acesso às rotas
- ✅ Validação de permissões em tempo real

## 🛠 Tecnologias

### Backend

- **[AdonisJS 6](https://adonisjs.com/)** - Framework Node.js moderno
- **[TypeScript](https://www.typescriptlang.org/)** - Linguagem tipada
- **[Lucid ORM](https://lucid.adonisjs.com/)** - ORM para banco de dados
- **[VineJS](https://vinejs.dev/)** - Validação de dados
- **[JWT](https://jwt.io/)** - Autenticação stateless

### Banco de Dados

- **[PostgreSQL](https://www.postgresql.org/)** - Banco relacional
- **[Migrations](https://lucid.adonisjs.com/docs/migrations)** - Controle de versão do schema

### Ferramentas

- **[PNPM](https://pnpm.io/)** - Gerenciador de pacotes eficiente
- **[ESLint](https://eslint.org/)** - Linting de código
- **[Prettier](https://prettier.io/)** - Formatação de código
- **[Docker](https://www.docker.com/)** - Containerização
- **[Japa](https://japa.dev/)** - Framework de testes

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 24 u superior)
- **PNPM** (gerenciador de pacotes)
- **PostgreSQL** (ou Docker para executar via container)
- **Git** (para clonagem do repositório)

```bash
# Verificar versões
node --version  # >= 24.0.0
pnpm --version  # >= 10.0.0
```

## 🚀 Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/alefwhite/desafio-clicksoft.git
cd desafio-clicksoft
```

### 2. Instale as dependências

```bash
pnpm install
```

### 3. Configure o banco de dados

#### Opção A: PostgreSQL local

```bash
# Instale e configure o PostgreSQL
# Crie um banco de dados chamado 'clicksoft'
createdb clicksoft
```

#### Opção B: Docker (Recomendado)

```bash
# Execute o PostgreSQL via Docker Compose
docker-compose up -d pg
```

## ⚙️ Configuração

### 1. Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# Configurações do servidor
NODE_ENV=development
PORT=3333
HOST=0.0.0.0
LOG_LEVEL=info

# Chave da aplicação (gere uma nova)
APP_KEY=your-32-character-secret-key-here

# Configurações do banco de dados
DB_HOST=127.0.0.1
DB_PORT=5432
DB_USER=docker
DB_PASSWORD=docker
DB_DATABASE=clicksoft
```

### 2. Gerar APP_KEY

```bash
node ace generate:key
```

### 3. Executar Migrations

```bash
# Executar todas as migrations
pnpm run migration:run

# Ou usando ace diretamente
node ace migration:run
```

## 🏃‍♂️ Executando a Aplicação

### Desenvolvimento

```bash
# Executar em modo de desenvolvimento com hot reload
pnpm run dev

# Ou usando ace diretamente
node ace serve --hmr
```

### Produção

```bash
# Build da aplicação
pnpm run build

# Executar em produção
pnpm start
```

A aplicação estará disponível em: **http://localhost:3333**

### Verificar se está funcionando

```bash
curl http://localhost:3333/health-check
# Resposta: {"checked": true}
```

## 📚 API Endpoints

### 🔐 Autenticação

```http
POST /session          # Login
DELETE /session        # Logout (requer auth)
```

### 👨‍🏫 Professores

```http
POST /teachers                    # Cadastrar professor
GET /teachers/:id                 # Buscar professor (professor)
PUT /teachers/:id                 # Atualizar professor (professor)
DELETE /teachers/:id              # Deletar professor (professor)
POST /teachers/allocate-student   # Alocar estudante (professor)
```

### 👨‍🎓 Estudantes

```http
POST /students         # Cadastrar estudante
GET /students/:id      # Buscar estudante (estudante)
PUT /students/:id      # Atualizar estudante (estudante)
DELETE /students/:id   # Deletar estudante (estudante)
GET /my-rooms          # Minhas salas (estudante)
```

### 🏫 Salas

```http
POST /rooms                    # Criar sala (professor)
PUT /rooms/:id                 # Atualizar sala (professor)
DELETE /rooms/:id              # Deletar sala (professor)
GET /rooms/:id/students        # Listar estudantes da sala (professor)
```

### 📝 Exemplos de Uso

#### 1. Cadastrar Professor

```bash
curl -X POST http://localhost:3333/teachers \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Prof. João Silva",
    "email": "joao@escola.com",
    "password": "123456",
    "dateOfBirth": "1980-05-15",
    "registrationNumber": 12345
  }'
```

#### 2. Login

```bash
curl -X POST http://localhost:3333/session \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao@escola.com",
    "password": "123456"
  }'
```

#### 3. Criar Sala (com token)

```bash
curl -X POST http://localhost:3333/rooms \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "roomNumber": 101,
    "capacity": 30,
    "disponibility": true
  }'
```

#### 4. Ver minhas salas (estudante)

```bash
curl -X GET http://localhost:3333/my-rooms \
  -H "Authorization: Bearer STUDENT_JWT_TOKEN"
```

**Resposta:**

```json
{
  "message": "Suas salas listadas com sucesso",
  "data": {
    "studentName": "Maria Santos",
    "rooms": [
      {
        "id": "uuid-da-sala",
        "roomNumber": 101,
        "teacherName": "Prof. João Silva"
      }
    ]
  }
}
```

## 📁 Estrutura do Projeto

```
desafio-clicksoft/
├── 📁 app/
│   ├── 📁 controllers/         # Controladores da API
│   │   ├── session_controller.ts
│   │   ├── teacher_controller.ts
│   │   ├── student_controller.ts
│   │   └── room_controller.ts
│   ├── 📁 exceptions/          # Exceções customizadas
│   ├── 📁 middleware/          # Middlewares customizados
│   │   ├── auth_middleware.ts
│   │   ├── student_middleware.ts
│   │   └── teacher_middleware.ts
│   ├── 📁 models/             # Modelos do banco de dados
│   │   ├── user.ts
│   │   └── room.ts
│   ├── 📁 repositories/       # Camada de acesso a dados
│   ├── 📁 services/           # Regras de negócio
│   └── 📁 validators/         # Validadores de entrada
├── 📁 config/                 # Configurações
├── 📁 database/
│   └── 📁 migrations/         # Scripts de migração
├── 📁 start/                  # Inicialização
│   ├── routes.ts              # Definição das rotas
│   └── kernel.ts              # Configuração dos middlewares
├── 📁 tests/                  # Testes automatizados
├── .env.example               # Exemplo de variáveis de ambiente
├── docker-compose.yml         # Configuração Docker
├── Dockerfile                 # Imagem Docker da aplicação
└── package.json               # Dependências e scripts
```

## 🗄️ Banco de Dados

### Esquema das Tabelas

#### 👤 users

```sql
id (UUID, PK)
name (VARCHAR)
email (VARCHAR, UNIQUE)
password (VARCHAR)
date_of_birth (DATE)
registration_number (INTEGER, UNIQUE)
user_type (ENUM: 'student', 'teacher')
created_at (TIMESTAMP)
updated_at (TIMESTAMP)
```

#### 🏫 rooms

```sql
id (UUID, PK)
room_number (INTEGER)
capacity (INTEGER)
created_by (UUID, FK -> users.id)
disponibility (BOOLEAN)
created_at (TIMESTAMP)
updated_at (TIMESTAMP)
```

#### 🔗 rooms_users (Tabela Pivot)

```sql
id (INTEGER, PK)
user_id (UUID, FK -> users.id)
room_id (UUID, FK -> rooms.id)
created_at (TIMESTAMP)
updated_at (TIMESTAMP)
UNIQUE(user_id, room_id)
```

### Relacionamentos

- **User** `hasMany` **Room** (professor possui várias salas)
- **Room** `belongsTo` **User** (sala pertence a um professor)
- **User** `manyToMany` **Room** (estudantes podem estar em várias salas)

## 🧪 Testes

### Executar todos os testes

```bash
pnpm test
```

### Executar testes específicos

```bash
# Testes unitários
node ace test unit

# Testes funcionais
node ace test functional
```

### Estrutura de Testes

```
tests/
├── 📁 unit/           # Testes unitários
├── 📁 functional/     # Testes de integração/API
└── bootstrap.ts       # Configuração dos testes
```

## 🐳 Docker

### Desenvolvimento com Docker

#### 1. PostgreSQL apenas

```bash
# Executar apenas o banco de dados
docker-compose up -d pg
```

#### 2. Aplicação completa

```bash
# Build da imagem
docker build -t clicksoft-app .

# Executar aplicação
docker run -p 3333:3333 \
  -e DB_HOST=host.docker.internal \
  -e DB_PORT=5432 \
  -e DB_USER=docker \
  -e DB_PASSWORD=docker \
  -e DB_DATABASE=clicksoft \
  -e APP_KEY=your-app-key \
  clicksoft-app
```

### Produção

```bash
# Build otimizado para produção
docker build --target production -t clicksoft-prod .

# Executar em produção
docker run -p 3333:3333 \
  -e NODE_ENV=production \
  -e DB_HOST=your-prod-db-host \
  clicksoft-prod
```

## 🛡️ Segurança

### Middlewares Implementados

- **AuthMiddleware**: Verifica autenticação JWT
- **StudentMiddleware**: Permite acesso apenas a estudantes
- **TeacherMiddleware**: Permite acesso apenas a professores

### Validações

- **Entrada de dados**: Validação com VineJS
- **UUIDs**: Validação de formato correto
- **Emails únicos**: Prevenção de duplicatas
- **Senhas**: Criptografia com Scrypt

### CORS

- Configurado para aceitar requests de origens específicas
- Headers customizáveis para produção

## 📝 Scripts Disponíveis

```bash
# Desenvolvimento
pnpm run dev          # Servidor com hot reload
pnpm run build        # Build para produção
pnpm start            # Executar versão de produção

# Qualidade de código
pnpm run lint         # Verificar problemas de código
pnpm run format       # Formatar código com Prettier
pnpm run typecheck    # Verificar tipos TypeScript

# Banco de dados
pnpm run migration:run      # Executar migrations
pnpm run migration:rollback # Reverter migrations

# Testes
pnpm test            # Executar todos os testes
```

## 🤝 Contribuição

1. **Fork** o projeto
2. Crie uma **branch** para sua feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** suas mudanças (`git commit -m 'Add: AmazingFeature'`)
4. **Push** para a branch (`git push origin feature/AmazingFeature`)
5. Abra um **Pull Request**

### Padrões de Commit

```
feat: nova funcionalidade
fix: correção de bug
docs: documentação
style: formatação
refactor: refatoração
test: testes
chore: manutenção
```

## 📞 Suporte

Caso encontre problemas ou tenha dúvidas:

1. **Verifique os logs** da aplicação
2. **Confirme as variáveis** de ambiente
3. **Teste a conexão** com o banco de dados
4. **Consulte a documentação** do AdonisJS

### Logs úteis

```bash
# Verificar logs da aplicação
tail -f logs/app.log

# Logs do Docker
docker-compose logs -f pg

# Status do banco
node ace db:status
```

---

<div align="center">

**Desenvolvido com ❤️ usando AdonisJS**

[🔝 Voltar ao topo](#-clicksoft---sistema-de-gestão-escolar)

</div>
