"use client";

import { Trophy } from "lucide-react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import AuthButtons from "@/components/AuthButtons";

export default function Header() {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  const subtitle = pathname.startsWith("/admin")
    ? "Painel Administrativo"
    : pathname.startsWith("/agentes")
    ? "Ficha do Agente"
    : "Dashboard RPG";

  return (
    <header
      className="w-full border-b sticky top-0 z-50"
      style={{ background: "var(--card)", borderColor: "var(--neutral)" }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Marca / título */}
        <div className="flex items-center gap-3">
          <div
            className="p-2 rounded-full shadow-soft"
            style={{ background: "var(--brand-50)" }}
          >
            <Trophy className="h-5 w-5" style={{ color: "var(--contrast)" }} />
          </div>
          <div>
            <h1 className="font-semibold text-lg" style={{ color: "var(--contrast)" }}>
              Atendimento RPG
            </h1>
            <p className="text-xs" style={{ color: "var(--muted)" }}>
              {subtitle}
            </p>
          </div>
        </div>

        {/* Usuário / Acesso */}
        <div className="flex items-center gap-4">
          {status === "authenticated" ? (
            <>
              <div className="flex items-center gap-2">
                <img
                  src={
                    session?.user?.image ||
                    "https://i.pinimg.com/564x/d0/4d/8d/d04d8d19b394d2e5e6fcfc1f758939a8.jpg"
                  }
                  alt="Avatar"
                  className="h-8 w-8 rounded-full object-cover border"
                  style={{ borderColor: "var(--neutral)" }}
                />
                <div className="text-right leading-tight">
                  <p className="text-sm font-medium" style={{ color: "var(--contrast)" }}>
                    {session.user?.name || "Administrador"}
                  </p>
                  <p className="text-[11px] uppercase" style={{ color: "var(--muted)" }}>
                    ADMIN
                  </p>
                </div>
              </div>
              <AuthButtons />
            </>
          ) : (
            <div className="flex items-center gap-3">
              <span className="text-xs hidden sm:inline" style={{ color: "var(--muted)" }}>
                Administrador
              </span>
              <AuthButtons />
            </div>
          )}
        </div>
      </div>

      {/* Barra fina de destaque com a cor da marca */}
      <div style={{ height: 3, background: "var(--brand)" }} />
    </header>
  );
}
