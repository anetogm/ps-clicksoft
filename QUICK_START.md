# 🚀 Guia Rápido de Início - 5 Minutos

## Passo 1: Instalar PostgreSQL com Docker (Mais Fácil)

```bash
docker run --name postgres-clicksoft -e POSTGRES_USER=clicksoft_user -e POSTGRES_PASSWORD=clicksoft123 -e POSTGRES_DB=clicksoft -p 5432:5432 -d postgres:15
```

> **Não tem Docker?** Veja o README.md para instruções de instalação do PostgreSQL local.

## Passo 2: Atualizar arquivo .env

Abra o arquivo `.env` e substitua as linhas do banco de dados por:

```env
DB_HOST=127.0.0.1
DB_PORT=5432
DB_USER=clicksoft_user
DB_PASSWORD=clicksoft123
DB_DATABASE=clicksoft
```

## Passo 3: Executar Migrations

```bash
node ace migration:run
```

## Passo 4: Iniciar o Servidor

```bash
npm run dev
```

O servidor estará rodando em: **http://localhost:3333**

## Passo 5: Testar a API

### 5.1. Registrar um usuário

```bash
curl -X POST http://localhost:3333/auth/register -H "Content-Type: application/json" -d "{\"fullName\":\"Teste User\",\"email\":\"teste@exemplo.com\",\"password\":\"senha123456\"}"
```

### 5.2. Fazer login e obter o token

```bash
curl -X POST http://localhost:3333/auth/login -H "Content-Type: application/json" -d "{\"email\":\"teste@exemplo.com\",\"password\":\"senha123456\"}"
```

**Copie o token retornado!**

### 5.3. Criar um cliente

```bash
curl -X POST http://localhost:3333/api/customers \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -d "{\"cnpj\":\"12345678901234\",\"razaoSocial\":\"Empresa Teste LTDA\",\"cep\":\"01310100\",\"logradouro\":\"Av Paulista\",\"numero\":\"1000\",\"bairro\":\"Bela Vista\",\"cidade\":\"São Paulo\",\"estado\":\"SP\"}"
```

### 5.4. Listar clientes

```bash
curl -X GET http://localhost:3333/api/customers -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

## 🎉 Pronto!

Sua API está funcionando! Agora você pode:

- ✅ Criar, listar, atualizar e deletar clientes
- ✅ Criar, listar, atualizar e deletar contatos
- ✅ Autenticar usuários

## 📖 Próximos Passos

- Leia o **README.md** para documentação completa
- Veja o **API_EXAMPLES.md** para mais exemplos de requisições
- Use Postman, Insomnia ou Thunder Client para testar visualmente

## ⚠️ Problemas?

### Erro ao conectar no banco

- Verifique se o Docker está rodando: `docker ps`
- Verifique se as credenciais no `.env` estão corretas

### Porta 3333 em uso

- Altere a porta no `.env`: `PORT=3334`

### Migration falha

- Verifique a conexão com o banco
- Rode: `docker logs postgres-clicksoft` para ver erros

## 🛠️ Comandos Úteis

```bash
# Parar o servidor
Ctrl + C

# Ver logs do PostgreSQL
docker logs postgres-clicksoft

# Parar o PostgreSQL
docker stop postgres-clicksoft

# Iniciar o PostgreSQL novamente
docker start postgres-clicksoft

# Reverter migrations
node ace migration:rollback

# Ver rotas disponíveis
node ace list:routes
```

---

**Dúvidas?** Consulte o README.md ou os exemplos em API_EXAMPLES.md
