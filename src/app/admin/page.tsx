"use client";

import { useState } from "react";
import { useAgents } from "@/store/agents";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, Trash2, Edit } from "lucide-react";

export default function AdminPage() {
  const { agents, add, update, remove } = useAgents();
  const [form, setForm] = useState({
    id: "",
    nome: "",
    cargo: "Suporte Técnico",
    nivel: 1,
    xpTotal: 0,
    avatarUrl: "",
    comunicacao: 70,
    efetividade: 70,
    agilidade: 70,
  });

  function reset() {
    setForm({
      id: "",
      nome: "",
      cargo: "Suporte Técnico",
      nivel: 1,
      xpTotal: 0,
      avatarUrl: "",
      comunicacao: 70,
      efetividade: 70,
      agilidade: 70,
    });
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const agent = {
      id: form.id || crypto.randomUUID(),
      nome: form.nome || "Novo Agente",
      cargo: form.cargo,
      nivel: Number(form.nivel),
      xpTotal: Number(form.xpTotal),
      avatarUrl: form.avatarUrl || undefined,
      atributos: {
        comunicacao: Number(form.comunicacao),
        efetividade: Number(form.efetividade),
        agilidade: Number(form.agilidade),
      },
    };
    if (form.id) update(agent);
    else add(agent);
    reset();
  }

  function edit(a: any) {
    setForm({
      id: a.id,
      nome: a.nome,
      cargo: a.cargo,
      nivel: a.nivel,
      xpTotal: a.xpTotal,
      avatarUrl: a.avatarUrl ?? "",
      comunicacao: a.atributos.comunicacao,
      efetividade: a.atributos.efetividade,
      agilidade: a.atributos.agilidade,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <div>
            <div className="text-sm text-slate-500 leading-none">Admin</div>
            <div className="text-lg font-semibold leading-none">Gerenciar Agentes</div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-6 space-y-6">
        {/* Formulário */}
        <Card className="rounded-2xl shadow-sm">
          <CardContent className="p-6">
            <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="md:col-span-1">
                <label className="text-sm">Nome</label>
                <Input value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })}/>
              </div>
              <div>
                <label className="text-sm">Cargo</label>
                <Input value={form.cargo} onChange={(e) => setForm({ ...form, cargo: e.target.value })}/>
              </div>
              <div>
                <label className="text-sm">Avatar URL</label>
                <Input value={form.avatarUrl} onChange={(e) => setForm({ ...form, avatarUrl: e.target.value })}/>
              </div>
              <div>
                <label className="text-sm">Nível</label>
                <Input type="number" value={form.nivel} onChange={(e) => setForm({ ...form, nivel: Number(e.target.value) })}/>
              </div>
              <div>
                <label className="text-sm">XP Total</label>
                <Input type="number" value={form.xpTotal} onChange={(e) => setForm({ ...form, xpTotal: Number(e.target.value) })}/>
              </div>

              <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm">Comunicação</label>
                  <Input type="number" value={form.comunicacao} onChange={(e) => setForm({ ...form, comunicacao: Number(e.target.value) })}/>
                </div>
                <div>
                  <label className="text-sm">Efetividade</label>
                  <Input type="number" value={form.efetividade} onChange={(e) => setForm({ ...form, efetividade: Number(e.target.value) })}/>
                </div>
                <div>
                  <label className="text-sm">Agilidade</label>
                  <Input type="number" value={form.agilidade} onChange={(e) => setForm({ ...form, agilidade: Number(e.target.value) })}/>
                </div>
              </div>

              <div className="md:col-span-3 flex gap-3">
                <Button type="submit" className="inline-flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  {form.id ? "Salvar alterações" : "Adicionar agente"}
                </Button>
                {form.id && (
                  <Button type="button" variant="outline" onClick={reset}>
                    Cancelar edição
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Lista */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {agents.map((a) => {
            const pct = Math.min(100, Math.round((a.xpTotal / 1500) * 100));
            return (
              <Card key={a.id} className="rounded-2xl shadow-sm">
                <CardContent className="p-5 space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-full overflow-hidden ring-2 ring-white shadow">
                        <Avatar>
                          <AvatarImage src={a.avatarUrl} alt={a.nome} />
                          <AvatarFallback>{a.nome.slice(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                      </div>
                      <div>
                        <div className="font-semibold leading-tight">{a.nome}</div>
                        <div className="text-xs text-slate-500">{a.cargo}</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="icon" variant="outline" onClick={() => edit(a)}><Edit className="h-4 w-4"/></Button>
                      <Button size="icon" variant="destructive" onClick={() => remove(a.id)}><Trash2 className="h-4 w-4"/></Button>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>XP Total</span>
                      <span className="text-slate-700 font-medium">{a.xpTotal}</span>
                    </div>
                    <Progress value={pct} />
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <div className="text-xs text-slate-500">Comunicação</div>
                      <div className="text-sm font-semibold">{a.atributos.comunicacao}</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500">Efetividade</div>
                      <div className="text-sm font-semibold">{a.atributos.efetividade}</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500">Agilidade</div>
                      <div className="text-sm font-semibold">{a.atributos.agilidade}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </main>
    </div>
  );
}
