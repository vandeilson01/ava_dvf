# AVA — Centro Educa Mais Domingos Vieira Filho

Front-end demonstrativo de um Ambiente Virtual de Aprendizagem para gestão escolar. Esta versão usa React, Vite, TypeScript e dados mockados locais para representar o fluxo completo de gestão, acompanhamento pedagógico e comunicação.

> **Importante:** não há backend, banco de dados, API real ou autenticação real nesta etapa. A segurança visual e as permissões são apenas demonstrativas.

## Tecnologias

- React + Vite + TypeScript
- React Router
- Tailwind CSS
- Lucide React
- Framer Motion
- Recharts
- React Hook Form / Zod preparados para formulários
- Axios configurado para a futura API
- Context API para sessão, tema, acessibilidade e notificações

## Requisitos

- Node.js 22+
- pnpm 11+

## Instalação e execução

```bash
pnpm install
pnpm dev
```

O Preview escuta por padrão em `http://localhost:3000`.

## Comandos

```bash
pnpm dev       # servidor de desenvolvimento
pnpm build     # checagem TypeScript e build de produção
pnpm preview   # servir o build localmente
```

Os comandos equivalentes `npm install`, `npm run dev` e `npm run build` também funcionam quando o projeto é instalado com npm.

## Usuários mockados

Use qualquer uma das contas abaixo com a senha demonstrativa **123456**:

| Perfil | E-mail |
| --- | --- |
| Gestor Geral | gestor@escola.local |
| Gestor Pedagógico | pedagogico@escola.local |
| Gestor Administrativo | administrativo@escola.local |
| Professor | professor@escola.local |
| Aluno | aluno@escola.local |

A autorização real não deve confiar no front-end. O Laravel deverá validar sessão, perfil e permissões no servidor.

## Deploy na Vercel

O projeto inclui `vercel.json` com build Vite, saída `dist` e fallback para as rotas do React Router. Consulte [VERCEL.md](./VERCEL.md) para o passo a passo.

## Módulos

- Dashboard geral, pedagógico e administrativo
- Alunos, professores, disciplinas e turmas
- Atividades e entregas
- Notas em diário eletrônico com média automática
- Frequência e justificativas
- Comunicados
- Calendário escolar
- Assistente IA com respostas mockadas
- Relatórios
- Configurações de tema e acessibilidade

## Estrutura

```text
src/
├── components/       # shell, navegação e componentes de UI
├── contexts/         # sessão, tema, acessibilidade e notificações
├── data/mocks.ts     # registros demonstrativos locais
├── lib/              # Axios e permissões mockadas
├── pages/            # telas e módulos navegáveis
├── types/            # contratos de domínio
├── main.tsx          # rotas e bootstrap
└── styles.css        # tokens e estilos globais
```

## Futura integração com Laravel

1. Criar o Laravel como API REST com autenticação e autorização server-side.
2. Manter os contratos de domínio dos arquivos `src/types` alinhados aos Resources da API.
3. Substituir os arrays em `src/data/mocks.ts` por serviços em `src/lib/services` usando o cliente `src/lib/api.ts`.
4. Configurar `VITE_API_URL` para o endereço da API.
5. Implementar interceptors Axios para token/sessão, tratamento de erros e refresh.
6. Mover permissões e regras de acesso para Policies/Gates no Laravel, mantendo o front-end apenas como camada de experiência.
7. Conectar upload de arquivos, notificações e o Assistente IA aos endpoints correspondentes.

## Acessibilidade

A aplicação inclui foco visível, labels, `aria-label`, contraste reforçado, modo escuro, escala de fonte, redução de animações, suporte à preferência `prefers-reduced-motion`, estados vazios e mensagens de erro/sucesso.
