"use client";

import Link from "next/link";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trophy, Users, Medal, Target } from "lucide-react";
import { AGENTES, type Agent } from "@/data/agents";

// ─────────────────────────────────────────────────────────────
// CARD DE ESTATÍSTICA
function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
}) {
  return (
    <Card className="rounded-2xl shadow-soft border border-[var(--neutral)]">
      <CardContent className="p-5 flex items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--brand-50)]">
          {icon ?? <Trophy className="h-5 w-5 text-[var(--contrast)]" />}
        </div>
        <div className="flex-1">
          <div className="text-sm text-[var(--muted)]">{title}</div>
          <div className="text-2xl font-semibold text-[var(--contrast)]">{value}</div>
        </div>
      </CardContent>
    </Card>
  );
}

// ─────────────────────────────────────────────────────────────
// CARD DE AGENTE
function AgentCard({ a }: { a: Agent }) {
  const metaXP = 1500;
  const pct = Math.min(100, Math.round((a.xpTotal / metaXP) * 100));

  return (
    <Card className="rounded-2xl shadow-soft border border-[var(--neutral)] hover:shadow-md transition">
      <CardContent className="p-5 space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 ring-2 ring-[var(--brand-600)] shadow">
              <AvatarImage src={a.avatarUrl} alt={a.nome} />
              <AvatarFallback>{a.nome.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-semibold leading-tight text-[var(--contrast)]">{a.nome}</div>
              <div className="text-xs text-[var(--muted)]">{a.cargo}</div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center">
            <span className="inline-flex items-center gap-1 rounded-full bg-[var(--brand-50)] px-2.5 py-1 text-xs text-[var(--contrast)]">
              Nível <span className="font-semibold">{a.nivel}</span>
            </span>
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-xs text-[var(--muted)]">
            <span>XP Total</span>
            <span className="text-[var(--contrast)] font-medium">{a.xpTotal}</span>
          </div>
          <Progress
            value={pct}
            className="h-2 bg-[var(--neutral)]"
            style={{ ["--progress" as any]: "var(--brand)" }}
          />
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="space-y-1">
            <div className="text-xs text-[var(--muted)]">Comunicação</div>
            <div className="text-sm font-semibold text-[var(--contrast)]">
              {a.atributos.comunicacao}
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-xs text-[var(--muted)]">Efetividade</div>
            <div className="text-sm font-semibold text-[var(--contrast)]">
              {a.atributos.efetividade}
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-xs text-[var(--muted)]">Agilidade</div>
            <div className="text-sm font-semibold text-[var(--contrast)]">
              {a.atributos.agilidade}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ─────────────────────────────────────────────────────────────
// PÁGINA PRINCIPAL
export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <Header />

      <main className="mx-auto max-w-7xl px-6 py-6 space-y-6">
        {/* Estatísticas principais */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <StatCard
            title="Total de Agentes"
            value={AGENTES.length}
            icon={<Users className="h-5 w-5 text-[var(--contrast)]" />}
          />
          <StatCard
            title="Missões Ativas"
            value={4}
            icon={<Target className="h-5 w-5 text-[var(--contrast)]" />}
          />
          <StatCard
            title="Badges Disponíveis"
            value={5}
            icon={<Medal className="h-5 w-5 text-[var(--contrast)]" />}
          />
        </div>

        {/* Lista de agentes */}
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-[var(--contrast)]">Agentes</h2>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {AGENTES.map((a) => (
              <Link
                key={a.id}
                href={`/agentes/${a.id}`}
                className="block transition-transform hover:scale-[1.02] duration-200"
              >
                <AgentCard a={a} />
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
