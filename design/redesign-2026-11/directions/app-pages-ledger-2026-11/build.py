"""Builds the three app-page mockups that follow the Ledger home page. Run: uv run --with markdown build.py"""

import re
from pathlib import Path

import markdown

HERE = Path(__file__).resolve().parent
REPO = HERE.parents[3]
REPOS = REPO.parent
STYLES = REPO / 'packages/ui/styles'
ASSETS = 'file://' + str(REPO / 'apps/web/public/assets')
FONTS = 'file://' + str(REPO / 'packages/ui/assets/fonts')
GH = 'https://github.com/maks-sredniawa'
BMC = 'https://buymeacoffee.com/maksforge'
PAYPAL = 'https://paypal.me/maksymiliansredniawa'
TIP = 'A tip helps me keep building. It never unlocks anything.'
ABOUT = 'MaksForge is where I build the small tools I wish existed. Each one solves a single problem.'
LONG_PAGE_WORDS = 500

LANGS = [('en', 'English'), ('pl', 'Polski'), ('de', 'Deutsch'), ('es', 'Español'), ('fr', 'Français'),
         ('it', 'Italiano'), ('pt-BR', 'Português (Brasil)'), ('cs', 'Čeština'), ('uk', 'Українська')]

APPS = {
    'kozica': dict(name='Kozica', repo='kozica', icon='kozica', status='building', store=None, kind='Android app',
                   desc='A hiking map of the Polish mountains that works with no signal at all.'),
    'binky': dict(name='Binky', repo='binky-app', icon='binky', status='live', kind='Android app',
                  store=('Google Play', 'https://play.google.com/store/apps/details?id=binky.bunny.and.rabbit.tracker'),
                  desc="An Android app for keeping track of a bunny's health."),
    'gloam': dict(name='Gloam', repo='gloam', icon='gloam', status='live', kind='Android app',
                  store=('Google Play', 'https://play.google.com/store/apps/details?id=io.github.srednimax.gloam'),
                  desc="A screen dimmer that goes below your phone's minimum brightness."),
}
STATUS_LABEL = {'live': 'Live', 'building': 'Building', 'oss': 'Open source'}

PAGES = [
    ('kozica.html', 'kozica', 'index.md', True),
    ('gloam.html', 'gloam', 'index.md', True),
    ('binky-privacy.html', 'binky', 'privacy-policy.md', False),
]


def package(app):
    return app['store'][1].split('id=')[-1] if app['store'] and 'id=' in app['store'][1] else ''


def load(app, filename):
    """Mirrors what the Jekyll layout gets: page title, the intro before the first h2, and the h2 sections."""
    text = (REPOS / app['repo'] / 'docs' / filename).read_text()
    front, body = text.split('---', 2)[1:]
    title = re.search(r'^title:\s*(.+)$', front, re.M).group(1).strip()
    body = re.sub(r'<!--.*?-->', '', body, flags=re.S)
    html = markdown.markdown(body, extensions=['toc', 'tables'])
    html = html.replace('href="privacy-policy.md"', 'href="#"')
    parts = html.split('<h2 id="')
    intro = re.sub(r'^\s*<h1[^>]*>.*?</h1>', '', parts[0], flags=re.S).strip()
    sections = []
    for part in parts[1:]:
        head, rest = part.split('</h2>', 1)
        sid, heading = head.split('">', 1)
        sections.append((sid, heading, rest.strip()))
    words = len(re.sub(r'<[^>]+>', ' ', html).split())
    return dict(title=title.split(' — ')[0], intro=intro, sections=sections, long=words > LONG_PAGE_WORDS)


def css_from_repo():
    parts = [(STYLES / name).read_text() for name in ('fonts.css', 'tokens.css', 'base.css', 'components.css')]
    parts.append((REPO / 'apps/web/src/layout.css').read_text())
    return '\n'.join(parts).replace("url('/assets/fonts", f"url('{FONTS}")


