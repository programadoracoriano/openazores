
import { createCookieSessionStorage, redirect } from "react-router";
import z from 'zod';
import bcrypt from 'bcryptjs';
import prisma from "~/lib/prisma";


type User = {
	id: string;
	email: string;
	name: string;
};


export const sessionStorage = createCookieSessionStorage({
	cookie: {
		name: "__session",
		httpOnly: true,
		path: "/",
		sameSite: "lax",
		secrets: [process.env.SECRET_KEY!],
		secure: process.env.NODE_ENV === "production",
	},
});

export async function createUserSession(userId: string, redirectTo: string) {
  const session = await sessionStorage.getSession();
  session.set("userId", userId);
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session),
    },
  });
}

export async function getUserId(request: Request) {
  const session = await sessionStorage.getSession(request.headers.get("Cookie"));
  const userId = session.get("userId");
  if (!userId) return null;
  return userId;
}

export async function logout(request: Request) {
  const session = await sessionStorage.getSession(request.headers.get("Cookie"));
  return redirect("/login", {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session),
    },
  });
}

export async function login(email: string, password: string): Promise<User> {
    const db = prisma;

    const payloadSchema = z.object({
        email: z.string().email("Formato de email inválido"),
        password: z.string().min(8, "A senha deve ter pelo menos 8 caracteres"),
    });

    const result = payloadSchema.safeParse({ email, password });
    if (!result.success) throw new Error("Dados inválidos");

    const user = await db.user.findUnique({ where: { email } });
    if (!user) throw new Error("Usuário não encontrado");

    const passwordsMatch = await bcrypt.compare(password, user.password);

    if (!passwordsMatch) {
        throw new Error("Senha incorreta");
    }

    return {
        id: user.id.toString(),
        email: user.email,
        name: user.name ?? "",
    };
}
