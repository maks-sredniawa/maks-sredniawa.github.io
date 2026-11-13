# maksforge.com redesign: research, directions, tokens, components

Status: proposals only. Nothing in a repo was edited.

Folders beside this file:

Screenshots (`*.png`) were not kept in this archive; the file names below are what `shot.mjs` writes. Re-render them from the repo root with `node design/redesign-2026-11/shot.mjs "$PWD"/<html files…>`. New shots use today's fonts and icons from this repo, so they can differ a little from what was reviewed.

- `workbench/`, `broadsheet/`, `shopfloor/`: one folder per direction, each with `home.html`, `kozica.html` and, when rendered, screenshots (`home-1440.png`, `home-1920.png`, `home-390.png`, `home-1440-dark.png`, `kozica-*.png`). The mockups are self-contained (inline CSS, Google Fonts link, icons referenced by relative path into this repo).
- `tagged-paper/`, `forge-gazette/`: the two hybrid variants in section 8.
- Later rounds, not described below, each with its mockups and the script that generated them: `home-dedup-2026-11/` (de-duplicated home page: counter, ledger, shelves), `app-pages-2026-11/` (app pages: dossier, leaflet, manual), `app-pages-ledger-2026-11/` (app pages that follow the Ledger home page: band, fold, row) and `studio-contact-2026-11/` (where the MaksForge Studio contact sits on the home page: band, footer-line, third-column).
- `../current/`: screenshots of the site before the redesign, cited below by file name and not kept; render them by building a pre-redesign commit of this repo and shooting it. `../current/2026-11-11/live-shot.mjs` shoots the live home page.

---

## 1. Diagnosis

### 1a. Why it reads as "AI-made" (the template fingerprint)

Every item below is visible in `../current/home-desktop-1440-fold.png` or `home-desktop-1920-full.png` unless noted.

- **The hero recipe**: centred stack of eyebrow (uppercase, tracked, accent) → one giant h1 with one gradient word → muted grey lede → row of ✓ pills → two pill buttons (filled gradient + outlined ghost). This exact stack is the default output of every "modern landing page" prompt. The gradient word (`well`) and the breathing radial glow behind it (`.glow`, 40px blur, `breathe` animation) are the two strongest single tells.
- **Material**: everything is a translucent surface with a 1px translucent border, a 20px radius, a long soft shadow (`0 20px 50px -24px`), and a `translateY(-4px)` hover lift. Buttons, pills, nav links and badges are all 999px pills. That "glass card on a warm gradient page" material is the Tailwind/Linear house style the models learned.
- **Section head recipe**, repeated 4×: coloured status pill with a glowing (and, for Live, pulsing) dot → h2 → muted one-liner. Same rhythm every time, so the page scans as "sections of a template", not as a catalogue with a shape.
- **Uniform card grid**: identical 300px-min cards with 64px rounded icon, title, accent "kind" caption, muted summary, pill buttons. Cards are used for things that are not cards (a list of 2 mods, 1 Chrome extension, 9 one-line ideas). The one-card row under "Chrome extensions" and the orphan idea at the bottom of the grid (`home-desktop-1920-full.png`, rows 3 and 7) show the grid is a template being fed data, not a layout chosen for the data.
- **Stat trio** (5 / 3 / 0) with gradient numerals, the dashed-border "Ideas" cards with a glowing purple spark, the rounded "Like what I make?" CTA band with a radial glow, the ☕ emoji inside a button, the blurred sticky nav: each is a standard SaaS-template module.
- **Typography**: `system-ui` only, bold 800 headings with `-0.025em` tracking everywhere, muted grey for every secondary line. No typeface was chosen, so nothing in the type says who made it. On Linux it renders as DejaVu/Noto, which looks even more generic.
- **Colour**: warm cream page + orange gradient accent + green/amber/blue/purple status colours is the stock "warm startup" palette. The purple for ideas is Tailwind's `purple-500`/`violet-400`.
- **Motion that means nothing**: breathing glow, pulsing dots, lifting cards, smooth scroll.

The owner's own list was correct; the additions above are the material system (translucency + soft shadow + hover lift), the repeated section-head rhythm, the SaaS CTA band and emoji button, and the orphaned grid cells.

### 1b. Desktop layout failures

