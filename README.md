# Sistema de Gestão de Clientes - Clicksoft

API RESTful desenvolvida com AdonisJS para gerenciamento de clientes e contatos.

## 🚀 Tecnologias

- **AdonisJS 6** - Framework Node.js
- **PostgreSQL** - Banco de dados
- **TypeScript** - Linguagem
- **Lucid ORM** - ORM para banco de dados
- **VineJS** - Validação de dados

## 📋 Pré-requisitos

- Node.js (versão 20 ou superior)
- PostgreSQL instalado e rodando
- npm ou yarn

## 🔧 Configuração do Projeto

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar banco de dados PostgreSQL

Você precisa criar um banco de dados PostgreSQL. Existem algumas opções:

#### Opção A: Usar PostgreSQL local

Se você já tem PostgreSQL instalado:

```sql
-- Conecte no PostgreSQL como superusuário (postgres)
CREATE DATABASE clicksoft;
CREATE USER clicksoft_user WITH PASSWORD 'clicksoft123';
GRANT ALL PRIVILEGES ON DATABASE clicksoft TO clicksoft_user;
```

Depois, atualize o arquivo `.env`:

```env
DB_HOST=127.0.0.1
DB_PORT=5432
DB_USER=clicksoft_user
DB_PASSWORD=clicksoft123
DB_DATABASE=clicksoft
```

#### Opção B: Usar Docker

Se você tem Docker instalado:

```bash
docker run --name postgres-clicksoft -e POSTGRES_USER=clicksoft_user -e POSTGRES_PASSWORD=clicksoft123 -e POSTGRES_DB=clicksoft -p 5432:5432 -d postgres:15
```

Depois, atualize o arquivo `.env` com as mesmas credenciais acima.

### 3. Executar as migrations

```bash
node ace migration:run
```

### 4. Iniciar o servidor

```bash
# Modo desenvolvimento (com hot reload)
npm run dev

# Modo produção
npm run build
npm start
```

O servidor estará rodando em: `http://localhost:3333`

## 📚 Documentação da API

### Autenticação

Todas as rotas de clientes e contatos requerem autenticação via Bearer Token.

#### Registrar novo usuário

```http
POST /auth/register
Content-Type: application/json

{
  "fullName": "João Silva",
  "email": "joao@exemplo.com",
  "password": "senha123456"
}
```

#### Login

```http
POST /auth/login
Content-Type: application/json

{
  "email": "joao@exemplo.com",
  "password": "senha123456"
}
```

**Resposta:**

```json
{
  "message": "Login realizado com sucesso",
  "token": "oat_xxx...",
  "user": {
    "id": 1,
    "fullName": "João Silva",
    "email": "joao@exemplo.com"
  }
}
```

#### Logout

```http
POST /api/logout
Authorization: Bearer {seu_token}
```

#### Obter usuário autenticado

```http
GET /api/me
Authorization: Bearer {seu_token}
```

### Clientes (Customers)

#### Listar todos os clientes

```http
GET /api/customers
Authorization: Bearer {seu_token}
```

#### Criar novo cliente

```http
POST /api/customers
Authorization: Bearer {seu_token}
Content-Type: application/json

{
  "cnpj": "12345678901234",
  "razaoSocial": "Empresa Exemplo LTDA",
  "nomeFantasia": "Empresa Exemplo",
  "cep": "12345678",
  "logradouro": "Rua Exemplo",
  "numero": "123",
  "complemento": "Sala 10",
  "bairro": "Centro",
  "cidade": "São Paulo",
  "estado": "SP",
  "telefone": "11987654321",
  "email": "contato@exemplo.com"
}
```

#### Buscar cliente por ID

```http
GET /api/customers/:id
Authorization: Bearer {seu_token}
```

#### Atualizar cliente

```http
PUT /api/customers/:id
Authorization: Bearer {seu_token}
Content-Type: application/json

{
  "telefone": "11912345678",
  "email": "novo@exemplo.com"
}
```

#### Deletar cliente

```http
DELETE /api/customers/:id
Authorization: Bearer {seu_token}
```

### Contatos (Contacts)

#### Listar contatos de um cliente

```http
GET /api/customers/:customer_id/contacts
Authorization: Bearer {seu_token}
```

#### Criar novo contato

```http
POST /api/contacts
Authorization: Bearer {seu_token}
Content-Type: application/json

{
  "customerId": 1,
  "nome": "Maria Santos",
  "telefone": "11987654321",
  "email": "maria@exemplo.com",
  "tipo": "principal"
}
```

**Tipos de contato:** `principal` ou `secundario`

#### Buscar contato por ID

