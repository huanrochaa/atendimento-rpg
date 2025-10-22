🧩 Atendimento RPG

Um sistema gamificado de atendimento ao cliente, desenvolvido em Next.js + TypeScript + Tailwind + shadcn/ui, que transforma o desempenho da equipe em uma experiência inspirada em RPG — com níveis, XP, atributos, conquistas, KPIs e missões.

🚀 Tecnologias Principais
Categoria	Tecnologias
Framework Web	Next.js 14

Linguagem	TypeScript

Estilo e UI	Tailwind CSS
, shadcn/ui
, Lucide Icons

Animações	Framer Motion

Testes	Vitest
 + React Testing Library

Gerenciador de Pacotes	pnpm

Controle de Código	Git
 + GitHub
📦 Instalação e Execução

1️⃣ Clonar o repositório

git clone https://github.com/huanrochaa/atendimento-rpg.git
cd atendimento-rpg


2️⃣ Instalar dependências

pnpm install


3️⃣ Executar em modo de desenvolvimento

pnpm dev


O app ficará disponível em http://localhost:3000

4️⃣ Rodar os testes

pnpm test --run

🎮 Funcionalidades

🧑‍💻 Ficha do Atendente — Mostra avatar, nome, equipe, nível atual e progresso de XP.

📊 KPIs com Feedback Visual — KPIs como TMA, FCR e CSAT com cores e tooltips de desempenho.

🧠 Atributos RPG — Comunicação, Conhecimento, Agilidade, Efetividade e Experiência do Cliente.

🏅 Conquistas e Badges — Exibe selos desbloqueados por metas e resultados de atendimento.

🎯 Missões Semanais — Desafios com progresso visual e recompensas em XP.

🕹️ Histórico de Evolução — Modal com conquistas, níveis ganhos e destaques de performance.

✨ Animações suaves — Entradas e barras de progresso animadas com Framer Motion.

🧱 Estrutura do Projeto
src/
├── app/
│   └── page.tsx               # Página inicial renderizando a ficha
├── components/
│   ├── FichaAtendenteRPG.tsx  # Componente principal da ficha
│   └── ui/                    # Componentes do shadcn/ui
├── tests/
│   └── FichaAtendenteRPG.test.tsx  # Testes unitários e de renderização

🧪 Testes Implementados

✅ Renderiza corretamente o nome do atendente

✅ Exibe o nível atual

✅ Mostra o progresso de XP

✅ Estrutura pronta para testes de interação (ex.: abrir modal)

🧩 Próximos Passos

 Adicionar integração com backend (NestJS + Prisma + PostgreSQL)

 Implementar ranking de atendentes

 Adicionar painel de gestão de desempenho

 Permitir customização de missões e badges

 Deploy em ambiente de produção (Vercel)

👨‍💻 Autor

Huan Rocha
📧 huan@netbox.net.br

💼 Gerente Regional - NETBOX INTERNET
🔗 GitHub

🪪 Licença

Este projeto está sob a licença MIT — veja o arquivo LICENSE para mais detalhes.