def lang_menu():
    items = ''.join(
        f'<li><a href="#"{" aria-current=\"page\"" if code == "en" else ""} lang="{code}">{name}</a></li>'
        for code, name in LANGS)
    return ('<details class="lang"><summary class="lang-toggle mf-sc">'
            f'<img class="lang-flag" src="{ASSETS}/flags/en.svg" alt="" width="21" height="14">English'
            f'</summary><ul class="lang-menu">{items}</ul></details>')


def topbar():
    nav = [('Apps', '/#apps', False), ('Ideas', '/#ideas', False), ('About', '/#about', False),
           ('GitHub', GH, False), ('Support', '/#support', True)]
    items = ''.join(f'<a href="{href}"{" class=\"cta\"" if cta else ""}>{label}</a>' for label, href, cta in nav)
    return ('<div class="mf-wrap" id="top"><header class="d-top">'
            '<a class="wordmark" href="/" aria-label="MaksForge home">'
            f'<img src="{ASSETS}/logo-mark-128.webp" alt="" width="36" height="36"><span>MaksForge</span></a>'
            f'<nav aria-label="MaksForge">{items}</nav>{lang_menu()}</header></div>')


def support_buttons():
    return (f'<a class="mf-btn mf-btn--brand" href="{BMC}">Buy me a coffee</a>'
            f'<a class="mf-btn" href="{PAYPAL}">PayPal</a>')


def footer():
    return (f'<div class="mf-wrap"><footer class="mf-foot"><span>© 2026 Maksymilian Średniawa · MaksForge</span>'
            f'<a href="{GH}">github.com/maks-sredniawa</a></footer></div>')


def icon(app, size):
    return f'<img src="{ASSETS}/icons/{app["icon"]}.webp" alt="" width="{size}" height="{size}">'


def tag(app):
    return f'<span class="mf-tag mf-tag--{app["status"]}">{STATUS_LABEL[app["status"]]}</span>'


def store_link(app):
    return f'<a class="mf-link mf-link--go" href="{app["store"][1]}">{app["store"][0]}</a>' if app['store'] else ''


def source_link(app):
    return f'<a class="mf-link" href="{GH}/{app["repo"]}">Source</a>'


SHARED_CSS = '''
[hidden] { display: none !important; }
.d-top { display: flex; flex-wrap: wrap; align-items: center; gap: 10px 28px; padding: 16px 0 14px; border-bottom: 3px double var(--color-rule-strong); }
.d-top .wordmark { gap: 12px; }
.d-top .wordmark span { font-size: 32px; }
.d-top nav { display: flex; flex-wrap: wrap; gap: 6px 24px; margin-left: auto; font-family: var(--font-display); font-size: 15px; font-weight: 500; }
.d-top nav a:hover, .d-top nav .cta { color: var(--color-brand); }
.d-top .lang { padding-left: 24px; border-left: 1px solid var(--color-rule); }
.d-about { border-top: 3px double var(--color-rule-strong); }
.d-about-grid { display: grid; grid-template-columns: minmax(0, 7fr) minmax(0, 5fr); gap: var(--layout-gap) calc(var(--layout-gap) * 2); padding-top: 32px; padding-bottom: 40px; }
.d-about-grid > aside { padding-left: calc(var(--layout-gap) * 2); border-left: 1px solid var(--color-rule); }
.d-about h2 { margin-bottom: 8px; font-family: var(--font-display); font-variation-settings: 'WONK' 1; font-size: 30px; font-weight: 400; letter-spacing: -0.01em; line-height: 1.1; }
.d-about p { max-width: 56ch; color: var(--color-ink-2); font-size: 18px; }
.d-buttons { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 16px; }

.p-prose { color: var(--color-ink-2); font-size: 18px; line-height: 1.6; overflow-wrap: break-word; }
.p-prose > * { max-width: 68ch; }
.p-prose p, .p-prose ul, .p-prose ol, .p-prose table { margin: 0 0 1em; }
.p-prose > :last-child { margin-bottom: 0; }
.p-prose strong { color: var(--color-ink); font-weight: 600; }
.p-prose ul { padding-left: 1.4em; list-style: none; }
.p-prose li { margin: 0.5em 0; }
.p-prose ul > li::before { content: '—' / ''; margin: 0 0.5em 0 -1.4em; color: var(--color-brand); }
.p-prose a { color: var(--color-brand); text-decoration: underline; text-decoration-color: color-mix(in srgb, var(--color-brand) 40%, transparent); text-underline-offset: 3px; }
.p-prose a:hover { text-decoration-color: var(--color-brand); }
.p-prose code { padding: 0.1em 0.35em; border: 1px solid var(--color-rule); background: var(--color-surface); font: 0.82em/1.5 var(--font-mono); overflow-wrap: anywhere; }
.p-prose img { max-width: 100%; height: auto; border: 1px solid var(--color-rule); }
.p-prose h1 { margin-bottom: 14px; color: var(--color-ink); font-family: var(--font-display); font-variation-settings: 'SOFT' 30, 'WONK' 1; font-size: 44px; font-weight: 300; letter-spacing: -0.01em; line-height: 1.05; }
.p-prose h2 { margin: 1.7em 0 0.5em; color: var(--color-ink); font-family: var(--font-display); font-variation-settings: 'WONK' 1; font-size: 26px; font-weight: 500; letter-spacing: -0.01em; line-height: 1.2; text-wrap: balance; scroll-margin-top: 24px; }
.p-lead > p:first-child { color: var(--color-ink); font-size: 1.2em; line-height: 1.45; }

@media (max-width: 759px) {
  .d-top .wordmark span { font-size: 28px; }
  .d-top .lang { margin-left: auto; padding-left: 0; border-left: 0; }
  .d-top nav { order: 3; flex-basis: 100%; margin-left: 0; gap: 4px 20px; }
  .d-about-grid { grid-template-columns: 1fr; }
  .d-about-grid > aside { padding: 24px 0 0; border-left: 0; border-top: 1px solid var(--color-rule); }
  .d-about h2 { font-size: 26px; }
  .p-prose { font-size: 17px; }
  .p-prose h1 { font-size: 34px; }
  .p-prose h2 { font-size: 23px; }
}
'''