- **One 1120px column for everything.** At 1920 (`home-desktop-1920-full.png`) that is 58% of the width; the hero's text block is ~640px, a third of the screen. At 1440 the margins are tolerable, but the layout is identical from 1120 up: more screen only adds empty margin. There is no 1600+ breakpoint anywhere.
- **The catalogue is 3-up at both 1440 and 1920** (`repeat(auto-fill, minmax(300px, 1fr))` inside a 1120 container), so the page is 5,900px tall at 1920 and uses height instead of width. A 13-project catalogue plus 9 ideas should fit well above the fold on a desktop monitor.
- **App pages are an 820px column** (`kozica-desktop-1920-full.png`): the app bar card and the prose both sit in a 43% strip with ~550px empty on each side; the nav runs full-width above it, which makes the narrow column more obvious.
- **No secondary structures**: no sidebar/index, no table of contents on app pages, no multi-column lists, no asymmetric splits except the About section (`1.4fr 1fr`). Desktop screens are good at side-by-side; the site never does it.
- **Phone is fine but inherited**: `home-phone-fold.png` and `kozica-phone-fold.png` are competent (the nav wraps to a scrollable row with Support pinned). The redesign must keep that quality while stopping the phone layout from dictating desktop.

---

## 2. Research: authored vs generated, and using wide screens

### 2a. What makes a small developer/indie site feel authored

Distilled from the reference sites below and the (thin) literature on "why AI sites look the same" (the useful points: models output the average of their training data; Tailwind defaults and shared component kits leak in; vague "clean modern" prompts converge on the same hero → 3 cards → CTA skeleton).

1. **The layout follows the content's shape, not a template's.** A catalogue of 13 small tools is a list/index, so it should look like one. A manifesto is a paragraph, not a hero. When the owner can say "the home page is a parts list" or "the home page is a front page", the layout has an idea; "hero, features, CTA" has none.
2. **A typeface chosen for a reason.** One display face with character (a serif with optical sizes, a condensed grotesque, a mono used as mono) beats the system stack. Use its real features: width axis, optical size, small caps, tabular figures. Pick faces the model-default sites do not use (avoid Inter, Space Grotesk, Plus Jakarta, Manrope, Satoshi).
3. **Specific information, shown as information.** Counts, dates, versions, package names, licences, the support address: real data in tables, rows and margin notes signals a person who maintains the thing. Cards hide data; rows show it.
4. **Honest materials.** Solid colours, hairline and heavy rules, square or barely-rounded corners, hard shadows or none. No translucency, no blur, no gradient text, no glow. One accent, used sparingly.
5. **Motifs from the brand's own content.** The logo is a hammer over a price tag reading FREE. The price tag, the stamp, the datasheet, the workbench are all motifs the content hands us; nothing needs inventing.
6. **One grid that scales.** 12 columns, gutters, a max width of 1680–1760 (not 1120), prose measured in `ch` and left-aligned, with spare width given to a side column rather than to margins.
7. **Motion only when it carries meaning.** A hover underline, a focus ring. Nothing breathes or pulses.

### 2b. How good desktop-first sites use the width

- **Side rails**: a sticky left index (sections, counts) and/or a right table of contents. Wikipedia's Vector 2022 skin and MDN are the canonical "use the width, keep the measure" answer.
- **Asymmetric splits**: 7/5 or 8/4 (statement left, data right); 3/6/3 (index, main, notes). Symmetry reads as template.
- **Dense index rows instead of cards**: Hacker News, Fonts In Use, McMaster-Carr. A row carries icon, name, kind, one line and links in one 64px band; 13 projects fit in one screen.
- **Multi-column lists** (`columns`/grid 3→4→6) for short items (ideas, links), never for prose.
- **Margin notes / sidenotes** for app pages (Tufte CSS, Ink & Switch essays): facts and asides live beside the text at 1440+, inline below it on phones.
- **Full-bleed bands** with an inner grid: colour uses the full width even while text keeps its measure.
- **Explicit wide breakpoints**: 1100 (rail appears), 1600/1700 (second side column, extra grid columns). The current site stops at 1120.

### 2c. Reference sites

Checked live on 2026-11-07 unless noted; the "take" is from my own knowledge of each site, since the fetcher returns text only.

