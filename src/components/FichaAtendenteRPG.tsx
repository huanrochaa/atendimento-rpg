import React, { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Star, Trophy, Sparkles, Shield } from "lucide-react";

// =============================================
// Protótipo: Ficha do Atendente (RPG de Atendimento)
// - Tailwind para estilo
// - shadcn/ui para componentes
// - Animações simples com classes CSS
// =============================================

// ---- Mock de dados ----
const MOCK_LEVELS = [
  { nivel: 1, xp_min: 0, titulo: "Aprendiz de Atendimento" },
  { nivel: 5, xp_min: 1500, titulo: "Guardião do Cliente" },
  { nivel: 10, xp_min: 6000, titulo: "Mestre da Satisfação" },
  { nivel: 20, xp_min: 30000, titulo: "Lendário do Suporte" },
];

const MOCK_AGENT = {
  id: "A001",
  nome: "Mestre Yoda",
  equipe: "Level 1",
  avatarUrl:
    "https://network.grupoabril.com.br/wp-content/uploads/sites/4/2020/02/desafio-jedi-de-mestre-yoda-consertar-as-frases-consegue-vocecc82.jpg?quality=70&strip=info&w=1024&crop=1",
  nivelAtual: 3,
  xpTotal: 850,
  atributos: {
    comunicacao: 82,
    conhecimento: 76,
    agilidade: 88,
    efetividade: 90,
    experiencia: 84,
  },
  badges: [
    { id: "B_VELO", nome: "Velocista", icone: "🏃", descricao: "Rapidez com qualidade" },
    { id: "B_WIKI", nome: "Mestre da Wiki", icone: "📚", descricao: "Domínio dos processos" },
  ],
  kpis: [
    { id: "M_TMA", nome: "TMA (min)", valor: 5.2, direcao: "menor-melhor", meta: 6 },
    { id: "M_FCR", nome: "FCR (%)", valor: 88, direcao: "maior-melhor", meta: 85 },
    { id: "M_CSAT", nome: "CSAT", valor: 91, direcao: "maior-melhor", meta: 85 },
  ],
};

// ---- Utilitários ----
function useLevelProgress(levels, xpTotal) {
  return useMemo(() => {
    const sorted = [...levels].sort((a, b) => a.xp_min - b.xp_min);
    let current = sorted[0];
    let next = undefined;
    for (let i = 0; i < sorted.length; i++) {
      if (xpTotal >= sorted[i].xp_min) {
        current = sorted[i];
      } else {
        next = sorted[i];
        break;
      }
    }
    const min = current.xp_min;
    const max = next?.xp_min ?? min + 1000;
    const pct = Math.max(0, Math.min(100, ((xpTotal - min) / (max - min)) * 100));
    return { current, next, pct, min, max };
  }, [levels, xpTotal]);
}

function Pill({ children }) {
  return (
    <span className="inline-flex items-center rounded-2xl px-3 py-1 text-xs border shadow-sm bg-white/70 backdrop-blur">
      {children}
    </span>
  );
}

function Kpi({ nome, valor, meta, direcao }) {
  const ok = direcao === "maior-melhor" ? valor >= meta : valor <= meta;
  return (
    <div className={`flex items-center justify-between rounded-2xl border p-3 ${ok ? "bg-emerald-50" : "bg-rose-50"}`}>
      <div className="text-sm">
        <div className="font-medium">{nome}</div>
        <div className="opacity-70 text-xs">Meta: {meta}</div>
      </div>
      <div className={`text-lg font-semibold ${ok ? "text-emerald-700" : "text-rose-700"}`}>{valor}</div>
    </div>
  );
}

function AttributeBar({ label, value }) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="font-medium">{label}</span>
        <span className="opacity-70">{value}%</span>
      </div>
      <Progress value={value} />
    </div>
  );
}

