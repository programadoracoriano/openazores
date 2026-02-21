import SignupForm from '~/components/auth/SignupForm';
import { data, redirect } from "react-router";
import { z } from "zod";
import bcrypt from "bcryptjs";
import type { Route } from "./+types/signup";
import prisma from "~/lib/prisma";


export async function action({ request }: Route.ActionArgs) {
    const db = prisma;
  const formData = await request.formData();
  const submission = Object.fromEntries(formData);
  const payloadSchema = z
      .object({
          name: z
          .string()
          .min(2, "O nome deve ter pelo menos 2 caracteres")
          .max(50, "O nome é muito longo"),
          email: z
          .string()
          .email("Formato de email inválido"),
          password: z
          .string()
          .min(8, "A senha deve ter pelo menos 8 caracteres"),
          confirmPassword: z
          .string()
          .min(1, "A confirmação de senha é obrigatória"),
      })
      .refine((data) => data.password === data.confirmPassword, {
          message: "As senhas não coincidem",
          path: ["confirmPassword"],
      });
  const result = payloadSchema.safeParse(submission);

  if (!result.success) {
    return data(
      { errors: result.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { email, password, name } = result.data;

  const userExists = await db.user.findUnique({ where: { email } });
  if (userExists) {
    return data(
      { errors: { email: ["Este email já está registado."] } },
      { status: 400 }
    );
  }


  const hashedPassword = await bcrypt.hash(password, 10);


  try {
    await db.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    return redirect("/login");
  } catch (error) {
    return data(
      { errors: { form: "Erro ao criar conta. Tente novamente." } },
      { status: 500 }
    );
  }
}
export default function SignupPage() {
    return (
        <>
            <SignupForm />
        </>
    )
}
