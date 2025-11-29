# ✅ Checklist de Execução do Projeto

Use este checklist para garantir que tudo está funcionando corretamente.

## Antes de Começar

- [ ] Node.js instalado (v20+) - Verifique: `node --version`
- [ ] npm instalado - Verifique: `npm --version`
- [ ] Docker instalado (opcional) - Verifique: `docker --version`
- [ ] PostgreSQL instalado (se não usar Docker)

## Passo 1: Configuração Inicial

- [ ] Clonar/baixar o projeto
- [ ] Abrir o projeto no VS Code ou editor preferido
- [ ] Verificar se todos os arquivos estão presentes

## Passo 2: Instalar Dependências

```bash
npm install
```

- [ ] Comando executado sem erros
- [ ] `node_modules` criado
- [ ] Todas as dependências instaladas

## Passo 3: Configurar Banco de Dados

### Opção A - Docker (Recomendado)

```bash
docker run --name postgres-clicksoft -e POSTGRES_USER=clicksoft_user -e POSTGRES_PASSWORD=clicksoft123 -e POSTGRES_DB=clicksoft -p 5432:5432 -d postgres:15
```

- [ ] Container criado e rodando
- [ ] Verificar com: `docker ps`

### Opção B - PostgreSQL Local

```sql
CREATE DATABASE clicksoft;
CREATE USER clicksoft_user WITH PASSWORD 'clicksoft123';
GRANT ALL PRIVILEGES ON DATABASE clicksoft TO clicksoft_user;
```

- [ ] Banco de dados criado
- [ ] Usuário criado
- [ ] Permissões concedidas

## Passo 4: Configurar Variáveis de Ambiente

Editar o arquivo `.env`:

```env
DB_HOST=127.0.0.1
DB_PORT=5432
DB_USER=clicksoft_user
DB_PASSWORD=clicksoft123
DB_DATABASE=clicksoft
```

- [ ] Arquivo `.env` atualizado
- [ ] Credenciais corretas
- [ ] Salvar o arquivo

## Passo 5: Executar Migrations

```bash
node ace migration:run
```

- [ ] Comando executado com sucesso
- [ ] Tabelas criadas:
  - [ ] users
  - [ ] access_tokens
  - [ ] customers
  - [ ] contacts
- [ ] Sem erros no console

## Passo 6: Iniciar o Servidor

```bash
npm run dev
```

- [ ] Servidor iniciado sem erros
- [ ] Mensagem: "Server started on http://localhost:3333"
- [ ] Hot reload ativado
- [ ] Console sem erros

## Passo 7: Testar Endpoints

### 7.1. Testar Rota Raiz

```bash
curl http://localhost:3333
```

**Resposta esperada**:

```json
{
  "message": "API Clicksoft - Sistema de Gestão de Clientes",
  "version": "1.0.0"
}
```

- [ ] Rota raiz funcionando
- [ ] Resposta JSON correta

### 7.2. Registrar Usuário

```bash
curl -X POST http://localhost:3333/auth/register -H "Content-Type: application/json" -d "{\"fullName\":\"Teste User\",\"email\":\"teste@exemplo.com\",\"password\":\"senha123456\"}"
```

**Resposta esperada**: Status 201 + dados do usuário

- [ ] Usuário criado com sucesso
- [ ] Email único validado
- [ ] Senha com hash no banco

### 7.3. Fazer Login

```bash
curl -X POST http://localhost:3333/auth/login -H "Content-Type: application/json" -d "{\"email\":\"teste@exemplo.com\",\"password\":\"senha123456\"}"
```

**Resposta esperada**: Token de acesso

- [ ] Login bem-sucedido
- [ ] Token recebido
- [ ] Token copiado para uso

### 7.4. Testar Autenticação

```bash
curl -X GET http://localhost:3333/api/me -H "Authorization: Bearer SEU_TOKEN"
```

- [ ] Endpoint protegido funcionando
- [ ] Dados do usuário retornados
- [ ] Token validado

### 7.5. Criar Cliente

```bash
curl -X POST http://localhost:3333/api/customers -H "Content-Type: application/json" -H "Authorization: Bearer SEU_TOKEN" -d "{\"cnpj\":\"12345678901234\",\"razaoSocial\":\"Empresa Teste LTDA\",\"cep\":\"01310100\",\"logradouro\":\"Av Paulista\",\"numero\":\"1000\",\"bairro\":\"Bela Vista\",\"cidade\":\"São Paulo\",\"estado\":\"SP\"}"
```

- [ ] Cliente criado com sucesso
- [ ] Status 201 retornado
- [ ] Dados salvos no banco

### 7.6. Listar Clientes

```bash
curl -X GET http://localhost:3333/api/customers -H "Authorization: Bearer SEU_TOKEN"
```

- [ ] Lista retornada
- [ ] Cliente criado aparece na lista
- [ ] JSON bem formatado

### 7.7. Criar Contato

```bash
curl -X POST http://localhost:3333/api/contacts -H "Content-Type: application/json" -H "Authorization: Bearer SEU_TOKEN" -d "{\"customerId\":1,\"nome\":\"Maria Santos\",\"telefone\":\"11987654321\",\"email\":\"maria@exemplo.com\",\"tipo\":\"principal\"}"
```

- [ ] Contato criado
- [ ] Vinculado ao cliente correto
- [ ] Tipo validado

