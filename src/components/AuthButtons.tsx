"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function AuthButtons() {
  const { status } = useSession();

  // Enquanto carrega o estado da sessão
  if (status === "loading") {
    return <Button size="sm" variant="ghost">...</Button>;
  }

  // Se o usuário estiver autenticado → mostra botão “Sair”
  if (status === "authenticated") {
    return (
      <Button size="sm" onClick={() => signOut({ callbackUrl: "/" })}>
        Sair
      </Button>
    );
  }

  // Se não estiver logado → mostra botão “Admin”
  return (
    <Button size="sm" variant="outline" onClick={() => signIn()}>
      Admin
    </Button>
  );
}