# ------------------------------------------------------------------ A: row

ROW_CSS = '''
.r-tabs { display: flex; flex-wrap: wrap; gap: 0 2px; margin-top: 26px; border-bottom: 2px solid var(--color-rule-strong); font-family: var(--font-display); font-size: 15px; font-weight: 600; }
.r-tabs a { padding: 9px 16px 8px; }
.r-tabs a:hover { background: var(--color-surface-2); }
.r-tabs a[aria-current] { background: var(--color-ink); color: var(--color-bg); }
.r-tabs .r-back { margin-right: 12px; padding-left: 0; color: var(--color-ink-3); font-weight: 500; }
.r-tabs .r-back:hover { background: none; color: var(--color-brand); }
.r-page { display: grid; grid-template-columns: 64px minmax(200px, 1.1fr) minmax(0, 2.8fr) minmax(220px, auto) auto; column-gap: 28px; }
.r-row { display: grid; grid-column: 1 / -1; grid-template-columns: subgrid; align-items: center; padding: 20px 0; border-bottom: 1px solid var(--color-rule-strong); }
.r-row img { width: 64px; height: 64px; border-radius: 10px; }
.r-name { font-family: var(--font-display); font-variation-settings: 'WONK' 1; font-size: 32px; font-weight: 500; letter-spacing: -0.01em; line-height: 1.05; }
.r-name a:hover { color: var(--color-brand); }
.r-row .mf-sc { display: block; margin-top: 4px; color: var(--color-ink-3); font-size: 11px; }
.r-pitch { max-width: 60ch; color: var(--color-ink-2); font-size: 19px; line-height: 1.4; }
.r-pitch.p-prose { font-size: 17px; line-height: 1.5; }
.r-body > h2:first-child { margin-top: 0; }
.r-links { display: flex; flex-wrap: wrap; align-items: baseline; gap: 6px 18px; }
.r-links .mf-mono { flex-basis: 100%; color: var(--color-ink-3); overflow-wrap: anywhere; }
.r-row .mf-tag { justify-self: end; }
.r-body { grid-column: 3; padding: 34px 0 64px; }
.r-toc { grid-column: 4 / -1; align-self: start; position: sticky; top: 24px; width: 0; min-width: 100%; margin-top: 40px; }
.r-toc h2 { padding-bottom: 8px; border-bottom: 2px solid var(--color-rule-strong); color: var(--color-ink-3); }
.r-toc ol { margin: 0; padding: 0; list-style: none; }
.r-toc a { display: block; padding: 6px 0; border-bottom: 1px solid var(--color-rule); font-family: var(--font-display); font-size: 15px; font-weight: 500; line-height: 1.3; }
.r-toc a:hover { color: var(--color-brand); }
@media (min-width: 1700px) { .r-page { column-gap: 40px; } .p-prose { font-size: 19px; } }
@media (max-width: 1099px) {
  .r-page { display: flex; flex-direction: column; }
  .r-row { display: grid; grid-template-columns: 64px minmax(0, 1fr) auto; grid-template-areas: 'icon name tag' 'icon pitch pitch' 'icon links links'; gap: 8px 18px; align-items: start; }
  .r-row img { grid-area: icon; }
  .r-row > div:first-of-type { grid-area: name; }
  .r-pitch { grid-area: pitch; }
  .r-links { grid-area: links; }
  .r-row .mf-tag { grid-area: tag; }
  .r-toc { order: 2; position: static; width: auto; min-width: 0; margin-top: 24px; }
  .r-toc h2 { border: 0; padding-bottom: 4px; }
  .r-toc ol { display: flex; flex-wrap: wrap; gap: 2px 20px; }
  .r-toc a { padding: 3px 0; border: 0; text-decoration: underline; text-decoration-color: var(--color-rule-strong); text-underline-offset: 3px; }
  .r-body { order: 3; max-width: 68ch; padding: 26px 0 48px; }
}
@media (max-width: 759px) {
  .r-tabs { margin-top: 16px; font-size: 14px; }
  .r-tabs a { padding: 8px 11px 7px; }
  .r-tabs .r-back { flex-basis: 100%; padding: 0 0 8px; }
  .r-row { grid-template-columns: 52px minmax(0, 1fr); grid-template-areas: 'icon name' 'pitch pitch' 'links links'; padding: 16px 0; }
  .r-row img { width: 52px; height: 52px; }
  .r-row .mf-tag { grid-area: auto; grid-column: 1 / -1; justify-self: start; }
  .r-name { font-size: 28px; }
  .r-pitch { font-size: 18px; }
}
'''


