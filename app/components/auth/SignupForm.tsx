"use client";
import { useFetcher } from "react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useIntlayer } from "react-intlayer";

type PayloadType = {
    email: string;
    password: string;
    confirmPassword: string;
    name: string;
}

export default function SignupForm() {
    const fetcher = useFetcher();
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
    const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PayloadType>({
    resolver: zodResolver(payloadSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const onSubmit = (data: PayloadType) => {

    fetcher.submit(data, { method: "post" });
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4 dark:bg-gray-900">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl dark:bg-gray-800">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Criar Conta</h1>
          <p className="text-gray-500 dark:text-gray-400">Preencha os dados abaixo</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" method="post">
          {/* Nome */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Nome Completo
            </label>
            <input
              {...register("name")}
              className={`w-full rounded-lg border p-2.5 outline-none transition-all dark:bg-gray-700 dark:text-white ${
                errors.name
                  ? "border-red-500 focus:ring-2 focus:ring-red-200"
                  : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              }`}
              placeholder="Ex: João Silva"
            />
            {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              E-mail
            </label>
            <input
              {...register("email")}
              type="email"
              className={`w-full rounded-lg border p-2.5 outline-none transition-all dark:bg-gray-700 dark:text-white ${
                errors.email
                  ? "border-red-500 focus:ring-2 focus:ring-red-200"
                  : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              }`}
              placeholder="nome@email.com"
            />
            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
          </div>

          {/* Grid de Senhas */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Senha
              </label>
              <input
                {...register("password")}
                type="password"
                className={`w-full rounded-lg border p-2.5 outline-none transition-all dark:bg-gray-700 dark:text-white ${
                  errors.password
                    ? "border-red-500 focus:ring-2 focus:ring-red-200"
                    : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                }`}
              />
              {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Confirmar Senha
              </label>
              <input
                {...register("confirmPassword")}
                type="password"
                className={`w-full rounded-lg border p-2.5 outline-none transition-all dark:bg-gray-700 dark:text-white ${
                  errors.confirmPassword
                    ? "border-red-500 focus:ring-2 focus:ring-red-200"
                    : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                }`}
              />
              {errors.confirmPassword && <p className="mt-1 text-xs text-red-500">{errors.confirmPassword.message}</p>}
            </div>
          </div>

          {/* Botão Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full items-center justify-center rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:cursor-not-allowed disabled:bg-blue-400"
          >
            {isSubmitting ? (
              <svg className="h-5 w-5 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            ) : (
              "Criar minha conta"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
