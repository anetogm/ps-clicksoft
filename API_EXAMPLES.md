# Coleção de Exemplos de Requisições - API Clicksoft

## Variáveis de Ambiente

- `BASE_URL`: http://localhost:3333
- `TOKEN`: (será obtido após login)

---

## 1. AUTENTICAÇÃO

### 1.1. Registrar Novo Usuário

```http
POST {{BASE_URL}}/auth/register
Content-Type: application/json

{
  "fullName": "João Silva",
  "email": "joao@exemplo.com",
  "password": "senha123456"
}
```

### 1.2. Login

```http
POST {{BASE_URL}}/auth/login
Content-Type: application/json

{
  "email": "joao@exemplo.com",
  "password": "senha123456"
}
```

**Resposta de Sucesso:**

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

> **Importante:** Copie o valor do `token` para usar nas próximas requisições!

### 1.3. Obter Dados do Usuário Logado

```http
GET {{BASE_URL}}/api/me
Authorization: Bearer {{TOKEN}}
```

### 1.4. Logout

```http
POST {{BASE_URL}}/api/logout
Authorization: Bearer {{TOKEN}}
```

---

## 2. CLIENTES (CUSTOMERS)

### 2.1. Criar Cliente

```http
POST {{BASE_URL}}/api/customers
Authorization: Bearer {{TOKEN}}
Content-Type: application/json

{
  "cnpj": "12345678901234",
  "razaoSocial": "Empresa ABC Comércio LTDA",
  "nomeFantasia": "ABC Comércio",
  "cep": "01310100",
  "logradouro": "Avenida Paulista",
  "numero": "1578",
  "complemento": "Andar 10, Sala 101",
  "bairro": "Bela Vista",
  "cidade": "São Paulo",
  "estado": "SP",
  "telefone": "11987654321",
  "email": "contato@abccomercio.com.br"
}
```

### 2.2. Criar Segundo Cliente

```http
POST {{BASE_URL}}/api/customers
Authorization: Bearer {{TOKEN}}
Content-Type: application/json

{
  "cnpj": "98765432109876",
  "razaoSocial": "XYZ Tecnologia S.A.",
  "nomeFantasia": "XYZ Tech",
  "cep": "04551065",
  "logradouro": "Avenida Brigadeiro Faria Lima",
  "numero": "3900",
  "complemento": "Torre Norte",
  "bairro": "Itaim Bibi",
  "cidade": "São Paulo",
  "estado": "SP",
  "telefone": "11912345678",
  "email": "contato@xyztech.com.br"
}
```

### 2.3. Listar Todos os Clientes

```http
GET {{BASE_URL}}/api/customers
Authorization: Bearer {{TOKEN}}
```

### 2.4. Buscar Cliente por ID

```http
GET {{BASE_URL}}/api/customers/1
Authorization: Bearer {{TOKEN}}
```

### 2.5. Atualizar Cliente

```http
PUT {{BASE_URL}}/api/customers/1
Authorization: Bearer {{TOKEN}}
Content-Type: application/json

{
  "telefone": "11999887766",
  "email": "novoemail@abccomercio.com.br",
  "complemento": "Andar 12, Sala 120"
}
```

### 2.6. Deletar Cliente

```http
DELETE {{BASE_URL}}/api/customers/1
Authorization: Bearer {{TOKEN}}
```

---

## 3. CONTATOS (CONTACTS)

### 3.1. Criar Contato Principal

```http
POST {{BASE_URL}}/api/contacts
Authorization: Bearer {{TOKEN}}
Content-Type: application/json

{
  "customerId": 1,
  "nome": "Maria Santos Silva",
  "telefone": "11987654321",
  "email": "maria.santos@abccomercio.com.br",
  "tipo": "principal"
}
```

### 3.2. Criar Contato Secundário

```http
POST {{BASE_URL}}/api/contacts
Authorization: Bearer {{TOKEN}}
Content-Type: application/json

{
  "customerId": 1,
  "nome": "Pedro Oliveira",
  "telefone": "11976543210",
  "email": "pedro.oliveira@abccomercio.com.br",
  "tipo": "secundario"
}
```

### 3.3. Listar Contatos de um Cliente

```http
GET {{BASE_URL}}/api/customers/1/contacts
Authorization: Bearer {{TOKEN}}
```

### 3.4. Buscar Contato por ID

```http
GET {{BASE_URL}}/api/contacts/1
Authorization: Bearer {{TOKEN}}
```

### 3.5. Atualizar Contato

```http
PUT {{BASE_URL}}/api/contacts/1
Authorization: Bearer {{TOKEN}}
Content-Type: application/json

{
  "nome": "Maria Santos Silva Costa",
  "telefone": "11999887766",
  "email": "maria.costa@abccomercio.com.br"
}
```

### 3.6. Deletar Contato

```http
DELETE {{BASE_URL}}/api/contacts/1
Authorization: Bearer {{TOKEN}}
```

---

## 4. CENÁRIOS DE TESTE

### 4.1. Fluxo Completo - Criar Cliente com Contatos

```bash
# 1. Registrar e fazer login
POST /auth/register → Criar usuário
POST /auth/login → Obter token

# 2. Criar cliente
POST /api/customers → Criar "Empresa ABC"

# 3. Criar contatos para o cliente
POST /api/contacts → Criar contato principal
POST /api/contacts → Criar contato secundário

# 4. Consultar cliente com contatos
GET /api/customers/1 → Ver cliente e seus contatos
```

### 4.2. Teste de Validação - CNPJ Duplicado