def build_row(app, page, is_home):
    here = ' aria-current="page"'
    tabs = (f'<nav class="r-tabs" aria-label="{app["name"]}"><a class="r-back" href="/#{app["repo"]}">← All apps</a>'
            f'<a href="#"{here if is_home else ""}>Overview</a>'
            f'<a href="#"{"" if is_home else here}>Privacy policy</a></nav>')
    name = (f'<h1 class="r-name">{app["name"]}</h1>' if is_home
            else f'<p class="r-name"><a href="#">{app["name"]}</a></p>')
    pkg = f'<span class="mf-mono">{package(app)}</span>' if package(app) else ''
    pitch = (f'<div class="r-pitch p-prose p-lead">{page["intro"]}</div>' if is_home and page['intro']
             else f'<p class="r-pitch">{app["desc"]}</p>')
    row = (f'<header class="r-row">{icon(app, 64)}<div>{name}<span class="mf-sc">{app["kind"]}</span></div>'
           f'{pitch}<div class="r-links">{store_link(app)}{source_link(app)}{pkg}</div>'
           f'{tag(app)}</header>')
    doc_title = '' if is_home else f'<h1>{page["title"]}</h1>'
    sections = ''.join(f'<h2 id="{sid}">{h}</h2>{body}' for sid, h, body in page['sections'])
    toc = ''
    if page['long']:
        items = ''.join(f'<li><a href="#{sid}">{h}</a></li>' for sid, h, _ in page['sections'])
        toc = f'<nav class="r-toc" aria-label="On this page"><h2 class="mf-sc">On this page</h2><ol>{items}</ol></nav>'
    return f'''{topbar()}
<div class="mf-wrap">
  {tabs}
  <div class="r-page">
    {row}
    <main class="r-body p-prose">{doc_title}{"" if is_home else page["intro"]}{sections}</main>
    {toc}
  </div>
</div>
<section class="d-about"><div class="mf-wrap d-about-grid">
  <div><h2>Hi, I'm Maksymilian.</h2><p>{ABOUT}</p></div>
  <aside><h2>Like what I make?</h2><p>{TIP}</p><div class="d-buttons">{support_buttons()}</div></aside>
</div></section>
{footer()}'''


