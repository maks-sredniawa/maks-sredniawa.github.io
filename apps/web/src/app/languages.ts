export interface Language {
  readonly code: string;
  /** The key `assets/language.js` stores and matches against the browser's language. */
  readonly key: string;
  readonly path: string;
  readonly name: string;
}

const english: Language = { code: 'en', key: 'en', path: '/', name: 'English' };

export const languages: readonly Language[] = [
  english,
  { code: 'pl', key: 'pl', path: '/pl/', name: 'Polski' },
  { code: 'de', key: 'de', path: '/de/', name: 'Deutsch' },
  { code: 'es', key: 'es', path: '/es/', name: 'Español' },
  { code: 'fr', key: 'fr', path: '/fr/', name: 'Français' },
  { code: 'it', key: 'it', path: '/it/', name: 'Italiano' },
  { code: 'pt-BR', key: 'pt', path: '/pt-br/', name: 'Português (Brasil)' },
  { code: 'cs', key: 'cs', path: '/cs/', name: 'Čeština' },
  { code: 'uk', key: 'uk', path: '/uk/', name: 'Українська' },
];

export const languageFor = (locale: string): Language =>
  languages.find((language) => language.code === locale) ?? english;
