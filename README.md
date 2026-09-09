# MyMeasure Front-end

Interface web do sistema MyMeasure - cadastro, login, registro de medidas pessoais e geração/visualização do código de acesso usado por e-commerces parceiros.

Projeto acadêmico desenvolvido para a disciplina Integradora de Projetos - PUCRS. Consome a [MyMeasure API](https://github.com/enzo-cezarg/my-measure-api).

## Stack

- **[React](https://react.dev/)** + **TypeScript**
- **[Vite](https://vite.dev/)** - build tool e dev server
- **[Tailwind CSS](https://tailwindcss.com/)** - estilização
- **[React Router](https://reactrouter.com/)** - rotas
- **[React Hook Form](https://react-hook-form.com/)** + **[Zod](https://zod.dev/)** - formulários e validação
- **[Axios](https://axios-http.com/)** - cliente HTTP
- **[lucide-react](https://lucide.dev/)** - ícones

## Pré-requisitos

- Node.js 20+
- npm
- A [MyMeasure API](https://github.com/enzo-cezarg/my-measure-api) rodando localmente (ou a URL configurada em `VITE_API_URL`)

## Configuração do ambiente

1. Instale as dependências:

   ```bash
   npm install
   ```

2. Suba o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

A aplicação sobe em `http://localhost:5173` por padrão.

> A API precisa estar rodando e com CORS configurado para aceitar essa origem (`FRONTEND_URL` no `.env` da API).

## Scripts disponíveis

| Comando           | Descrição                                  |
|--------------------|-----------------------------------------------|
| `npm run dev`       | Sobe o servidor de desenvolvimento (com HMR) |
| `npm run build`      | Gera o build de produção em `dist/`          |

## Estrutura do projeto

```
src/
├── api/
│   └── client.ts             # instância do axios (baseURL, cookies, interceptor de 401)
├── contexts/
│   ├── AuthContext.tsx        # estado global de autenticação
├── hooks/
│   └── useAuth.ts             # hook de acesso ao AuthContext
├── components/
│   ├── Navbar.tsx
│   ├── Sidebar.tsx
│   ├── MobileMenu.tsx
│   └── ProtectedRoute.tsx     # guarda de rotas autenticadas
├── layouts/
│   └── AppLayout.tsx          # navbar + sidebar fixas, conteúdo com scroll próprio
├── pages/
│   ├── Login/
│   ├── Cadastro/
│   ├── Dashboard/
│   ├── MinhasMedidas/
│   └── Configuracoes/
├── App.tsx                     # definição das rotas
└── main.tsx
```

Cada tela em `pages/` reúne, na mesma pasta, seu componente e o que só ela usa (schema de validação, subcomponentes específicos) - evitando espalhar arquivos relacionados em pastas genéricas.

## Autenticação

A aplicação usa cookie `httpOnly` para o token de sessão (gerenciado inteiramente pela API, o front nunca lê o token diretamente). O fluxo:

- `AuthProvider` busca o usuário autenticado (`GET /auth/me`) ao carregar a aplicação e expõe `user`, `status` e `logout()` via Context.
- `ProtectedRoute` bloqueia o acesso às rotas internas (`/dashboard`, `/medidas`, `/configuracoes`) enquanto não houver sessão válida, redirecionando para `/login`.
- Um interceptor do Axios detecta qualquer resposta `401` de qualquer chamada e atualiza o estado de autenticação automaticamente, mesmo fora das ações explícitas de logout.
- Todas as chamadas usam `withCredentials: true`, necessário para o cookie ser enviado/recebido em requisições cross-origin.

## Rotas

| Rota              | Tela                | Protegida |
|--------------------|----------------------|-----------|
| `/login`            | Login                 | Não       |
| `/cadastro`          | Cadastro               | Não       |
| `/dashboard`          | Página inicial (resumo das medidas e código de acesso) | Sim |
| `/medidas`            | Minhas Medidas (cadastro/exclusão) | Sim |
| `/configuracoes`      | Configurações (logout/exclusão de conta) | Sim |

## Validação de formulários

Os formulários usam **React Hook Form** com resolver do **Zod**: o schema centraliza as regras de validação (formato de e-mail, tamanho mínimo de senha, confirmação de senha, campos numéricos de medidas) e gera automaticamente o tipo TypeScript correspondente via `z.infer`.

## Responsividade

Layout mobile-first com Tailwind: abaixo do breakpoint `md`, a navegação usa um menu lateral deslizante (drawer) acionado por um botão hambúrguer; a partir do `md`, a sidebar fica fixa e visível. A navbar e a sidebar permanecem fixas na tela, com rolagem restrita à área de conteúdo.

## Decisões de projeto

- **React Hook Form + Zod em vez de estado manual com `useReducer`**: reduz código repetitivo e centraliza as regras de validação num schema único, reaproveitável e tipado.
- **Cookie `httpOnly` em vez de `localStorage`**: o token de sessão nunca é acessível via JavaScript, mitigando roubo de token por XSS.
- **Estado de autenticação centralizado em Context**: evita múltiplas chamadas redundantes a `/auth/me` espalhadas pelos componentes.