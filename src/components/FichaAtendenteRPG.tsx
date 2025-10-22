"use client";

import React, { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Star, Trophy, Sparkles, Shield } from "lucide-react";
import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

// =============================================
// Ficha do Atendente (RPG de Atendimento) — versão com:
// - Animações (framer-motion)
// - Tooltips nos KPIs
// - Dialog para "Histórico completo"
// - Acessibilidade e responsividade
// =============================================

// ---- Mock de dados ----
const MOCK_LEVELS = [
  { nivel: 1, xp_min: 0, titulo: "Aprendiz de Atendimento" },
  { nivel: 5, xp_min: 1500, titulo: "Guardião do Cliente" },
  { nivel: 10, xp_min: 6000, titulo: "Mestre da Satisfação" },
  { nivel: 20, xp_min: 30000, titulo: "Lendário do Suporte" },
];

const MOCK_AGENT = {
  id: "JEDI001",
  nome: "Mestre Yoda",
  equipe: "Ordem Jedi",
  avatarUrl:
    "https://upload.wikimedia.org/wikipedia/en/9/9b/Yoda_Empire_Strikes_Back.png",
  nivelAtual: 20,
  xpTotal: 30500,
  atributos: {
    comunicacao: 99,
    conhecimento: 100,
    agilidade: 85,
    efetividade: 95,
    experiencia: 100,
  },
  badges: [
    { id: "B_FORCE", nome: "Mestre da Força", icone: "🧘‍♂️", descricao: "Usa a Força com sabedoria" },
    { id: "B_LIGHTSABER", nome: "Guardião Jedi", icone: "⚔️", descricao: "Habilidade lendária com sabre de luz" },
  ],
  kpis: [
    { id: "M_TMA", nome: "TMA (min)", valor: 3.0, direcao: "menor-melhor", meta: 6 },
    { id: "M_FCR", nome: "FCR (%)", valor: 99, direcao: "maior-melhor", meta: 85 },
    { id: "M_CSAT", nome: "CSAT", valor: 100, direcao: "maior-melhor", meta: 85 },
  ],
};

const container = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

function useLevelProgress(levels: typeof MOCK_LEVELS, xpTotal: number) {
  return useMemo(() => {
    const sorted = [...levels].sort((a, b) => a.xp_min - b.xp_min);
    let current = sorted[0];
    let next = undefined as (typeof sorted)[number] | undefined;

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

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-2xl px-3 py-1 text-xs border shadow-sm bg-white">
      {children}
    </span>
  );
}

function Kpi({
  nome,
  valor,
  meta,
  direcao,
}: {
  nome: string;
  valor: number;
  meta: number;
  direcao: "maior-melhor" | "menor-melhor";
}) {
  const ok = direcao === "maior-melhor" ? valor >= meta : valor <= meta;
  return (
    <TooltipProvider delayDuration={120}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={`flex items-center justify-between rounded-2xl border p-3 transition-colors ${
              ok ? "bg-emerald-50 border-emerald-200" : "bg-rose-50 border-rose-200"
            }`}
            role="group"
            aria-label={`${nome}: ${valor} (meta ${meta})`}
          >
            <div className="text-sm">
              <div className="font-medium">{nome}</div>
              <div className="opacity-70 text-xs">Meta: {meta}</div>
            </div>
            <div className={`text-lg font-semibold ${ok ? "text-emerald-700" : "text-rose-700"}`}>
              {valor}
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>
            {ok ? "Dentro da meta" : "Ajustar para bater meta"} — Direção:{" "}
            {direcao === "maior-melhor" ? "maior é melhor" : "menor é melhor"}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

function AttributeBar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="font-medium">{label}</span>
        <span className="opacity-70">{value}%</span>
      </div>
      {/* Progress com animação suave */}
      <div className="relative">
        <Progress value={0} aria-hidden className="opacity-0 h-0" />
        <div className="h-2 rounded-full bg-muted overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${value}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="h-full bg-foreground/90"
            role="progressbar"
            aria-valuenow={value}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`${label} ${value}%`}
          />
        </div>
      </div>
    </div>
  );
}

