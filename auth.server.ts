
import { Authenticator } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import { createCookieSessionStorage } from "react-router";
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


export const authenticator = new Authenticator<User>();

async function login(email: string, password: string): Promise<User> {
    const db = prisma;

    const payloadSchema = z.object({
        email: z.string().email("Formato de email inválido"),
        password: z.string().min(8, "A senha deve ter pelo menos 8 caracteres"),
    });

    const result = payloadSchema.safeParse({ email, password });
    console.log(result)
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

authenticator.use(
	new FormStrategy(async ({ form }) => {
		const email = form.get("email") as string;
		const password = form.get("password") as string;

		if (!email || !password) {
			throw new Error("Email and password are required");
		}

		return await login(email, password);
	}),
	"user-pass",
);
