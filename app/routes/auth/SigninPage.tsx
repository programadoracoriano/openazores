import { Form, useActionData, useNavigation, data, redirect } from "react-router";
import { login, createUserSession, getUserId } from "../../../auth.server";
import type { Route } from "./+types/signin";

export async function action({ request }: Route.ActionArgs) {
    const formData = await request.formData();
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const user = await login(email, password);
      return createUserSession(user.id, "/user/dashboard");
    } catch (error: any) {
      return data({ error: error.message }, { status: 400 })
    }
}

export default function SigninPage() {
  const actionData = useActionData<Route.ComponentProps["actionData"]>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="max-w-md mx-auto mt-20 p-8 border rounded-xl shadow-lg bg-white">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Login</h1>

      <Form method="post" className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            required
            className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="seu@email.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Senha</label>
          <input
            type="password"
            name="password"
            required
            className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="********"
          />
        </div>

        {/* This displays "Usuário não encontrado" or "Senha incorreta" */}
        {actionData?.errors?.form && (
          <div className="p-3 text-sm text-red-700 bg-red-50 rounded-md border border-red-200">
            {actionData.errors.form}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition-colors disabled:bg-gray-400"
        >
          {isSubmitting ? "Entrando..." : "Entrar"}
        </button>
      </Form>
    </div>
  );
}

export async function loader({ request }: Route.LoaderArgs) {
	const userId = await getUserId(request);
  console.log("userId", userId)

	// If the user is already authenticated redirect to the dashboard

	// Otherwise return null to render the login page
	return data(null);
}
