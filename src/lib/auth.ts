import type { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "E-mail", type: "text" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        const email = process.env.ADMIN_EMAIL!;
        const password = process.env.ADMIN_PASSWORD!;
        if (
          credentials?.email === email &&
          credentials?.password === password
        ) {
          return { id: "admin-1", name: "Administrador", email };
        }
        return null;
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
};