# ----------------------------------------------------------------- B: fold

FOLD_CSS = '''
.f-crumb { display: flex; flex-wrap: wrap; gap: 4px 10px; padding-top: 20px; color: var(--color-ink-3); }
.f-crumb a { color: var(--color-ink); border-bottom: 1px solid var(--color-rule-strong); }
.f-crumb a:hover { color: var(--color-brand); }
.f-intro { display: grid; grid-template-columns: minmax(0, 7fr) minmax(0, 5fr); align-items: center; gap: var(--layout-gap); padding: 26px 0 32px; }
.f-title { display: flex; align-items: center; gap: 26px; }
.f-title img { flex: none; width: 96px; height: 96px; border-radius: 16px; }
.f-title h1 { font-size: clamp(44px, 5.2vw, 88px); line-height: 1; overflow-wrap: anywhere; }
.f-pitch { max-width: 52ch; font-size: 17px; line-height: 1.5; }
.f-facts { display: flex; flex-wrap: wrap; align-items: center; gap: 10px 18px; margin-top: 16px; }
.f-facts .mf-sc { color: var(--color-ink-3); font-size: 11px; }
.f-facts .mf-mono { flex-basis: 100%; color: var(--color-ink-3); overflow-wrap: anywhere; }
.f-mini { display: grid; grid-template-columns: 52px minmax(0, 1fr); gap: 0 16px; align-items: center; }
.f-mini img { width: 52px; height: 52px; border-radius: 8px; }
.f-mini b { font-family: var(--font-display); font-variation-settings: 'WONK' 1; font-size: 24px; font-weight: 500; line-height: 1.1; }
.f-mini b a:hover { color: var(--color-brand); }
.f-mini .mf-sc { align-self: start; color: var(--color-ink-3); font-size: 11px; }
.f-list { --f-num: 40px; --f-head: 320px; --f-gap: 28px; margin-bottom: 44px; border-top: 2px solid var(--color-rule-strong); }
.f-item { display: flow-root; position: relative; border-bottom: 1px solid var(--color-rule); scroll-margin-top: 16px; }
.f-item > summary, .f-rowlink { display: grid; grid-template-columns: var(--f-num) var(--f-head) minmax(0, 1fr) auto; column-gap: var(--f-gap); align-items: baseline; padding: 16px 0; }
.f-item > summary { list-style: none; cursor: pointer; }
.f-item > summary::-webkit-details-marker { display: none; }
.f-item > summary::after { content: '+' / ''; width: 20px; font-family: var(--font-mono); font-size: 16px; text-align: center; }
.f-item[open] > summary::after { content: '−' / ''; position: absolute; top: 18px; right: 0; }
.f-num { color: var(--color-brand); font-family: var(--font-mono); font-size: 13px; }
.f-item h2, .f-rowlink b { font-family: var(--font-display); font-variation-settings: 'WONK' 1; font-size: 22px; font-weight: 500; letter-spacing: -0.01em; line-height: 1.2; text-wrap: balance; }
.f-item > summary:hover h2, a.f-rowlink:hover b { color: var(--color-brand); }
.f-preview { overflow: hidden; color: var(--color-ink-3); font-size: 16px; text-overflow: ellipsis; white-space: nowrap; }
.f-item[open] > summary { float: left; width: calc(var(--f-num) + var(--f-head) + var(--f-gap)); grid-template-columns: var(--f-num) minmax(0, 1fr); }
.f-item[open] .f-preview { display: none; }
.f-body, .f-lead { margin-left: calc(var(--f-num) + var(--f-head) + var(--f-gap) * 2); padding: 16px 56px 22px 0; }
.f-lead { border-bottom: 1px solid var(--color-rule); padding-top: 22px; }
.f-rowlink { border-bottom: 1px solid var(--color-rule); align-items: center; }
.f-rowlink span:not(.f-num) { color: var(--color-ink-2); font-size: 16px; }
.f-rowlink .d-buttons { margin: 0; }
@media (min-width: 1700px) { .f-list { --f-head: 420px; --f-gap: 40px; } .p-prose { font-size: 19px; } }
@media (max-width: 1099px) {
  .f-list { --f-head: 220px; --f-gap: 20px; }
  .f-rowlink { grid-template-columns: var(--f-num) minmax(0, 1fr) auto; }
  .f-rowlink span:not(.f-num) { grid-column: 2; grid-row: 2; }
}
@media (max-width: 759px) {
  .f-intro { grid-template-columns: 1fr; gap: 18px; padding: 20px 0 24px; }
  .f-title { gap: 16px; }
  .f-title img { width: 64px; height: 64px; border-radius: 12px; }
  .f-list { --f-num: 26px; --f-gap: 10px; margin-bottom: 32px; }
  .f-item > summary, .f-item[open] > summary { float: none; width: auto; grid-template-columns: var(--f-num) minmax(0, 1fr) 20px; padding: 14px 0; }
  .f-item[open] > summary::after { position: static; }
  .f-preview { display: none; }
  .f-item h2, .f-rowlink b { font-size: 20px; }
  .f-body, .f-lead { margin-left: 0; padding: 0 0 18px; }
  .f-lead { padding-top: 18px; }
  .f-rowlink { grid-template-columns: var(--f-num) minmax(0, 1fr); row-gap: 6px; }
  .f-rowlink .d-buttons, .f-rowlink > i { grid-column: 2; }
}
'''