export default function FichaAtendenteRPG() {
  const { current, next, pct, min, max } = useLevelProgress(MOCK_LEVELS, MOCK_AGENT.xpTotal);
  const [openHistory, setOpenHistory] = useState(false);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-white to-slate-50 p-6 md:p-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Perfil */}
        <motion.div variants={container} initial="hidden" animate="show">
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
                    <Pill>
                      <Shield className="h-3.5 w-3.5 mr-1" />
                      Nível {MOCK_AGENT.nivelAtual}
                    </Pill>
                    <Pill>
                      <Sparkles className="h-3.5 w-3.5 mr-1" />
                      XP {MOCK_AGENT.xpTotal}
                    </Pill>
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <div className="text-sm font-medium">Progresso para o próximo título</div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="h-full bg-foreground/90"
                    role="progressbar"
                    aria-valuenow={Math.round(pct)}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label="Progresso para o próximo título"
                  />
                </div>
                <div className="text-xs opacity-70 grid grid-cols-3">
                  <span>{current.titulo}</span>
                  <span className="text-center">
                    {Math.round(pct)}% ({MOCK_AGENT.xpTotal - min} / {max - min} XP)
                  </span>
                  <span className="text-right">{next ? next.titulo : "Máximo"}</span>
                </div>
              </div>

              <div className="pt-4 space-y-3">
                <div className="font-medium">Conquistas</div>
                <div className="flex flex-wrap gap-2">
                  {MOCK_AGENT.badges.map((b) => (
                    <Pill key={b.id} title={b.descricao}>
                      <span className="mr-1" aria-hidden>
                        {b.icone}
                      </span>
                      {b.nome}
                    </Pill>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <Button className="w-full" onClick={() => setOpenHistory(true)}>
                  Ver histórico completo
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Atributos */}
        <motion.div variants={container} initial="hidden" animate="show" transition={{ delay: 0.05 }}>
          <Card className="md:col-span-2 shadow-md rounded-2xl">
            <CardContent className="p-6 space-y-5">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5" />
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
        </motion.div>

        {/* KPIs */}
        <motion.div variants={container} initial="hidden" animate="show" transition={{ delay: 0.1 }}>
          <Card className="md:col-span-2 shadow-md rounded-2xl">
            <CardContent className="p-6 space-y-5">
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5" />
                <h2 className="text-lg font-semibold">KPIs Recentes</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {MOCK_AGENT.kpis.map((k) => (
                  <Kpi key={k.id} nome={k.nome} valor={k.valor} meta={k.meta} direcao={k.direcao as any} />
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Missões */}
        <motion.div variants={container} initial="hidden" animate="show" transition={{ delay: 0.15 }}>
          <Card className="md:col-span-1 shadow-md rounded-2xl">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                <h2 className="text-lg font-semibold">Missões</h2>
              </div>
              <div className="space-y-3 text-sm">
                <div className="border rounded-2xl p-3">
                  <div className="font-medium">Semana do FCR</div>
                  <div className="opacity-70">Manter FCR ≥ 85%</div>
                  <div className="mt-2">
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `75%` }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="h-full bg-foreground/90"
                      />
                    </div>
                    <div className="text-xs opacity-70 mt-1">75% concluído</div>
                  </div>
                </div>
                <div className="border rounded-2xl p-3">
                  <div className="font-medium">Clientes Felizes</div>
                  <div className="opacity-70">10 CSAT 100 em sequência</div>
                  <div className="mt-2">
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `40%` }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="h-full bg-foreground/90"
                      />
                    </div>
                    <div className="text-xs opacity-70 mt-1">4/10</div>
                  </div>
                </div>
              </div>
              <Button className="w-full">Ver catálogo de missões</Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Dialog de Histórico */}
      <Dialog open={openHistory} onOpenChange={setOpenHistory}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Histórico de Evolução</DialogTitle>
            <DialogDescription>
              Últimas conquistas, mudanças de nível e principais destaques de qualidade.
            </DialogDescription>
          </DialogHeader>

          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <Shield className="h-4 w-4 mt-0.5" />
              <div>
                <div className="font-medium">Subiu para Nível 3</div>
                <div className="opacity-70">+250 XP por metas batidas no mês</div>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Sparkles className="h-4 w-4 mt-0.5" />
              <div>
                <div className="font-medium">Conquista “Velocista”</div>
                <div className="opacity-70">TMA médio ≤ 6 min por 2 semanas</div>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Trophy className="h-4 w-4 mt-0.5" />
              <div>
                <div className="font-medium">FCR acima da meta</div>
                <div className="opacity-70">FCR 88% na última semana (meta 85%)</div>
              </div>
            </li>
          </ul>

          <DialogFooter>
            <Button onClick={() => setOpenHistory(false)}>Fechar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
