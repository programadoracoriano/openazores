import { type IntlayerConfig, Locales } from 'intlayer';

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.PORTUGUESE],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    contentDir: ['./app'],
  },
};

export default config;