def preview(body):
    words = re.sub(r'<[^>]+>', ' ', body).split()
    return ' '.join(words[:26]) + ('…' if len(words) > 26 else '')


def build_fold(app, page, is_home):
    pkg = f'<span class="mf-mono">{package(app)}</span>' if package(app) else ''
    facts = f'<div class="f-facts">{tag(app)}<span class="mf-sc">{app["kind"]}</span>{store_link(app)}{source_link(app)}{pkg}</div>'
    if is_home:
        crumb = f'<a href="/#{app["repo"]}">Apps</a><span>/</span><span>{app["name"]}</span>'
        intro = (f'<div class="f-title">{icon(app, 96)}<h1 class="mf-display">{app["name"]}</h1></div>'
                 f'<div class="f-side"><div class="f-pitch p-prose p-lead">{page["intro"] or app["desc"]}</div>{facts}</div>')
    else:
        crumb = (f'<a href="/#{app["repo"]}">Apps</a><span>/</span><a href="#">{app["name"]}</a><span>/</span>'
                 f'<span>{page["title"]}</span>')
        intro = (f'<div class="f-title"><h1 class="mf-display">{page["title"]}</h1></div>'
                 f'<div class="f-side"><div class="f-mini">{icon(app, 52)}<b><a href="#">{app["name"]}</a></b>'
                 f'</div>{facts}</div>')
    rows = f'<div class="f-lead p-prose">{page["intro"]}</div>' if page['intro'] and not is_home else ''
    for i, (sid, heading, body) in enumerate(page['sections'], 1):
        is_open = ' open' if (not is_home or i == 1) else ''
        rows += (f'<details class="f-item" id="{sid}"{is_open}><summary><span class="f-num">{i:02d}</span>'
                 f'<h2>{heading}</h2><span class="f-preview">{preview(body)}</span></summary>'
                 f'<div class="f-body p-prose">{body}</div></details>')
    if is_home:
        rows += ('<a class="f-rowlink" href="#"><span class="f-num">→</span><b>Privacy policy</b>'
                 '<span>What the app stores, and what leaves your device.</span><i></i></a>')
    rows += (f'<div class="f-rowlink"><span class="f-num">♥</span><b>Like what I make?</b><span>{TIP}</span>'
             f'<div class="d-buttons">{support_buttons()}</div></div>')
    return f'''{topbar()}
<main class="mf-wrap">
  <p class="f-crumb mf-sc">{crumb}</p>
  <header class="f-intro">{intro}</header>
  <div class="f-list">{rows}</div>
</main>
{footer()}'''


