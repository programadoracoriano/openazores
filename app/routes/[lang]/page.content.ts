import { t, type Dictionary } from "intlayer";

const pageContent = {
  key: "page",
  content: {
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
