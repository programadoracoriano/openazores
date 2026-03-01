import SignupForm from '~/components/auth/SignupForm';
import { data, redirect } from "react-router";
import { getIntlayer } from "intlayer";
import type { Route } from "./+types/signup";
import { UserCreateSchema } from '~/schemas/UserSchema';
import { createUser, getUserByEmail } from '~/models/UserModel';


export function meta({ params }: Route.MetaArgs) {
  const content = getIntlayer("page", params.locale);
  return [
    {title: content.signup.title}
  ]

}

export async function action({ request, params }: Route.ActionArgs) {

  const t = getIntlayer("page", params.locale);
  const formData = await request.formData();
  const submission = Object.fromEntries(formData);

  const payloadSchema = UserCreateSchema(t)
  const result = payloadSchema.safeParse(submission);

  if (!result.success) {
    return data(
      { errors: result.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { email } = result.data;

  const userExists = await getUserByEmail(email);

  if (userExists) {
    return data(
      { errors: { email: ["Este email já está registado."] } },
      { status: 400 }
    );
  }



  try {
    createUser(result.data)

    return redirect("/signin");
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