# ----------------------------------------------------------------- C: band

BAND_CSS = '''
.d-top { border-bottom: 0; }
.b-cover { --color-live: var(--mf-green-bright); --color-building: var(--mf-amber-bright); --color-oss: var(--mf-blue-bright); --color-on-status: var(--mf-night-0); border-top: 0; }
.b-cover > .mf-wrap { display: grid; grid-template-columns: auto minmax(0, 7fr) minmax(0, 5fr); align-items: end; gap: 20px var(--layout-gap); padding-top: 36px; padding-bottom: 36px; }
.b-cover img { width: 120px; height: 120px; border-radius: 20px; }
.b-meta { display: flex; flex-wrap: wrap; align-items: center; gap: 6px 16px; margin-bottom: 12px; color: var(--color-ink-3); }
.b-meta .mf-sc { font-size: 11px; }
.b-meta .mf-mono { overflow-wrap: anywhere; }
.b-meta a { color: var(--color-ink); border-bottom: 1px solid var(--color-rule); }
.b-cover h1 { font-size: clamp(48px, 6vw, 104px); line-height: 0.95; overflow-wrap: anywhere; }
.b-pitch { max-width: 52ch; font-size: 17px; line-height: 1.5; }
.b-doc article > .b-sec:first-child { margin-top: 0; padding-top: 0; border-top: 0; }
.b-doc article > .b-sec:first-child .b-num { top: 8px; }
.b-side .d-buttons { margin-top: 18px; }
.b-cover--sub img { width: 72px; height: 72px; border-radius: 12px; }
.b-cover--sub h1 { font-size: clamp(40px, 4.4vw, 72px); }
.b-jump { position: sticky; top: 0; z-index: 5; border-bottom: 2px solid var(--color-rule-strong); background: var(--color-bg); }
.b-jump > .mf-wrap { display: flex; align-items: center; gap: 0 2px; overflow-x: auto; scrollbar-width: none; white-space: nowrap; }
.b-jump a { flex: none; padding: 11px 14px 10px; font-family: var(--font-display); font-size: 15px; font-weight: 600; }
.b-jump a:first-child { padding-left: 0; }
.b-jump a:hover { color: var(--color-brand); }
.b-jump .b-pages { position: sticky; right: 0; display: flex; flex: none; align-self: stretch; align-items: center; gap: 0 22px; margin-left: auto; padding-left: 28px; background: linear-gradient(to right, transparent, var(--color-bg) 24px); }
.b-jump .b-pages a { padding: 0 0 1px; }
.b-doc { width: min(100%, 780px + 2 * var(--layout-gutter)); margin: 0 auto; padding: 40px var(--layout-gutter) 56px; }
.b-doc .p-prose { font-size: 19px; }
.b-doc .p-prose > *, .b-doc .p-prose > .b-sec > * { max-width: none; }
.b-sec { position: relative; margin-top: 30px; padding-top: 26px; border-top: 1px solid var(--color-rule); scroll-margin-top: 56px; }
.b-sec > h2 { margin-top: 0; font-size: 30px; }
.b-num { position: absolute; top: 34px; left: -64px; color: var(--color-brand); font-family: var(--font-mono); font-size: 13px; }
.b-tip { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 14px 28px; margin-top: 44px; padding: 20px 0; border-top: 3px double var(--color-rule-strong); border-bottom: 3px double var(--color-rule-strong); }
.b-tip p { flex: 1 1 30ch; color: var(--color-ink-2); font-size: 17px; }
.b-tip strong { color: var(--color-ink); font-family: var(--font-display); font-weight: 600; }
.b-tip .d-buttons { margin: 0; }
@media (max-width: 1099px) {
  .b-cover > .mf-wrap { grid-template-columns: auto minmax(0, 1fr); align-items: center; }
  .b-cover img { width: 88px; height: 88px; border-radius: 16px; }
  .b-side { grid-column: 1 / -1; }
  .b-num { position: static; display: block; margin-bottom: 4px; }
}
@media (max-width: 759px) {
  .b-cover > .mf-wrap { gap: 16px; padding-top: 24px; padding-bottom: 26px; }
  .b-cover img, .b-cover--sub img { width: 60px; height: 60px; border-radius: 10px; }
  .b-jump > .mf-wrap { mask-image: linear-gradient(to right, #000 calc(100% - 40px), transparent); }
  .b-jump a { padding: 10px 10px 9px; font-size: 14px; }
  .b-jump .b-pages { position: static; padding-right: 40px; background: none; }
  .b-doc { padding-top: 26px; padding-bottom: 40px; }
  .b-doc .p-prose { font-size: 17px; }
  .b-sec > h2 { font-size: 24px; }
}
'''


