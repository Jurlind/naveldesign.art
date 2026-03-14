import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://naveldesign.com',
  output: 'static',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'sq', 'de', 'it'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
