// src/data/agents.ts
export type Agent = {
  id: string;
  nome: string;
  cargo: string;
  nivel: number;
  xpTotal: number;
  avatarUrl?: string;
  atributos: { comunicacao: number; efetividade: number; agilidade: number };
  kpis?: { nome: string; valor: number; meta: number; direcao: "maior" | "menor" }[];
  missoes?: { titulo: string; descricao: string; progresso: number }[];
};

export const AGENTES: Agent[] = [
  {
    id: "a1",
    nome: "Ana Silva",
    cargo: "Suporte Técnico",
    nivel: 3,
    xpTotal: 850,
    avatarUrl: "https://api.dicebear.com/9.x/adventurer/svg?seed=ana&radius=50",
    atributos: { comunicacao: 85, efetividade: 80, agilidade: 90 },
    kpis: [
      { nome: "TMA (min)", valor: 5.2, meta: 6, direcao: "menor" },
      { nome: "FCR (%)", valor: 88, meta: 85, direcao: "maior" },
      { nome: "CSAT", valor: 91, meta: 85, direcao: "maior" },
    ],
    missoes: [
      { titulo: "Semana do FCR", descricao: "Manter FCR ≥ 85%", progresso: 75 },
      { titulo: "Clientes Felizes", descricao: "10 CSAT 100 em sequência", progresso: 40 },
    ],
  },
  {
    id: "a2",
    nome: "Carlos Mendes",
    cargo: "Suporte Técnico",
    nivel: 2,
    xpTotal: 450,
    avatarUrl: "https://api.dicebear.com/9.x/adventurer/svg?seed=carlos&radius=50",
    atributos: { comunicacao: 70, efetividade: 75, agilidade: 65 },
  },
  {
    id: "a3",
    nome: "Beatriz Santos",
    cargo: "Vendas",
    nivel: 4,
    xpTotal: 1200,
    avatarUrl: "https://api.dicebear.com/9.x/adventurer/svg?seed=beatriz&radius=50",
    atributos: { comunicacao: 95, efetividade: 90, agilidade: 80 },
  },
  {
    id: "a4",
    nome: "Diego Costa",
    cargo: "Suporte Técnico",
    nivel: 1,
    xpTotal: 150,
    avatarUrl: "https://api.dicebear.com/9.x/adventurer/svg?seed=diego&radius=50",
    atributos: { comunicacao: 60, efetividade: 65, agilidade: 70 },
  },
];

export function getAgentById(id: string) {
  return AGENTES.find((a) => a.id === id);
}
