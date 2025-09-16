import React from "react";
import { render, screen } from "@testing-library/react";
import FichaAtendenteRPG from "@/components/FichaAtendenteRPG";
import { describe, it, expect } from "vitest";

describe("FichaAtendenteRPG", () => {
  it("renderiza o nome do atendente", () => {
    render(<FichaAtendenteRPG />);
    expect(screen.getByText("Ana Silva")).toBeInTheDocument();
  });

  it("mostra o nível atual", () => {
    render(<FichaAtendenteRPG />);
    expect(screen.getByText(/Nível 3/)).toBeInTheDocument();
  });
});
