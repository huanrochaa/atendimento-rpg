# Contexto do Projeto — Atendimento RPG (Versão Atual)

## Stack
Next.js 15, TypeScript, Tailwind, shadcn/ui, Lucide, NextAuth (Credentials), Vitest.

## Paleta NETBOX (CSS variables)
--brand:#FF410D; --brand-600:#FF5A00; --brand-50:#FF8E00;
--accent:#FF7700; --accent-50:#FF9100; --neutral:#E5DAC1; --contrast:#470885;
--bg:#F8FAFC; --card:#FFFFFF; --text:#1E293B; --muted:#64748B.

## Arquivos principais
- src/app/globals.css  → define a paleta NETBOX via CSS vars.
- tailwind.config.ts   → mapeia vars para cores Tailwind (brand/accent/neutral/contrast/base).
- next.config.mjs      → images.remotePatterns (unsplash, dicebear, pinimg, wiki…).
- src/components/Header.tsx → header nas cores NETBOX + AuthButtons (NextAuth).
- src/components/AvatarImg.tsx → next/image + fallback por iniciais.
- src/app/page.tsx     → dashboard (StatCard/AgentCard com React.memo; Link prefetch off).
- src/app/agentes/[id]/page.tsx → ficha do agente (AvatarImg, atributos, KPIs, missões).

## Ambiente (.env.local)
NEXTAUTH_URL=…
NEXTAUTH_SECRET=…
ADMIN_EMAIL=…
ADMIN_PASSWORD=…
# opcional: REACT_EDITOR=code

## Scripts
dev: pnpm dev
test: pnpm test
build/start (produção): pnpm build && pnpm start

## Próximos passos sugeridos
1) Persistência (Prisma + SQLite dev / Postgres prod) + RBAC (role ADMIN/AGENT no NextAuth).
2) Admin (/admin) com CRUD de Agentes/Missões/KPIs (React Query + shadcn forms).
3) Motor de XP/Missões (regra declarativa + progress).
4) CI simples (lint + test) e, se crescer, E2E com Playwright.
5) Dark mode, virtualização do grid >30 agentes, Sentry/Analytics, rate limit nas APIs.
