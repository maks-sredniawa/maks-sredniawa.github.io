# ui

The MaksForge design system: the brand tokens and global stylesheet (`styles/`) and the Angular components built on them (`src/lib/`), each with its Storybook stories.

- `pnpm storybook` serves the stories at <http://localhost:4400>.
- `nx test ui` runs the unit tests; `pnpm visual` screenshots every story (see `tests/visual`).
- Tailwind utilities carry a `tw:` prefix (`tw:flex`, `tw:text-accent`); its colours are the brand tokens only.
- `styles/tokens.css` holds the palette. The app sites' `pages-theme` loads the built stylesheet from `maksforge.com/assets/style.css` and reads the same variable names, so rename none of them.
