
# Eventos Climáticos

## Sobre o projeto

O projeto Eventos Climáticos é um sistema web criado para facilitar o registro e o acompanhamento de eventos climáticos em diferentes cidades. Nele, é possível cadastrar, visualizar, editar e excluir informações sobre as ocorrências, como temperatura máxima, tipo de evento, data e impactos causados.

O sistema conta com uma interface simples e organizada, conectada a um banco de dados por meio de uma API, permitindo armazenar e consultar os registros.
## Funcionalidades

- Login de usuários.
- Exibição do nome do usuário conectado.
- Cadastro de eventos climáticos.
- Listagem dos eventos cadastrados.
- Consulta das informações de cada evento.
- Edição de eventos existentes.
- Exclusão de eventos.
- Sugestão automática de descrição do impacto conforme o tipo de evento selecionado.
- Armazenamento dos dados em banco de dados MySQL.

## Tecnologias utilizadas

### Front-end
- HTML5
- CSS3
- JavaScript

### Back-end
- Node.js
- Express
- Prisma ORM

### Banco de dados
- MySQL

### Ferramentas
- Visual Studio Code
- Git
- GitHub
- Postman

## Telas do sistema

### Tela de Login
Permite que o usuário acesse o sistema utilizando seu e-mail e senha.

![Tela de Login](..x'/assets/login.png)

### Cadastro de Eventos
Permite registrar cidade, tipo de evento, temperatura máxima, data e nível de impacto.
![Tela inicial](../assets/cadastro.png)

### Gerenciamento de Eventos
Exibe os eventos cadastrados, permitindo editar ou excluir registros existentes.
![Tela inicial](../assets/registros.png)

## Estrutura do projeto

```text
eventos/
├── api/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   └── data/
│   ├── prisma/
│   ├── package.json
│   └── server.js
│
├── web/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   ├── login.js
│   │   └── home.js
│   ├── index.html
│   └── home.html
│
├── assets/
│   ├── cadastro.png
│   ├── login.png
│   └── registros.png
│
└── README.md
```

## Como iniciar o projeto

### 1. Programas necessários

Para utilizar o sistema, é necessário ter instalado:

- Node.js
- MySQL
- Visual Studio Code
- Git

### 2. Preparar o back-end

Abra o terminal do VS Code e entre na pasta da API:

```bash
cd api
npm install
```

Verifique se o arquivo `.env` está configurado corretamente com os dados de acesso ao MySQL.

Caso seja necessário, atualize a estrutura do banco de dados utilizando o Prisma.

### 3. Executar a API

Com o terminal aberto na pasta `api`, digite:

```bash
npm run dev
```

O servidor será iniciado no endereço:

```text
http://localhost:3000
```

### 4. Acessar o sistema

Abra o arquivo `index.html`, localizado na pasta `web`, utilizando a extensão Live Server do VS Code.

Na tela de login, informe o e-mail e a senha de um usuário registrado no banco de dados.

Após entrar, será possível visualizar e gerenciar os eventos climáticos.

## Endpoints da API

A API possui rotas para realizar as operações de cadastro, consulta, alteração e exclusão de registros.

| Método | Endereço | Função |
|--------|----------|--------|
| POST | `/usuario/login` | Autenticar usuário |
| POST | `/usuario` | Adicionar usuário |
| GET | `/usuario` | Consultar usuários |
| GET | `/usuario/:id` | Localizar usuário pelo ID |
| PUT | `/usuario/:id` | Modificar dados do usuário |
| DELETE | `/usuario/:id` | Remover usuário |
| POST | `/evento` | Registrar evento climático |
| GET | `/evento` | Consultar eventos |
| PUT | `/evento/:id` | Alterar informações de um evento |
| DELETE | `/evento/:id` | Remover evento cadastrado |

## Armazenamento das informações

Os dados do sistema são armazenados em um banco MySQL, utilizando o Prisma para realizar as operações necessárias.

Os registros dos eventos possuem:

- Nome da cidade.
- Categoria do evento climático.
- Temperatura máxima registrada.
- Data da ocorrência.
- Impactos provocados pelo evento.
- Identificação do usuário responsável.

Essas informações podem ser cadastradas, consultadas, modificadas e removidas por meio da aplicação.

## Finalidade da atividade

O sistema Eventos Climáticos foi criado durante as atividades do curso Técnico em Desenvolvimento de Sistemas do SENAI.

O desenvolvimento teve como finalidade colocar em prática os conteúdos estudados em aula, como criação de páginas web, desenvolvimento de APIs, conexão com banco de dados e realização das operações CRUD.