export default function FichaAtendenteRPG() {
  const { current, next, pct, min, max } = useLevelProgress(MOCK_LEVELS, MOCK_AGENT.xpTotal);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-white to-slate-50 p-6 md:p-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Perfil */}
        <Card className="md:col-span-1 shadow-md rounded-2xl">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-4">
              <img
                src={MOCK_AGENT.avatarUrl}
                alt={`Avatar de ${MOCK_AGENT.nome}`}
                className="h-20 w-20 rounded-2xl object-cover"
              />
              <div>
                <h1 className="text-xl font-semibold">{MOCK_AGENT.nome}</h1>
                <div className="text-sm opacity-70">{MOCK_AGENT.equipe}</div>
                <div className="mt-1 flex flex-wrap gap-2">
                  <Pill><Shield className="h-3.5 w-3.5 mr-1"/>Nível {MOCK_AGENT.nivelAtual}</Pill>
                  <Pill><Sparkles className="h-3.5 w-3.5 mr-1"/>XP {MOCK_AGENT.xpTotal}</Pill>
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <div className="text-sm font-medium">Progresso para o próximo título</div>
              <Progress value={pct} />
              <div className="text-xs opacity-70 flex justify-between">
                <span>{current.titulo}</span>
                <span>{Math.round(pct)}% ({MOCK_AGENT.xpTotal - min} / {max - min} XP)</span>
                <span>{next ? next.titulo : "Máximo"}</span>
              </div>
            </div>

            <div className="pt-4 space-y-3">
              <div className="font-medium">Conquistas</div>
              <div className="flex flex-wrap gap-2">
                {MOCK_AGENT.badges.map(b => (
                  <Pill key={b.id} title={b.descricao}>
                    <span className="mr-1" aria-hidden>{b.icone}</span>{b.nome}
                  </Pill>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <Button className="w-full">Ver histórico completo</Button>
            </div>
          </CardContent>
        </Card>

        {/* Atributos */}
        <Card className="md:col-span-2 shadow-md rounded-2xl">
          <CardContent className="p-6 space-y-5">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5"/>
              <h2 className="text-lg font-semibold">Atributos</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AttributeBar label="Comunicação" value={MOCK_AGENT.atributos.comunicacao} />
              <AttributeBar label="Conhecimento" value={MOCK_AGENT.atributos.conhecimento} />
              <AttributeBar label="Agilidade" value={MOCK_AGENT.atributos.agilidade} />
              <AttributeBar label="Efetividade" value={MOCK_AGENT.atributos.efetividade} />
              <AttributeBar label="Experiência do Cliente" value={MOCK_AGENT.atributos.experiencia} />
            </div>
          </CardContent>
        </Card>

        {/* KPIs */}
        <Card className="md:col-span-2 shadow-md rounded-2xl">
          <CardContent className="p-6 space-y-5">
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5"/>
              <h2 className="text-lg font-semibold">KPIs Recentes</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {MOCK_AGENT.kpis.map((k) => (
                <Kpi key={k.id} nome={k.nome} valor={k.valor} meta={k.meta} direcao={k.direcao} />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Ações / Missões */}
        <Card className="md:col-span-1 shadow-md rounded-2xl">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5"/>
              <h2 className="text-lg font-semibold">Missões</h2>
            </div>
            <div className="space-y-3 text-sm">
              <div className="border rounded-2xl p-3">
                <div className="font-medium">Semana do FCR</div>
                <div className="opacity-70">Manter FCR ≥ 85%</div>
                <div className="mt-2">
                  <Progress value={75} />
                  <div className="text-xs opacity-70 mt-1">75% concluído</div>
                </div>
              </div>
              <div className="border rounded-2xl p-3">
                <div className="font-medium">Clientes Felizes</div>
                <div className="opacity-70">10 CSAT 100 em sequência</div>
                <div className="mt-2">
                  <Progress value={40} />
                  <div className="text-xs opacity-70 mt-1">4/10</div>
                </div>
              </div>
            </div>
            <Button className="w-full">Ver catálogo de missões</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