```http
GET /api/contacts/:id
Authorization: Bearer {seu_token}
```

#### Atualizar contato

```http
PUT /api/contacts/:id
Authorization: Bearer {seu_token}
Content-Type: application/json

{
  "nome": "Maria Santos Silva",
  "telefone": "11912345678"
}
```

#### Deletar contato

```http
DELETE /api/contacts/:id
Authorization: Bearer {seu_token}
```

## 🗄️ Estrutura do Banco de Dados

### Tabela: users

- `id` - Identificador único
- `full_name` - Nome completo
- `email` - Email (único)
- `password` - Senha (hash)
- `created_at` - Data de criação
- `updated_at` - Data de atualização

### Tabela: customers

- `id` - Identificador único
- `cnpj` - CNPJ (14 dígitos, único)
- `razao_social` - Razão social
- `nome_fantasia` - Nome fantasia
- `cep` - CEP (8 dígitos)
- `logradouro` - Logradouro
- `numero` - Número
- `complemento` - Complemento
- `bairro` - Bairro
- `cidade` - Cidade
- `estado` - Estado (2 letras)
- `telefone` - Telefone
- `email` - Email
- `created_at` - Data de criação
- `updated_at` - Data de atualização

### Tabela: contacts

- `id` - Identificador único
- `customer_id` - ID do cliente (chave estrangeira)
- `nome` - Nome do contato
- `telefone` - Telefone
- `email` - Email
- `tipo` - Tipo (`principal` ou `secundario`)
- `created_at` - Data de criação
- `updated_at` - Data de atualização

## 🧪 Testando a API

### Usando cURL

```bash
# 1. Registrar usuário
curl -X POST http://localhost:3333/auth/register \
  -H "Content-Type: application/json" \
  -d '{"fullName":"João Silva","email":"joao@exemplo.com","password":"senha123456"}'

# 2. Fazer login
curl -X POST http://localhost:3333/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"joao@exemplo.com","password":"senha123456"}'

# 3. Criar cliente (substituir SEU_TOKEN pelo token recebido no login)
curl -X POST http://localhost:3333/api/customers \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN" \
  -d '{"cnpj":"12345678901234","razaoSocial":"Empresa Exemplo LTDA","nomeFantasia":"Empresa Exemplo","cep":"12345678","logradouro":"Rua Exemplo","numero":"123","bairro":"Centro","cidade":"São Paulo","estado":"SP"}'

# 4. Listar clientes
curl -X GET http://localhost:3333/api/customers \
  -H "Authorization: Bearer SEU_TOKEN"
```

### Usando ferramentas GUI

Você também pode usar ferramentas como:

- **Postman** - https://www.postman.com/
- **Insomnia** - https://insomnia.rest/
- **Thunder Client** - Extensão do VS Code

## 📝 Validações

### Cliente (Customer)

- `cnpj`: Exatamente 14 dígitos numéricos, único no sistema
- `razaoSocial`: Obrigatório, mínimo 1 caractere
- `cep`: Exatamente 8 dígitos numéricos
- `estado`: Exatamente 2 letras maiúsculas
- `email`: Formato de email válido

### Contato (Contact)

- `customerId`: ID de cliente válido
- `nome`: Obrigatório
- `telefone`: Entre 10 e 15 caracteres
- `email`: Formato de email válido
- `tipo`: Deve ser `principal` ou `secundario`

## 🛠️ Comandos Úteis

```bash
# Executar migrations
node ace migration:run

# Reverter última migration
node ace migration:rollback

# Listar rotas
node ace list:routes

# Executar testes
npm test

# Verificar formatação
npm run format

# Verificar linting
npm run lint
```

## 📦 Estrutura do Projeto

```
ps-clicksoft/
├── app/
│   ├── controllers/     # Controllers da API
│   ├── models/          # Models (User, Customer, Contact)
│   ├── validators/      # Validadores de dados
│   └── middleware/      # Middlewares
├── config/              # Arquivos de configuração
├── database/
│   └── migrations/      # Migrations do banco de dados
├── start/
│   ├── routes.ts        # Definição de rotas
│   └── kernel.ts        # Configuração de middlewares
└── .env                 # Variáveis de ambiente
```

## 🔒 Segurança

- Senhas são armazenadas com hash usando Scrypt
- Autenticação via tokens (Access Tokens)
- Validação de dados em todas as requisições
- CORS configurado
- Proteção contra SQL Injection via ORM

## 📄 Licença

Este projeto foi desenvolvido como parte do processo seletivo da Clicksoft.

## 👤 Autor

Seu Nome - [Seu Email]

---

Desenvolvido com ❤️ usando AdonisJS
