# maksforge.com home page

## Site text ships translated

Every change to text on the site, whether in a template or in the catalogue (`projects.ts`, `ideas.ts`), includes its translations for every language in `apps/web/project.json`, in the same PR. Never merge English-only text or leave a translation for later.

- Mark template text with `i18n` and text in TypeScript with `$localize`.
- After changing text, run `pnpm i18n:extract`, update every `apps/web/src/locale/messages.<language>.xlf`, and run `pnpm i18n:check`.

CI enforces this: lint rejects unmarked template text, and `pnpm i18n:check` fails on a missing, empty, leftover or still-English translation, a lost placeholder, or a missing plural form.