| Site | Take |
|---|---|
| https://sindresorhus.com/apps | ~100 apps as a flat list: icon, name, one line, small labels (Free, Mac, Menu bar), a filter row, headline counts. List not grid; labels as metadata. |
| https://usgraphics.com (ex-berkeleygraphics.com; returns 403 to bots) | Datasheet aesthetic: mono metadata, numbered sections, hairline rules, square corners, nothing decorative. The look of a thing made by an engineer. |
| https://tonsky.me | One loud colour, one typeface, first-person voice, plain lists. Proof that "authored" needs no polish, only a decision. |
| https://100r.co | Hand-drawn nav glyphs, dense logs, content-driven motifs. Idiosyncrasy from the work itself. |
| https://www.inkandswitch.com | Editorial type system (display + text + sans), essays that use wide margins for figures and notes. |
| https://fontsinuse.com | A 35,000-item index that breathes: title, date, credits, sample thumbnails per entry; filters as plain link rows. Density done well. |
| https://www.mcmaster.com | The desktop-density benchmark: no hero, category-first, consistent short labels; scannable because every row has the same shape. |
| https://en.wikipedia.org (Vector 2022, from memory) | Left rail + sticky TOC + limited-width content with a toggle. The standard answer for "rail + measure". |
| https://edwardtufte.github.io/tufte-css/ (from memory) | Sidenotes and margin notes: the technique for the app pages' fact box and asides. |
| https://www.gov.uk (from memory) | Left-aligned, two-thirds measure, no hero, no cards, a real type scale. Authored by restraint. |

Do not recreate any of these; the directions below borrow a technique each, not a look.

### 2d. Sources from the search pass

- https://dev.to/alanwest/why-every-ai-built-website-looks-the-same-blame-tailwinds-indigo-500-3h2p
- https://www.925studios.co/blog/ai-slop-design-tells
- https://webflow.com/blog/10-brutalist-websites (the numbered project-index pattern)
- https://minimal.gallery (browsing pool for more references)

(Agency posts; informed opinion rather than measurement.)

---


## 3. Three directions

All three share: no glow, no gradient text, no translucency, no hover lift, no pulsing; one accent through a `--brand` token; same content, same sections; light + dark via the same token names; the logo mark unchanged. They differ in the *idea* of the page, the type, the grid and the material.

### 3.1 Workbench (`workbench/`)

- **Idea**: the home page is a parts catalogue, not a landing page. A sticky index rail with counts, a ledger of rows, a datasheet beside every app page. The site looks like the tool of someone who builds tools.
- **Type**: Archivo (variable; width axis 62–125 used at 72–88 for headings, 100 for text) + Martian Mono for every piece of data (counts, kinds, dates, links). Both on Google Fonts, OFL.
- **Layout**: `rail 264 | main` at ≥1100; `rail 264 | main | aside 320` at ≥1700 (About + Support become a sticky right column, so 1920 gets three live columns). Main is fluid with 32px gutters, no max-width: the ledger rows get longer, not emptier. Hero is a 7/5 split: statement left, mono spec table right. Ideas are a 3-column ruled grid. Phone: rail becomes a scrollable index strip under the brand; rows stack icon+name / summary / links; the spec table stays (it is the pitch).
- **Home structure**: topbar (crumb + 3 links) → hero (statement + spec) → 01 In production (A Android, B Chrome, C WoT as lettered groups of rows) → 02 In development → 03 Tools → 04 Ideas + "Send an idea" box → About + Support (aside) → footer.
- **Kozica**: rail holds "← All apps" + numbered on-page contents; header is icon 88 + condensed h1 + tagline + status; body is prose at 70ch left and a sticky **Datasheet** right (status, kind, package, internet, data, price, map data, trail-colour swatches, source, support, privacy) with the tip note under it; on phone the datasheet follows the prose.
- **Signature details**: numbered sections (01…), lettered groups (A, B, C), 2px ink rules under section heads vs hairlines between rows, counts everywhere, `0 · 0 · 0` in brand colour, square 8px status marks instead of dots, arrows in links (`↗ ↓ →`), 2px radius, no shadows at all.
- **Palette (placeholder)**: light bg `#f3f3ef`, surface `#fff`, ink `#161616/#4a4a46/#7a7a74`, rules `#d6d6cf`, brand cobalt `#1f4fd8`; dark bg `#121313`, surface `#1a1b1b`, ink `#ecece7/#b4b4ad/#85857f`, rules `#2c2d2c`, brand `#8aa6ff`. Status: live `#17813d`, building `#b7640a`, oss = brand, idea `#7a3fb8` (lighter steps in dark).
- **Risks**: can feel cold if the brand colour is also cold (pick a warm brand and it is fine); mono uppercase labels need care in Polish (long words, diacritics are fine); the ledger needs a real 1100+ breakpoint in Jekyll too (the theme must ship the rail).

