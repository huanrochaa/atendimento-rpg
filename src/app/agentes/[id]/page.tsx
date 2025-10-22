"use client";

import { useParams } from "next/navigation";
import { AGENTES } from "@/data/agents";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeft, Star, Target } from "lucide-react";
import Link from "next/link";

export default function FichaAtendentePage() {
  const { id } = useParams();
  const agente = AGENTES.find((a) => a.id === id);

  if (!agente) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg)]">
        <div className="text-center">
          <p className="text-lg font-medium text-[var(--contrast)]">
            Agente não encontrado 😕
          </p>
          <Link
            href="/"
            className="text-[var(--brand)] font-semibold hover:underline mt-3 inline-block"
          >
            Voltar ao Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const metaXP = 1500;
  const progressoXP = Math.min(100, Math.round((agente.xpTotal / metaXP) * 100));

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <div className="max-w-6xl mx-auto px-6 py-8 space-y-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-[var(--brand)] hover:opacity-80 transition"
        >
          <ArrowLeft size={16} />
          Voltar ao Dashboard
        </Link>

        {/* Perfil do agente */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border border-[var(--neutral)] rounded-2xl shadow-sm">
            <CardContent className="p-6 flex flex-col sm:flex-row gap-6">
              <Avatar className="h-24 w-24 ring-4 ring-[var(--brand-50)] shadow-lg mx-auto sm:mx-0">
                <AvatarImage src={agente.avatarUrl} alt={agente.nome} />
                <AvatarFallback>{agente.nome.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <h1 className="text-2xl font-bold text-[var(--contrast)]">{agente.nome}</h1>
                <p className="text-sm text-[var(--muted)] mb-2">{agente.cargo}</p>

                <div className="flex items-center gap-3 mb-2">
                  <div className="flex items-center gap-1 bg-[var(--neutral)] rounded-full px-2 py-1 text-xs font-semibold text-[var(--contrast)]">
                    <Star size={12} className="text-[var(--brand)]" /> Nível {agente.nivel}
                  </div>
                  <div className="flex items-center gap-1 bg-[var(--neutral)] rounded-full px-2 py-1 text-xs font-semibold text-[var(--contrast)]">
                    <Target size={12} className="text-[var(--brand)]" /> XP {agente.xpTotal}
                  </div>
                </div>

                <div className="text-sm mb-1">Progresso até o próximo título</div>
                <Progress
                  value={progressoXP}
                  className="h-2 bg-[var(--neutral)]"
                  style={{ ["--progress" as any]: "var(--brand)" }}
                />
                <p className="text-xs mt-1 text-[var(--muted)]">
                  {progressoXP}% ({agente.xpTotal} / {metaXP} XP)
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Atributos */}
          <Card className="border border-[var(--neutral)] rounded-2xl shadow-sm">
            <CardContent className="p-6 space-y-4">
              <h2 className="text-lg font-semibold text-[var(--contrast)] mb-3">
                Atributos
              </h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-[var(--muted)] mb-1">
                    Comunicação — {agente.atributos.comunicacao}%
                  </p>
                  <Progress
                    value={agente.atributos.comunicacao}
                    className="h-2 bg-[var(--neutral)]"
                    style={{ ["--progress" as any]: "var(--brand-50)" }}
                  />
                </div>

                <div>
                  <p className="text-sm text-[var(--muted)] mb-1">
                    Efetividade — {agente.atributos.efetividade}%
                  </p>
                  <Progress
                    value={agente.atributos.efetividade}
                    className="h-2 bg-[var(--neutral)]"
                    style={{ ["--progress" as any]: "var(--accent)" }}
                  />
                </div>

                <div>
                  <p className="text-sm text-[var(--muted)] mb-1">
                    Agilidade — {agente.atributos.agilidade}%
                  </p>
                  <Progress
                    value={agente.atributos.agilidade}
                    className="h-2 bg-[var(--neutral)]"
                    style={{ ["--progress" as any]: "var(--accent-50)" }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* KPIs e Missões */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 border border-[var(--neutral)] rounded-2xl shadow-sm">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold text-[var(--contrast)] mb-3">
                KPIs Recentes
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-[var(--brand-50)] text-[var(--contrast)]">
                  <p className="text-sm font-medium">TMA (min)</p>
                  <p className="text-2xl font-bold">{agente.kpis.tma}</p>
                  <p className="text-xs opacity-80">Meta: 6</p>
                </div>
                <div className="p-4 rounded-lg bg-[var(--accent)] text-white">
                  <p className="text-sm font-medium">FCR (%)</p>
                  <p className="text-2xl font-bold">{agente.kpis.fcr}</p>
                  <p className="text-xs opacity-80">Meta: 85</p>
                </div>
                <div className="p-4 rounded-lg bg-[var(--contrast)] text-white">
                  <p className="text-sm font-medium">CSAT (%)</p>
                  <p className="text-2xl font-bold">{agente.kpis.csat}</p>
                  <p className="text-xs opacity-80">Meta: 85</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-[var(--neutral)] rounded-2xl shadow-sm">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold text-[var(--contrast)] mb-4">
                Missões Ativas
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-[var(--contrast)]">
                    Semana do FCR
                  </p>
                  <p className="text-xs text-[var(--muted)] mb-1">
                    Manter FCR ≥ 85%
                  </p>
                  <Progress
                    value={75}
                    className="h-2 bg-[var(--neutral)]"
                    style={{ ["--progress" as any]: "var(--brand)" }}
                  />
                </div>

                <div>
                  <p className="text-sm font-medium text-[var(--contrast)]">
                    Clientes Felizes
                  </p>
                  <p className="text-xs text-[var(--muted)] mb-1">
                    10 CSAT 100 em sequência
                  </p>
                  <Progress
                    value={40}
                    className="h-2 bg-[var(--neutral)]"
                    style={{ ["--progress" as any]: "var(--accent)" }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
