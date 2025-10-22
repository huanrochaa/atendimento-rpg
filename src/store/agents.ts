import { create } from "zustand";
import { AGENTES, type Agent } from "@/data/agents";

type State = {
  agents: Agent[];
  add(agent: Agent): void;
  update(agent: Agent): void;
  remove(id: string): void;
};

export const useAgents = create<State>((set) => ({
  agents: AGENTES, // inicial a partir do arquivo de dados
  add: (agent) => set((s) => ({ agents: [agent, ...s.agents] })),
  update: (agent) =>
    set((s) => ({
      agents: s.agents.map((a) => (a.id === agent.id ? agent : a)),
    })),
  remove: (id) =>
    set((s) => ({ agents: s.agents.filter((a) => a.id !== id) })),
}));
