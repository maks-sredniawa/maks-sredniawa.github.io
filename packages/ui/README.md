# ui

The MaksForge design system: the brand tokens and global stylesheet (`styles/`) and the Angular components built on them (`src/lib/`), each with its Storybook stories.

- `pnpm storybook` serves the stories at <http://localhost:4400>.
- `nx test ui` runs the unit tests; `pnpm visual` screenshots every story (see `tests/visual`).
- Tailwind utilities carry a `tw:` prefix (`tw:flex`, `tw:text-brand`); its colours are the semantic tokens only.
- `styles/tokens.css` holds the tokens; `styles/components.css` styles every component by a plain `mf-*` class, and `styles/app-page.css` holds the app-site page parts (top bar, app header, fact strip, prose, contents). The app sites' `pages-theme` loads the built stylesheet from `maksforge.com/assets/style.css` and uses those classes and variable names, so rename none of them.
