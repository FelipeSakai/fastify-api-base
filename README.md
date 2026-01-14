# Fastify API Base

Projeto base para estudos de **Node.js + TypeScript + Fastify**, focado em boas práticas,
organização de código e ferramentas modernas do ecossistema backend.

A ideia deste repositório é evoluir a aplicação de forma incremental, adicionando
módulos, banco de dados, validações, testes e outras funcionalidades comuns em APIs reais.

---

## 🚀 Stack

- Node.js
- TypeScript
- Fastify
- Drizzle ORM (PostgreSQL)
- Zod (validação)
- ESLint + Prettier
- pnpm

---

## 📁 Estrutura do projeto

```txt
src/
 ├─ env.ts                # validação de variáveis de ambiente
 ├─ server.ts             # bootstrap do servidor
 ├─ app.ts                # instancia do Fastify e registro de rotas
 ├─ db/
 │   ├─ index.ts          # conexão com o banco (Drizzle)
 │   ├─ schema.ts         # definição das tabelas
 │   └─ migrations/       # migrations versionadas
 └─ modules/
     └─ notes/
         ├─ notes.schema.ts
         ├─ notes.controller.ts
         ├─ notes.service.ts
         └─ notes.routes.ts