```http
# Primeiro cliente
POST {{BASE_URL}}/api/customers
Authorization: Bearer {{TOKEN}}
Content-Type: application/json

{
  "cnpj": "11111111111111",
  "razaoSocial": "Empresa A",
  "cep": "12345678",
  "logradouro": "Rua A",
  "numero": "1",
  "bairro": "Centro",
  "cidade": "São Paulo",
  "estado": "SP"
}

# Segundo cliente com mesmo CNPJ (deve falhar)
POST {{BASE_URL}}/api/customers
Authorization: Bearer {{TOKEN}}
Content-Type: application/json

{
  "cnpj": "11111111111111",
  "razaoSocial": "Empresa B",
  "cep": "87654321",
  "logradouro": "Rua B",
  "numero": "2",
  "bairro": "Centro",
  "cidade": "Rio de Janeiro",
  "estado": "RJ"
}
```

### 4.3. Teste de Validação - Dados Inválidos

```http
POST {{BASE_URL}}/api/customers
Authorization: Bearer {{TOKEN}}
Content-Type: application/json

{
  "cnpj": "123",  # CNPJ inválido (deve ter 14 dígitos)
  "razaoSocial": "Empresa Teste",
  "cep": "123",   # CEP inválido (deve ter 8 dígitos)
  "logradouro": "Rua Teste",
  "numero": "100",
  "bairro": "Centro",
  "cidade": "São Paulo",
  "estado": "SAO"  # Estado inválido (deve ter 2 letras)
}
```

### 4.4. Teste de Autenticação - Sem Token

```http
GET {{BASE_URL}}/api/customers
# Não incluir Authorization header
# Deve retornar erro 401 Unauthorized
```

---

## 5. EXEMPLOS DE RESPOSTAS

### 5.1. Cliente Criado com Sucesso

```json
{
  "id": 1,
  "cnpj": "12345678901234",
  "razaoSocial": "Empresa ABC Comércio LTDA",
  "nomeFantasia": "ABC Comércio",
  "cep": "01310100",
  "logradouro": "Avenida Paulista",
  "numero": "1578",
  "complemento": "Andar 10, Sala 101",
  "bairro": "Bela Vista",
  "cidade": "São Paulo",
  "estado": "SP",
  "telefone": "11987654321",
  "email": "contato@abccomercio.com.br",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

### 5.2. Lista de Clientes com Contatos

```json
[
  {
    "id": 1,
    "cnpj": "12345678901234",
    "razaoSocial": "Empresa ABC Comércio LTDA",
    "nomeFantasia": "ABC Comércio",
    "cep": "01310100",
    "logradouro": "Avenida Paulista",
    "numero": "1578",
    "complemento": "Andar 10, Sala 101",
    "bairro": "Bela Vista",
    "cidade": "São Paulo",
    "estado": "SP",
    "telefone": "11987654321",
    "email": "contato@abccomercio.com.br",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z",
    "contacts": [
      {
        "id": 1,
        "customerId": 1,
        "nome": "Maria Santos Silva",
        "telefone": "11987654321",
        "email": "maria.santos@abccomercio.com.br",
        "tipo": "principal",
        "createdAt": "2024-01-15T10:35:00.000Z",
        "updatedAt": "2024-01-15T10:35:00.000Z"
      },
      {
        "id": 2,
        "customerId": 1,
        "nome": "Pedro Oliveira",
        "telefone": "11976543210",
        "email": "pedro.oliveira@abccomercio.com.br",
        "tipo": "secundario",
        "createdAt": "2024-01-15T10:36:00.000Z",
        "updatedAt": "2024-01-15T10:36:00.000Z"
      }
    ]
  }
]
```

### 5.3. Erro de Validação

```json
{
  "message": "Erro ao criar cliente",
  "error": {
    "errors": [
      {
        "field": "cnpj",
        "message": "O campo cnpj deve ter exatamente 14 caracteres"
      },
      {
        "field": "cep",
        "message": "O campo cep deve ter exatamente 8 caracteres"
      }
    ]
  }
}
```

### 5.4. Erro de CNPJ Duplicado

```json
{
  "message": "CNPJ já cadastrado"
}
```

### 5.5. Erro de Autenticação

```json
{
  "message": "Credenciais inválidas"
}
```

---

## 6. DICAS PARA TESTES

1. **Sempre faça login primeiro** para obter o token de autenticação
2. **Salve o token** em uma variável de ambiente para reutilizar
3. **Teste validações** com dados inválidos para garantir que a API está protegida
4. **Teste relacionamentos** criando clientes e contatos para verificar as associações
5. **Teste a cascata** de deleção: ao deletar um cliente, todos os seus contatos também devem ser removidos

## 7. SCRIPTS cURL

### Script completo de teste:

```bash
#!/bin/bash

BASE_URL="http://localhost:3333"

# 1. Registrar usuário
echo "1. Registrando usuário..."
curl -X POST $BASE_URL/auth/register \
  -H "Content-Type: application/json" \
  -d '{"fullName":"Teste User","email":"teste@exemplo.com","password":"senha123456"}'

echo -e "\n\n2. Fazendo login..."
# 2. Login e capturar token
LOGIN_RESPONSE=$(curl -s -X POST $BASE_URL/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"teste@exemplo.com","password":"senha123456"}')

TOKEN=$(echo $LOGIN_RESPONSE | grep -o '"token":"[^"]*' | cut -d'"' -f4)
echo "Token: $TOKEN"

echo -e "\n\n3. Criando cliente..."
# 3. Criar cliente
curl -X POST $BASE_URL/api/customers \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"cnpj":"12345678901234","razaoSocial":"Empresa Teste","cep":"12345678","logradouro":"Rua Teste","numero":"123","bairro":"Centro","cidade":"São Paulo","estado":"SP"}'

echo -e "\n\n4. Listando clientes..."
# 4. Listar clientes
curl -X GET $BASE_URL/api/customers \
  -H "Authorization: Bearer $TOKEN"
```
