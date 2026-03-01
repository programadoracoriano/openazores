import { t, type Dictionary } from "intlayer";

const pageContent = {
  key: "page",
  content: {
    common: {
      errors: {
        emailIsValid: t({
          en: "Insert a valid e-mail",
          pt: "Insere um e-mail válido",
        })
      }
    },
    signup: {
      title: t({
        en: "Sign up - Open Azores",
        pt: "Criar Conta - Open Azores"
      }),
      errors: {
        nameMin: t({
          en: "You need to insert at least 2 characters",
          pt: "Precisas inserir pelo menos 2 caracteres",
        }),
        nameMax: t({
          en: "You can only use up to 50 characters",
          pt: "Só podes inserir 50 caracteres",
        }),
        passwordMin: t({
          en: "Your password needs to have at least 8 characters",
          pt: "A tua palavra-chave precisa de ter pelo menos 8 caracteres"
        }),
        confirmPassword: t({
          en: "You need to confirm your password",
          pt: "Precisa confirmar a sua password"
        }),
        passwordMatch: t({
          en: "Passwords doesn't match",
          pt: "As passwords não são iguais"
        })
      }
    },
    title: t({
      en: "Welcome to React Router v7 + Intlayer",
      pt: "Bem Vindo ao React Router v7 + IntLayer",
    }),
    description: t({
      en: "Build multilingual applications with ease using React Router v7 and Intlayer.",
      pt: "React Router v7 e Intlayer para construir aplicações multilíngues com facilidade.",
    }),
    aboutLink: t({
      en: "Know More About Us",
      pt: "Sabe Mais Acerca de Nós",
    }),
    homeLink: t({
      en: "Home",
      pt: "Home",
    }),
  },
} satisfies Dictionary;

export default pageContent;