### 3.2 Broadsheet (`broadsheet/`)

- **Idea**: the home page is the front page of a small paper: masthead with double rule, dateline and folio, a lead story beside a dense index column, three ruled story columns, classifieds for the ideas, a boxed "Notice" for support. App pages are articles with a drop cap, roman-numbered sections, a contents column and an "At a glance" fact box.
- **Type**: Fraunces (display; optical size 144 with WONK for the lead, 48 for section heads, 12 for small caps) + Newsreader (text; optical sizes 18–24). Both Google Fonts. Italic Fraunces for the one accent word.
- **Layout**: centred page max 1720 with 40px gutters (uses 90% of 1920). Lead is 8/4 (statement | index). Production is three ruled columns, one per subsection; In development / Tools are a two-up with a vertical rule (at ≥1700 each story becomes icon | headline | summary across). Ideas use CSS `columns: 3` (4 at ≥1700): no orphans, ever. About/Support 7/1/4. Phone: columns stack, rules turn horizontal, classifieds become one column, masthead centres.
- **Home structure**: ears (tagline / price line) → masthead (nav | wordmark | nav) → folio → lead + index → In production (3 cols) → In development | Tools → Ideas classifieds + notice → About (drop cap, light-weight big numerals) + Support box → colophon footer ("Set in Fraunces and Newsreader").
- **Kozica**: 2/7/3 grid: kicker column (status, kind) | title block (h1, standfirst, byline with source and support) | icon in a double-ruled frame + Source button; below: contents (sticky) | prose at 66ch with drop cap and I–V headings | sticky "At a glance" box. Phone: icon row, title, fact box, then prose.
- **Signature details**: double rules, small caps, folio and dateline, column rules, drop cap, roman numerals, pilcrow bullets, the price line "Price: 0.00" in the ears, the colophon.
- **Palette (placeholder)**: light paper `#f6f1e8`, ink `#1c1a17/#4b4640/#857d73`, rules `#d9d1c3`, brand oxblood `#8e2a1f`; dark `#171411`, ink `#efe7d9/#c3b8a7/#8f8577`, rules `#352e27`, brand `#e0705f`. Status: live `#2d6a3e`, building `#a4571a`, oss `#2b4f9e`, idea `#6d3f8f`.
- **Risks**: the newspaper conceit is itself a known genre (a senior dev can call it "the editorial theme"); large webfont payload (two variable serifs, ~300 KB; subset to latin+latin-ext); dense serif at 16–17px is less comfortable for scanning a catalogue than a grotesque; drop caps and small caps are fiddly with i18n (Polish `Ś`, `Ż` ascenders; German long words in small caps); the strongest page is the app article, the weakest is the phone front page (long).

### 3.3 Shop floor (`shopfloor/`)

