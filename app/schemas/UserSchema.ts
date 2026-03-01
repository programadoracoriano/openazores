import z from 'zod';

export function UserCreateSchema (t: any) {
    return z
          .object({
              name: z
              .string()
              .min(2, t.signup.errors.nameMin)
              .max(50, t.signup.errors.nameMax),
              email: z
              .string()
              .email({message: t.common.errors.emailIsValid}),
              password: z
              .string()
              .min(8, t.signup.errors.passwordMin),
              confirmPassword: z
              .string()
              .min(1, t.signup.errors.confirmPassword),
          })
          .refine((data) => data.password === data.confirmPassword, {
              message: t.signup.errors.passwordMatch,
              path: ["confirmPassword"],
          });
}
