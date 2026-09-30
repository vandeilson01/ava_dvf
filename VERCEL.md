# AVA pronto para Vercel

## Publicação rápida

1. Extraia este ZIP.
2. Suba a pasta para um repositório GitHub ou importe a pasta pelo painel da Vercel.
3. Na Vercel, mantenha as configurações detectadas pelo `vercel.json`:
   - **Framework:** Vite
   - **Install command:** `pnpm install --frozen-lockfile`
   - **Build command:** `pnpm build`
   - **Output directory:** `dist`
4. Clique em **Deploy**.

O arquivo `vercel.json` já configura o fallback para o React Router, permitindo abrir diretamente rotas como `/dashboard`, `/alunos` e `/perfil` sem erro 404.

## Execução local

```bash
pnpm install
pnpm dev
```

Para simular produção:

```bash
pnpm build
pnpm preview
```

## Observação

Esta entrega é um front-end demonstrativo com dados mockados locais. Não existe backend, banco de dados ou autenticação real nesta versão. A senha das contas demonstrativas é `123456`.