### 7.8. Listar Contatos do Cliente

```bash
curl -X GET http://localhost:3333/api/customers/1/contacts -H "Authorization: Bearer SEU_TOKEN"
```

- [ ] Contatos do cliente listados
- [ ] Relacionamento funcionando

### 7.9. Buscar Cliente com Contatos

```bash
curl -X GET http://localhost:3333/api/customers/1 -H "Authorization: Bearer SEU_TOKEN"
```

- [ ] Cliente retornado
- [ ] Contatos incluídos (preload)
- [ ] Relacionamento hasMany funcionando

### 7.10. Atualizar Cliente

```bash
curl -X PUT http://localhost:3333/api/customers/1 -H "Content-Type: application/json" -H "Authorization: Bearer SEU_TOKEN" -d "{\"telefone\":\"11999887766\"}"
```

- [ ] Cliente atualizado
- [ ] Apenas campos enviados foram alterados
- [ ] Status 200 retornado

### 7.11. Deletar Contato

```bash
curl -X DELETE http://localhost:3333/api/contacts/1 -H "Authorization: Bearer SEU_TOKEN"
```

- [ ] Contato deletado
- [ ] Status 204 retornado

### 7.12. Deletar Cliente

```bash
curl -X DELETE http://localhost:3333/api/customers/1 -H "Authorization: Bearer SEU_TOKEN"
```

- [ ] Cliente deletado
- [ ] Contatos também deletados (cascade)
- [ ] Status 204 retornado

## Passo 8: Testar Validações

### 8.1. CNPJ Duplicado

- [ ] Criar cliente com CNPJ
- [ ] Tentar criar outro com mesmo CNPJ
- [ ] Erro 409 Conflict retornado
- [ ] Mensagem: "CNPJ já cadastrado"

### 8.2. Dados Inválidos

- [ ] Enviar CNPJ com menos de 14 dígitos
- [ ] Erro 400 Bad Request
- [ ] Mensagem de validação clara

### 8.3. Email Inválido

- [ ] Enviar email sem @
- [ ] Erro de validação retornado

### 8.4. Sem Autenticação

- [ ] Tentar acessar `/api/customers` sem token
- [ ] Erro 401 Unauthorized

## Passo 9: Testar com Postman/Insomnia (Opcional)

- [ ] Importar coleção de requisições
- [ ] Testar todos os endpoints visualmente
- [ ] Verificar respostas

## Passo 10: Verificar Banco de Dados

### Usando Docker:

```bash
docker exec -it postgres-clicksoft psql -U clicksoft_user -d clicksoft
```

### Comandos SQL para verificar:

```sql
\dt                           -- Listar tabelas
SELECT * FROM users;          -- Ver usuários
SELECT * FROM customers;      -- Ver clientes
SELECT * FROM contacts;       -- Ver contatos
\q                            -- Sair
```

- [ ] Tabelas criadas
- [ ] Dados salvos corretamente
- [ ] Relacionamentos funcionando

## Checklist de Funcionalidades

### Autenticação

- [ ] Register funcionando
- [ ] Login funcionando
- [ ] Logout funcionando
- [ ] /me funcionando
- [ ] Token sendo validado
- [ ] Senha com hash

### Clientes

- [ ] Criar cliente
- [ ] Listar clientes
- [ ] Buscar cliente por ID
- [ ] Atualizar cliente
- [ ] Deletar cliente
- [ ] CNPJ único validado
- [ ] Validações funcionando

### Contatos

- [ ] Criar contato
- [ ] Listar contatos por cliente
- [ ] Buscar contato por ID
- [ ] Atualizar contato
- [ ] Deletar contato
- [ ] Relacionamento com cliente

### Relacionamentos

- [ ] Cliente tem múltiplos contatos
- [ ] Contato pertence a um cliente
- [ ] Cascade delete funcionando
- [ ] Preload funcionando

## Problemas Comuns e Soluções

### ❌ Erro: "autenticação do tipo senha falhou"

**Solução**:

- [ ] Verificar credenciais no `.env`
- [ ] Verificar se banco foi criado
- [ ] Reiniciar container Docker

### ❌ Erro: "Port 3333 already in use"

**Solução**:

- [ ] Alterar porta no `.env`
- [ ] Ou parar processo na porta 3333

### ❌ Erro: "Cannot find module"

**Solução**:

- [ ] Rodar `npm install` novamente
- [ ] Verificar node_modules

### ❌ Migrations falham

**Solução**:

- [ ] Verificar conexão com banco
- [ ] Verificar se banco existe
- [ ] Rodar `node ace migration:rollback` e tentar novamente

## Conclusão

- [ ] Todos os endpoints funcionando
- [ ] Validações testadas
- [ ] Relacionamentos verificados
- [ ] Documentação lida
- [ ] Pronto para apresentar/entregar

## 📊 Resumo Final

✅ **Total de checks**: ~100+
✅ **Endpoints testados**: 14
✅ **Funcionalidades**: 100%
✅ **Documentação**: Completa

---

**Parabéns!** 🎉 Se todos os checks estão marcados, seu projeto está 100% funcional!

**Próximos passos**:

1. Ler o `README.md` para documentação completa
2. Consultar `API_EXAMPLES.md` para mais exemplos
3. Ver `CHALLENGE_MAPPING.md` para entender como os requisitos foram atendidos
