## Sobre o Projeto

Projeto simples de gerenciamento de tarefas, construído com NodeJS e ReactJS utlizando boas práticas de arquitetura e design de código.

## Tecnologias Utilizadas

### Backend
- **NestJS**
- **PostgreSQL**

### Frontend
- **React.js**
- **Vite**
- **React Router**
- **Material UI**

## Pré-requisitos

- **Node.js** versão 16 ou superior
- **Docker** e **Docker Compose**
- **npm**, **yarn** ou **pnpm** (gerenciador de pacotes)

## Configuração e Instalação

### Método 1: Execução Tradicional

#### 1. Configuração do Backend

```bash
# Navegue para a pasta do backend
cd back

# Instale as dependências
npm install
# ou
yarn install
# ou
pnpm install

# Levante o banco de dados PostgreSQL
docker-compose up --build
```

#### 2. Configuração do Frontend

```bash
# Navegue para a pasta do frontend
cd front

# Instale as dependências
npm install
# ou
yarn install
# ou
pnpm install
```

#### 3. Executando os Projetos

Em terminais separados, execute:

**Backend** (`/back`):
```bash
npm run start
# ou
yarn start
```

**Frontend** (`/front`):
```bash
npm run start
# ou
yarn start
```

**Acesso**: http://localhost:5173

### Método 2: Setup 100% Docker

```bash
# Na raiz do projeto (fora das pastas /back e /front)
docker-compose up --build
```

**Acesso**: http://localhost:3001

## Cadastro Inicial de Usuário

Como a interface de cadastro ainda não está implementada, é necessário criar um usuário via API:

### Via cURL:
```bash
curl --request POST \
  --url http://localhost:3000/users/register \
  --header 'Content-Type: application/json' \
  --data '{
    "email": "usuario@gmail.com",
    "password": "Minhasenha123456",
    "name": "Usuario"
  }'
```

### Via Swagger UI:
Acesse: http://localhost:3000/api/docs#/ e utilize o endpoint `/users/register`

Após criar o usuário, faça login na aplicação com as credenciais cadastradas.

## Estrutura do Projeto

### Backend (`/back`)

```
back/
├── src/
│   ├── main.ts                    # Ponto de entrada da aplicação
│   ├── app.module.ts             # Módulo principal da aplicação
│   │
│   ├── common/                   # Recursos compartilhados
│   │   ├── common.module.ts      # Módulo de recursos comuns
│   │   ├── dtos/                 # DTOs compartilhados
│   │   └── errors/               # Mensagens de erro padronizadas
│   │
│   ├── drivers/                  # Adaptadores e interfaces
│   │   ├── auth_guard.ts         # Guard de autenticação
│   │   ├── bcrypt_driver.ts      # Driver para hash de senhas
│   │   └── interfaces/           # Interfaces dos drivers
│   │
│   ├── tasks/                    # Módulo de tarefas
│   │   ├── tasks.controller.ts   # Controller REST para tarefas
│   │   ├── tasks.service.ts      # Lógica de negócio das tarefas
│   │   ├── tasks.module.ts       # Configuração do módulo
│   │   ├── entities/             # Entidades do banco de dados
│   │   ├── dtos/                 # Data Transfer Objects
│   │   ├── repository/           # Camada de acesso a dados
│   │   ├── constants/            # Constantes e anotações Swagger
│   │   ├── decorators/           # Decorators customizados
│   │   └── tests/                # Testes unitários e mocks
│   │
│   └── users/                    # Módulo de usuários
│       ├── users.controller.ts   # Controller REST para usuários
│       ├── users.service.ts      # Lógica de negócio dos usuários
│       ├── users.module.ts       # Configuração do módulo
│       ├── entities/             # Entidades do banco de dados
│       ├── dtos/                 # Data Transfer Objects
│       ├── repository/           # Camada de acesso a dados
│       ├── constants/            # Constantes e anotações Swagger
│       ├── decorators/           # Decorators customizados
│       └── tests/                # Testes unitários e mocks
│
├── docker-compose.yml            # Docker-Compose para configuração do banco PostregreSQL
```

### Frontend (`/front`)

```
front/
├── app/
│   ├── root.tsx                  # Componente raiz da aplicação
│   ├── routes.ts                 # Configuração das rotas
│   ├── app.css                   # Estilos globais
│   │
│   ├── components/               # Componentes reutilizáveis
│   │   └── header.tsx            # Componente de cabeçalho
│   │
│   ├── features/                 # Módulos por funcionalidade
│   │   ├── tasks/                # Funcionalidades de tarefas
│   │   │   ├── components/       # Componentes específicos de tarefas
│   │   │   ├── hooks/            # Hooks customizados
│   │   │   ├── services/         # Serviços de API
│   │   │   ├── utils/            # Utilitários
│   │   │   ├── validators/       # Schemas de validação
│   │   │   └── constants/        # Mensagens de erro
│   │   │
│   │   └── users/                # Funcionalidades de usuários
│   │       ├── constants/        # Mensagens de erro
│   │       └── validators/       # Schemas de validação
│   │
│   ├── hooks/                    # Hooks globais
│   │   └── use_auth.tsx          # Hook de autenticação
│   │
│   ├── pages/                    # Páginas da aplicação
│   │   ├── login/                # Página de login
│   │   └── tasks_board/          # Dashboard de tarefas
│   │
│   ├── private_routes/           # Rotas protegidas
│   │   └── private_routes_layout.tsx
│   │
│   └── services/                 # Serviços globais
│       └── api_client.ts         # Cliente HTTP (Axios)
│
├── Dockerfile                    # Imagem Docker do frontend
```

### Arquitetura

#### Backend
- **Arquitetura em Camadas**: Separation of concerns com controllers, services e repositories
- **Domain-Driven Design**: Organização por módulos de domínio (tasks, users)
- **Dependency Injection**: Uso do sistema de DI do NestJS
- **Repository Pattern**: Abstração da camada de dados
- **DTOs**: Validação e transformação de dados de entrada/saída
- **Facade Pattern**: Abstração de módulos externos (bcrypt, guards) para facilitar manutenção e substituição de dependências externas
- **Dependency Inversion**: Uso de interfaces para desacoplar implementações concretas, permitindo maior flexibilidade e testabilidade

#### Frontend  
- **Feature-Based Architecture**: Organização por funcionalidades
- **Custom Hooks**: Lógica de estado reutilizável
- **Service Layer**: Separação das chamadas de API
- **Component Composition**: Componentes pequenos e reutilizáveis
- **Form Validation**: Schemas de validação com bibliotecas especializadas