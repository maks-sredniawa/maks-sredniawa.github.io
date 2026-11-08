# maksforge.com

The MaksForge site at [maksforge.com](https://maksforge.com), hosted on Cloudflare (Workers static assets).

It is the home page here plus every app's site: each public `maks-sredniawa` repo (archived ones included) whose `docs/_config.yml` uses `remote_theme: maks-sredniawa/pages-theme` is built with Jekyll and published at `maksforge.com/<repo>/`. A new app needs nothing beyond that config.

## The monorepo

An [Nx](https://nx.dev) workspace on pnpm and Node 26 (`.nvmrc`):

| Project        | What it is                                                                                                                                                                                                          |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `apps/web`     | The home page: Angular, prerendered to static HTML at build time. The cards and ideas live in `src/app/catalog/`; the About counts follow from them.                                                                |
| `packages/ui`  | The design system: brand tokens and the global stylesheet (`styles/`, with Tailwind) and the Angular components built on them, each with Storybook stories. The app sites' `pages-theme` loads this stylesheet too. |
| `apps/api`     | A Fastify skeleton for when the site needs a backend. Not deployed: the site has no API yet. `nx docker:build api` builds its image.                                                                                |
| `tests/e2e`    | Playwright tests of the built site, served through wrangler so `_headers` and the 404 page behave as in production.                                                                                                 |
| `tests/visual` | Playwright screenshot tests of every story and page, in dark and light, run in the Playwright Docker image so the pixels match on every machine.                                                                    |

```bash
pnpm install
pnpm start             # the home page at http://localhost:4200
pnpm storybook         # the components at http://localhost:4400
pnpm api               # the API at http://localhost:3000
pnpm lint && pnpm typecheck && pnpm test
pnpm e2e
pnpm visual            # pnpm visual:update after an intended visual change
```

All text on the page is marked for translation with `@angular/localize`. `pnpm i18n:extract` writes the messages to `apps/web/src/locale/`; adding a language means a translated copy there, a `locales` entry in `apps/web/project.json`, and teaching `scripts/build.sh` the per-locale output (`browser/<locale>/`, with the fixed `/assets/style.css` and a 404 page per locale); until then it stops with an error.

The design tokens are in `packages/ui/styles/tokens.css`, in two layers: primitives (`--mf-*`) and the semantic names the components read (`--color-*`, `--font-*`, `--layout-*`). Only the semantic layer changes in dark mode, and the brand colour is the two numbers `--mf-brand-hue` and `--mf-brand-chroma`. `pages-theme` uses the same semantic names and the `mf-*` component classes, so change values freely but rename none. The fonts (Fraunces, Newsreader, IBM Plex Mono) are self-hosted in `packages/ui/assets/fonts/`. Tailwind's utilities carry a `tw:` prefix (`tw:flex`, `tw:text-brand`) and know only the semantic colours.

## Build and deploy

`.github/workflows/deploy.yml` checks what a change affects (`nx affected`), then builds and deploys on every push to `main`, and every 15 minutes checks the app repos and the theme for changes. On a pull request it only checks and builds. It needs the `CLOUDFLARE_API_TOKEN` secret and the `CLOUDFLARE_ACCOUNT_ID` variable.

To build the whole site locally:

```bash
bundle install
scripts/build.sh $(scripts/apps.sh)
pnpm exec wrangler dev
```