- **Idea**: the price tag from the logo becomes the system: tags, stamps, hard offset shadows, 2px ink borders, full-bleed colour bands. The home page is a shop floor: a shelf of every icon up top, then aisles of tiles under coloured bands; ideas are pinned tags on a dark board.
- **Type**: Bricolage Grotesque (display; opsz/wdth axes, 800 weight at wdth 90) + Hanken Grotesk (text) + Chivo Mono (tags, metadata). All Google Fonts.
- **Layout**: full-bleed bands, inner max 1760 with 40px gutters. Hero 7/5: statement | 4-column shelf of the 11 icons with status pips and a FREE stamp. Aisles are `220px label | flex-wrap tiles (320–420px)`: 2, 1 and 2 tiles never leave grid holes because the label column eats the left. Ideas are flex-wrapped tag shapes. About 7/5 with a boxed Support. Phone: shelf becomes a horizontal scroll strip, tiles and pins go full width, nav collapses to the yellow Support tab.
- **Home structure**: sticky tab bar (Support as a yellow tab) → hero + shelf → In production (cream band, 3 aisles) → In development (brand band, cream tiles) → Tools (cream) → Ideas (ink band, tag pins, yellow "send" box) → About + Support box with stamp → ink footer.
- **Kozica**: header band with the icon in a framed tile (stamp on the corner), tags, chunky h1, tagline, stacked buttons; a 6-cell **spec strip** across the full width (status, package, internet, data, trail colours, support); then prose at 68ch | sticky "On this page" box + yellow tip tile. Phone: spec strip becomes 2 columns.
- **Signature details**: the notched tag with a hole (`clip-path`) used for every badge and for the ideas; rotated double-border FREE stamp; yellow highlighter block behind "well."; hard 4px shadows; dashed aisle separators; status pips on the shelf.
- **Palette (placeholder)**: cream `#efe9dc`, surface `#fbf7ee`, ink `#15221f` (the logo's dark teal-black), brand teal `#1f5c52` (the logo's background), tag yellow `#f2c94c`; dark `#101a18`, ink `#f1ebdc`, brand `#6fc3b2`, tag yellow stays. Status: live `#1f7a3e`, building `#c4641a`, oss `#2a5bb8`, idea `#7b45b0`. In coloured bands, tiles stay cream/ink in both modes (fixed tokens), so the band colour always frames a readable tile.
- **Risks**: loudest of the three and the most "a style": thick borders + hard shadows are the neo-brutalist kit that Gumroad/Figma-community sites popularised, so it can draw a different "I've seen this" comment; still tile-based (though the aisles fix the orphan problem); the yellow tag colour is a second brand colour the owner has not chosen yet; the stamp and highlighter are one step from kitsch if overused.

Phone verdicts from the screenshots: Workbench and Shop floor are tidy and short-ish; Broadsheet is the longest on a phone (the lead index repeats the catalogue) and would want the index hidden at <760.

---

## 4. Mockups and screenshots

Each folder holds `home.html`, `kozica.html`; `shot.mjs` renders the screenshots `home-1440.png`, `home-1920.png`, `home-390.png`, `home-1440-dark.png`, `kozica-1440.png`, `kozica-1920.png`, `kozica-390.png`, `kozica-1440-dark.png`.

- `design/redesign-2026-11/directions/workbench/`
- `design/redesign-2026-11/directions/broadsheet/`
- `design/redesign-2026-11/directions/shopfloor/`

The mockups are plain HTML with inline CSS, a Google Fonts link, and icons referenced by relative path into `apps/web/public/assets/icons/`. Shoot from the repo root with `node design/redesign-2026-11/shot.mjs "$PWD"/<html files…>` (it takes absolute paths). Issues found and fixed in review: sticky rail rule stopping at viewport height (Workbench), 4-column ideas orphan at 1920 (Workbench), summary falling into the icon column in the two-up block (Broadsheet), unreadable tiles inside coloured bands and a 5-column shelf orphan (Shop floor).

---

## 5. Token architecture

Three layers, all in `packages/ui/styles/tokens.css` (built into `/assets/style.css`, which the pages-theme already loads).

### 5.1 Primitive layer (`--mf-*`): raw values, never used in components

- Colour ramps: `--mf-neutral-0 … --mf-neutral-1000` (warm or cool neutral per direction), `--mf-brand-50 … --mf-brand-900`, `--mf-green-*`, `--mf-amber-*`, `--mf-blue-*`, `--mf-violet-*` (status hues), `--mf-tag-*` (Shop floor only).
- Brand ramp generated from two numbers: `--mf-brand-hue` and `--mf-brand-chroma`, with each step `oklch(<L> var(--mf-brand-chroma) var(--mf-brand-hue))`. Changing the brand colour later = editing those two lines (hex fallback ramp beside it for the owner to override by hand if preferred).
- Type: `--mf-font-display`, `--mf-font-text`, `--mf-font-mono`; size steps `--mf-text-1 … --mf-text-9` as fluid `clamp()`; `--mf-leading-tight/normal/loose`; `--mf-tracking-tight/normal/wide`.
- Space: `--mf-space-1 … --mf-space-16` on a 4px base.
- Radius: `--mf-radius-0/1/2/3` (0, 2, 4, 8). Elevation: `--mf-shadow-0/1/2` (none, hairline, hard offset). Motion: `--mf-dur-fast/base` (80/160ms), `--mf-ease-out`.
- Layout: `--mf-width-prose` (70ch), `--mf-width-rail` (264px), `--mf-width-aside` (320px), `--mf-width-max` (1720/1760px), `--mf-gutter`. Breakpoints cannot be CSS variables; document them as constants and expose via PostCSS `@custom-media`: `--bp-phone 760`, `--bp-rail 1100`, `--bp-wide 1700`.