def build_band(app, page, is_home):
    pkg = f'<span class="mf-mono">{package(app)}</span>' if package(app) else ''
    meta = f'{tag(app)}<span class="mf-sc">{app["kind"]}</span>{pkg}'
    store = (f'<a class="mf-btn mf-btn--brand" href="{app["store"][1]}">{app["store"][0]}</a>' if app['store'] else '')
    buttons = f'<div class="d-buttons">{store}<a class="mf-btn" href="{GH}/{app["repo"]}">Source on GitHub</a></div>'
    if is_home:
        cover = (f'{icon(app, 120)}<div><p class="b-meta">{meta}</p><h1 class="mf-display">{app["name"]}</h1></div>'
                 f'<div class="b-side"><div class="b-pitch p-prose p-lead">{page["intro"] or app["desc"]}</div>{buttons}</div>')
        pages = '<a class="mf-link" href="#">Privacy policy</a>'
    else:
        cover = (f'{icon(app, 72)}<div><p class="b-meta"><a class="mf-sc" href="#">{app["name"]}</a>{meta}</p>'
                 f'<h1 class="mf-display">{page["title"]}</h1></div><div class="b-side">{buttons}</div>')
        pages = f'<a class="mf-link" href="#">{app["name"]} overview</a>'
    jump = ''.join(f'<a href="#{sid}">{h}</a>' for sid, h, _ in page['sections'])
    secs = ''.join(
        f'<section class="b-sec" id="{sid}"><span class="b-num" aria-hidden="true">{i:02d}</span><h2>{h}</h2>{body}</section>'
        for i, (sid, h, body) in enumerate(page['sections'], 1))
    return f'''{topbar()}
<header class="mf-band mf-band--dark b-cover{"" if is_home else " b-cover--sub"}"><div class="mf-wrap">{cover}</div></header>
<nav class="b-jump" aria-label="On this page"><div class="mf-wrap">{jump}
  <span class="b-pages">{pages}<a class="mf-link" href="/#{app["repo"]}">← All apps</a></span></div></nav>
<main class="b-doc">
  <article class="p-prose">{"" if is_home else page["intro"]}{secs}</article>
  <aside class="b-tip"><p><strong>Like what I make?</strong> {TIP}</p><div class="d-buttons">{support_buttons()}</div></aside>
</main>
{footer()}'''


def html_page(title, css, body):
    return f'''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title}</title>
<style>
{css_from_repo()}
{SHARED_CSS}
{css}
</style>
</head>
<body>
{body}
</body>
</html>
'''


for slug, label, css, build in (('row', 'Row', ROW_CSS, build_row), ('fold', 'Fold', FOLD_CSS, build_fold),
                                ('band', 'Band', BAND_CSS, build_band)):
    out = HERE / slug
    out.mkdir(exist_ok=True)
    for filename, key, source, is_home in PAGES:
        app = APPS[key]
        page = load(app, source)
        (out / filename).write_text(html_page(f'{app["name"]} · MaksForge · {label}', css, build(app, page, is_home)))
        print('built', out / filename)