### 5.2 Semantic layer (`--color-*`, `--text-*`, `--space-*`, …): what components consume

- Colour: `--color-bg`, `--color-surface`, `--color-surface-2`, `--color-ink`, `--color-ink-2`, `--color-ink-3`, `--color-rule`, `--color-rule-strong`, `--color-brand`, `--color-on-brand`, `--color-brand-tint`, `--color-status-live/building/oss/idea`, `--color-focus`.
- Type: `--text-display`, `--text-h1/h2/h3`, `--text-body`, `--text-small`, `--text-caption`, `--text-data` (each a shorthand of font/size/leading/variation settings).
- Space: `--space-section`, `--space-block`, `--space-stack`, `--space-inline`.
- Shape/elevation/motion: `--radius-control`, `--radius-tile`, `--shadow-raised`, `--shadow-tile`, `--motion-hover`.
- Layout: `--layout-rail`, `--layout-aside`, `--layout-max`, `--layout-gutter`, `--layout-prose`.
- Dark mode remaps only this layer: `@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) { … } }` plus `:root[data-theme="dark"] { … }` (same block, so a future toggle costs nothing). Primitives never change between modes; status colours point at lighter ramp steps in dark.

### 5.3 Component layer (`--btn-*`, `--tag-*`, `--row-*`, `--rail-*`): set inside each component's CSS from semantic tokens

Lets a variant (`.btn.primary`) or a context (a coloured band in Shop floor) override a handful of component vars without touching semantics. Rule: a component reads component tokens; a component token reads semantic tokens; a semantic token reads primitives. Never skip a layer downward.

### 5.4 Keeping the pages-theme working

- Phase 1 (home repo): add the new tokens and components; keep a **compat block** at the end of `tokens.css` that maps every name the theme reads today to the new semantics (`--bg: var(--color-bg)`, `--bg-2: var(--color-surface-2)`, `--surface`, `--surface-hover`, `--border: var(--color-rule)`, `--text`, `--muted`, `--accent: var(--color-brand)`, `--accent-2/3`, `--on-accent`, `--glow*: transparent`, `--grad-text: none`, `--live/--building/--oss/--idea`, `--radius`, `--shadow*`, `--font-text`). The theme keeps rendering (flatter, but intact) the moment the home site deploys.
- Phase 2 (pages-theme repo): rewrite `_layouts/default.html` and `app.css` on the new names and the new shared classes (rail/index, app header, datasheet, prose, TOC, footer). The deploy picks it up within 15 minutes; because phase 1 already shipped, there is no window where the theme breaks.
- Phase 3: delete the compat block.
- Mechanism that makes this possible: component styling stays as plain class-based CSS in `packages/ui/styles/components.css` (as today), and the Angular components only emit the markup and classes. Jekyll can then reuse `.mf-rail`, `.mf-tag`, `.mf-datasheet`, `.mf-prose` verbatim. Do not move component CSS into Angular `styles:` with emulated encapsulation, or the theme loses it.
- Tailwind: expose the semantic layer through `@theme` so `tw:text-ink-2`, `tw:bg-surface` map to the same vars; forbid raw colours in templates by lint.
- Fonts: self-host the chosen families in `apps/web/public/assets/fonts/` (subset latin + latin-ext, `font-display: swap`), declared once in `base.css`; the theme gets them through the same stylesheet. No Google Fonts link in production.

---

## 6. Component inventory (after the redesign)

Shared library `packages/ui`, each with a Storybook story and a plain CSS class the theme can reuse. Variants in brackets.

Reworked from today's components:

- **Button** `.mf-btn` [primary, secondary, brand, quiet] × [md, sm] × [with trailing arrow/external mark]. Square or 2px corners; no gradient; hard shadow only in Shop floor.
- **Tag** (replaces StatusBadge) `.mf-tag` [status: live, building, oss, idea] [kind: plain] [tone: ink] × [sm, md]. Workbench: square mark + mono text; Broadsheet: small caps; Shop floor: notched tag shape.
- **SectionHead** `.mf-section-head` [number, status tag, count] [level: section, group]. Title + description + status/count slot.
- **ProjectRow / ProjectTile / ProjectStory** (replaces Card): one `Project` component with a `layout` input [row (Workbench), story (Broadsheet), tile (Shop floor)]; inputs: icon, name, kind, summary (HTML), links, status. The theme does not need it (app pages show one app), but the home page's grids use it everywhere.
- **IdeaItem** (replaces IdeaCard) [cell (ruled grid), classified (inline paragraph), pin (tag shape)].
- **Fact** `.mf-fact` [ruled row (Workbench), light numeral (Broadsheet), tile (Shop floor)].

New:

- **Brand** `.mf-brand` [sm, md, wordmark-only] (logo + name; the theme's header uses it).
- **SiteHeader** `.mf-header` [home, app] (topbar/masthead/tab bar per direction; app variant takes app name, Privacy, All apps, Support).
- **Rail / Index** `.mf-rail` [sections with counts, on-page contents]; sticky at ≥1100, scroll strip below.
- **SpecTable / Datasheet** `.mf-spec` [vertical (aside), horizontal strip, two-column]: `dl` rows of label + value, optional swatch strip. Used by the hero (home) and by every app page (theme), fed from `_config.yml` keys (`status`, `package`, `internet`, `data`, `licence`, `support`, `privacy`).
- **GroupHead / Aisle label** `.mf-group` (letter + h3 + small).
- **TextLink** `.mf-link` [default, go (brand), external ↗, download ↓].
- **Notice / CTA band** `.mf-notice` [idea (send-an-idea), support (tips)].
- **Prose** `.mf-prose` (the theme's Markdown styling: numbered h2, list marks, links, code, tables, blockquote, images). Owned by the library so home and theme agree.
- **TOC** `.mf-toc` (on-page contents; numbered; sticky in the rail/aside).
- **AppHeader** `.mf-app-header` (icon, name, tagline, tags, actions) [row, framed (Shop floor), article (Broadsheet)].
- **ColourStrip** `.mf-swatches` (for Kozica's trail colours; generic list of colours with labels).
- **Footer** `.mf-footer` [home, app].
- Direction-specific extras: **Stamp** and **Shelf** (Shop floor), **Masthead/Folio/Ears** (Broadsheet). Only build the ones for the chosen direction.

Everything above goes through tokens; nothing sets a colour, radius or shadow literal.

---

## 7. Recommendation: Workbench

- **It answers both complaints most directly.** It is the furthest from the AI landing-page skeleton (no hero stack, no cards, no CTA band: an index, a ledger and a datasheet), and it is the only one of the three that is *natively* desktop: the rail + main + aside shell makes 1920 three useful columns instead of a wider margin, and the rows get longer rather than the page taller. Compare `workbench/home-1920.png` with `../current/home-desktop-1920-full.png`: the whole catalogue plus ideas fit in 2,744px instead of 5,863px.
- **It matches who is building it.** The owner builds desktop web apps; a catalogue that reads like an engineer's inventory (counts, package names, mono data, numbered sections) is authored by the content rather than by a style, which is what defeats "this is AI-made". A senior frontend will recognise a decision, not a theme.
- **It is the cheapest to build and maintain as a system.** Rows, `dl` tables, a rail and a prose column are the simplest components; they map 1:1 onto the Jekyll theme (rail = contents, datasheet = `_config.yml`), and they scale as the catalogue grows without orphan cells. Two fonts, no optical-size tricks, nothing that breaks in Polish or German.
- **It leaves room for the brand colour.** One accent on a near-neutral page: whatever the owner picks later will carry, warm or cold.

Take from the others: Broadsheet's app-page fact box and contents column are already in Workbench's Kozica page; if the owner wants one playful motif tied to the logo, use Shop floor's notched tag as Workbench's `Tag` component (it reads fine in mono) and nothing else from that direction.

If the owner wants the *most beautiful* result and accepts a heavier, more fragile type system, Broadsheet is the second choice; Shop floor only if the brand should feel like a shop rather than a workshop.

Next steps: pick a direction → pick the brand colour (two OKLCH numbers) → tokens + base + fonts in `packages/ui` → components in Storybook with visual tests → home page → pages-theme → remove compat aliases.


---

## 8. Hybrid variants (owner's pick: Shop floor base, Broadsheet type and colours)

Both variants share: Fraunces (display, small caps, italic accent) + Newsreader (text) + IBM Plex Mono for data only (package names, ISO dates, counts); Broadsheet's cream/ink/oxblood palette in light and dark; Shop floor's structure (icon shelf in the hero, aisles of tiles, full-bleed bands, ideas as notched tags, FREE stamps). The material is softened in both: 1px borders instead of 2px, square corners, no thick kit. The "In development" misalignment in Shop floor is fixed at the root: its band was classed `brand`, which collided with the header's `.brand` logo rule (flex, 800 weight), so the section became a flex box; the hybrids use `accent`/`tint` band classes and run every section through the same `220px label | tiles` aisle grid, so tiles line up across bands at every width (compare `*/home-1920.png`).

### 8.1 `tagged-paper/`: Shop floor's layout in Broadsheet's clothes (leans Shop floor)

- **Split**: structure, header, shelf, aisles, bands and tags are Shop floor; type, palette, small caps, italic standfirst, drop cap, double-ruled Notice and the colophon are Broadsheet.
- **Material**: 1px ink borders; a paper-stack shadow (3px offset in a rule tint, not black) kept only on tiles, shelf cards and primary buttons, so the "stacked cards" feel survives without the brutalist kit. Tile actions: one small filled button + a small-caps link.
- **Bands**: paper → oxblood (In development, with paper tiles) → paper → ink (Ideas) → paper (About). The dark band and the paper tiles inside coloured bands use fixed root tokens (`--band-dark`, `--paper-*`) so they read in both modes (in dark mode the band goes near-black rather than cream).
- **1920**: hero 7/5 with the shelf at 4 columns; tiles grow to 500px so three fill the 1760 wrap; aisles align from band to band.
- **Kozica**: Shop floor's page (framed icon with stamp, tags, full-width 6-cell spec strip, prose + sticky Contents and Notice) with Broadsheet's h1, drop cap, roman numerals as ink tags, ¶ bullets.
- **Phone**: shelf becomes a scroll strip, tiles and pins go full width, nav collapses to the oxblood Support tab.
- Files: `design/redesign-2026-11/directions/tagged-paper/home.html`, `kozica.html` (`shot.mjs` renders the same screenshot set, capped at 8000px on the long side).

### 8.2 `forge-gazette/`: the deeper merge (leans Broadsheet)

- **Split**: Broadsheet's ears, double-ruled masthead with centred wordmark, folio line, index, drop cap, light numerals, double-ruled Notice and colophon footer; Shop floor's shelf, aisles, tiles, bands, tag pins and stamps.
- **Hero**: statement | shelf at 1100–1699 with the **index as a three-column ruled strip** under it (one group per column); at ≥1700 it becomes **statement | shelf (3 columns) | index column**, so 1920 shows three live columns above the fold. On phones the index is hidden (the masthead nav covers it).
- **Material**: no shadows anywhere; tiles have hairline (`--rule`) borders, pins and the Notice keep the strong rule; tile actions are small-caps underlined links (store link in oxblood), no buttons inside tiles.
- **Bands**: paper → tinted paper (In development; `--band-tint`, with rule-strong edges) → paper → ink (Ideas) → paper with a double rule (About). Quieter than tagged-paper; the ink band remains the one loud moment.
- **Kozica**: Broadsheet's article header (kicker tags | title, standfirst, byline | framed icon with stamp + Source button) over Shop floor's full-width spec strip, then Contents | prose | Notice (sticky). The spec strip carries the facts, so the Notice stays a short tip with the privacy pointer.
- Files: `design/redesign-2026-11/directions/forge-gazette/home.html`, `kozica.html`.

### 8.3 How they differ, in one line each

- tagged-paper: a shop with a nicer typeface; stacked paper cards, one coloured band, buttons in tiles.
- forge-gazette: a paper that sells things; masthead and index, hairline tiles, links not buttons, tint instead of oxblood for the middle band.

Issues found and fixed in review: ideas band rendering cream with an invisible heading (custom-property self-reference; fixed with root band tokens, both variants), index strip splitting groups across CSS columns (forge-gazette; now one group per grid column). Screenshots are capped at 8000px by the updated `shot.mjs`.
