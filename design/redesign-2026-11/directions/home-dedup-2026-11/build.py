"""Builds the three de-duplicated home mockups as self-contained HTML files."""

from pathlib import Path

HERE = Path(__file__).resolve().parent
REPO = HERE.parents[3]
STYLES = REPO / 'packages/ui/styles'
REPO_FROM_PAGE = '../../../../..'
ASSETS = f'{REPO_FROM_PAGE}/apps/web/public/assets'
FONTS = f'{REPO_FROM_PAGE}/packages/ui/assets/fonts'
GH = 'https://github.com/maks-sredniawa'
SITE = 'https://maksforge.com'
MAILTO = 'mailto:ideas@maksforge.com'


def play(app_id):
    return ('Google Play', f'https://play.google.com/store/apps/details?id={app_id}', True)


def web(repo):
    return ('Website', f'{SITE}/{repo}/', False)


def src(repo):
    return ('Source', f'{GH}/{repo}', False)


def release(repo):
    return ('Download', f'{GH}/{repo}/releases/latest', True)


KIND = {
    'android-app': 'Android app',
    'web-app': 'Web app',
    'chrome-extension': 'Chrome extension',
    'wot-mod': 'World of Tanks mod',
    'template': 'Template',
    'cli': 'Command-line tool',
    'tool': 'Tool',
}
STATUS_LABEL = {'live': 'Live', 'building': 'Building', 'oss': 'Open source'}

PROJECTS = [
    ('Binky', 'binky', 'android-app', 'live', 'android',
     "Track your rabbit's weight, health and care, so a slow change over weeks shows up instead of being forgotten.",
     [play('binky.bunny.and.rabbit.tracker'), web('binky-app')]),
    ('Gloam', 'gloam', 'android-app', 'live', 'android',
     "Dim the screen below Android's lowest brightness, for reading in the dark without the glare.",
     [play('io.github.srednimax.gloam'), web('gloam')]),
    ('Bevel', 'bevel', 'web-app', 'live', 'browser',
     'A free music player in your browser, in the style of the early 2000s, with an equaliser and a two-deck DJ mode. Your songs stay on your device.',
     [web('bevel'), src('bevel')]),
    ('Dark Theme for Play Console', 'play-console-dark-theme', 'chrome-extension', 'live', 'browser',
     'Switches on the dark palette that is already hidden inside Google Play Console. Unofficial, not affiliated with Google.',
     [('Chrome Web Store', 'https://chromewebstore.google.com/detail/dark-theme-for-play-conso/fgihoebnjomkgmhibmfcefkofiipfnnl', True),
      web('play-console-dark-theme')]),
    ('Autoloader Shell Timer', 'wot-autoloader-timer', 'wot-mod', 'live', 'wot',
     'Shows the load time of every shell in an autoreloader magazine, not just the one loading now. Needs <a href="https://github.com/CH4MPi/GUIFlash">GUIFlash</a>, which most modpacks include.',
     [release('wot-autoloader-timer'), src('wot-autoloader-timer')]),
    ('Ping Distance', 'wot-ping-distance', 'wot-mod', 'live', 'wot',
     'Keeps the distance visible on map position pings, not only while your crosshair is on them.',
     [release('wot-ping-distance'), src('wot-ping-distance')]),
    ('Urgent call', 'urgent', 'android-app', 'building', 'android',
     'Rings when the same number calls twice within a few minutes, even with your phone on silent or Do Not Disturb.',
     [web('urgent')]),
    ('Kozica', 'kozica', 'android-app', 'building', 'android',
     'An offline trail map of the Polish mountains, drawn in the colours of the trail signposts.',
     [web('kozica')]),
    ('Darek', 'darek', 'android-app', 'building', 'android',
     'A Polish voice assistant. Say <span lang="pl">"Darek, otwórz bramę"</span> and he calls your gate opener, with everything running offline on the phone.',
     [web('darek')]),
    ('Android starter', 'android-starter', 'template', 'oss', 'dev',
     'A starting point for offline Android apps: Compose skeleton, release pipeline, CI gates and device-driven UI checks.',
     [src('android-starter')]),
    ('WoT mod template', 'wot-mod-template', 'template', 'oss', 'dev',
     'A starting point for World of Tanks mods: Python 2.7 build, tests against stubbed game modules, CI, and a release on every version tag.',
     [src('wot-mod-template')]),
    ('wgmods CLI', 'wgmods-cli', 'cli', 'oss', 'dev',
     'Uploads a new World of Tanks mod version to the official Mod Hub (wgmods.net) from the terminal. Unofficial, not affiliated with Wargaming.',
     [src('wgmods-cli')]),
]

IDEAS = [
    ('Brainstorm sticky notes', 'android-app',
     "A simple sticky-notes board for brainstorming, where adding a note doesn't throw up pop-ups in your way. Free, no ads."),
    ('Gmail dark mode', 'chrome-extension',
     'A proper dark mode for Gmail in the browser, for people who want the whole of it dark.'),
    ('Monitor brightness presets', 'tool',
     'A desktop app that keeps a few brightness presets for all your monitors, whatever their make, so you can switch every screen between them in a moment.'),
    ('Woodworking planner', 'tool',
     'A web app to plan a woodworking project and see it as a 3D render, all worked out on your own computer, before you cut the first board.'),
    ('Garage filter extras', 'wot-mod',
     'Adds the garage filters the game is missing: one to hide rented tanks, which always show today, and one to show only tanks that are not premium.'),
    ('Darts scorer', 'android-app',
     "Counts your darts score from a few photos of the board taken from different angles, as few as it needs, so you don't have to tally the darts by hand."),
    ('Archery scorer', 'android-app',
     "Counts your archery score from a few photos of the target taken from different angles, as few as it needs, so you don't have to tally the arrows by hand."),
    ('Plain light control', 'android-app',
     "One app in your own language for smart lights whose own app is only in Chinese: it reads each light's details, adds its settings and keeps them per device, so you can control them all in one place."),
    ('IOU tracker', 'android-app',
     'Keeps track of informal loans, like 100 zł lent to a friend or money borrowed from your shared savings, so you remember to pay it back.'),
    ('Take your meds', 'android-app',
     'Reminds you to take your meds, with everything kept on your phone. No ads, no tracking.'),
]

LANGS = [('en', 'English'), ('pl', 'Polski'), ('de', 'Deutsch'), ('es', 'Español'), ('fr', 'Français'),
         ('it', 'Italiano'), ('pt-BR', 'Português (Brasil)'), ('cs', 'Čeština'), ('uk', 'Українська')]

GROUPS = [('live', 'In production', ''), ('building', 'In development', 'tint'), ('oss', 'Tools', '')]

STANDFIRST = ('Free Android apps, browser extensions and game mods, with no ads, no tracking and no '
              'accounts. The Android apps keep your data on your device.')
ABOUT = ('MaksForge is where I build the small tools I wish existed. Each one solves a single problem.')
TIP = 'A tip helps me keep building. It never unlocks anything.'
ASK = 'Got a small problem an app could fix? Tell me what it is and who it affects.'
H1 = 'Small apps that do one thing <em>well.</em>'


def css_from_repo():
    parts = []
    for name in ('fonts.css', 'tokens.css', 'base.css', 'components.css'):
        parts.append((STYLES / name).read_text())
    parts.append((REPO / 'apps/web/src/layout.css').read_text())
    return '\n'.join(parts).replace("url('/assets/fonts", f"url('{FONTS}")


def icon(p, size):
    return f'<img src="{ASSETS}/icons/{p[1]}.webp" alt="" width="{size}" height="{size}">'


def links(p):
    return ''.join(
        f'<a class="mf-link{" mf-link--go" if go else ""}" href="{href}">{label}</a>'
        for label, href, go in p[6])


def of(status):
    return [p for p in PROJECTS if p[3] == status]


def lang_menu():
    items = ''.join(
        f'<li><a href="#"{" aria-current=\"page\"" if code == "en" else ""} lang="{code}">{name}</a></li>'
        for code, name in LANGS)
    return ('<details class="lang"><summary class="lang-toggle mf-sc">'
            f'<img class="lang-flag" src="{ASSETS}/flags/en.svg" alt="" width="21" height="14">English'
            f'</summary><ul class="lang-menu">{items}</ul></details>')


def wordmark():
    return ('<a class="wordmark" href="#top" aria-label="MaksForge home">'
            f'<img src="{ASSETS}/logo-mark-128.webp" alt="" width="36" height="36"><span>MaksForge</span></a>')


def topbar(nav):
    items = ''.join(f'<a href="{href}"{" class=\"cta\"" if cta else ""}>{label}</a>' for label, href, cta in nav)
    return (f'<div class="mf-wrap" id="top"><header class="d-top">{wordmark()}'
            f'<nav aria-label="Sections">{items}</nav>{lang_menu()}</header></div>')


def support_buttons(small=False):
    size = ' mf-btn--small' if small else ''
    return (f'<a class="mf-btn mf-btn--brand{size}" href="https://buymeacoffee.com/maksforge">Buy me a coffee</a>'
            f'<a class="mf-btn{size}" href="https://paypal.me/maksymiliansredniawa">PayPal</a>')


def about_band():
    return f'''<section class="d-about"><div class="mf-wrap d-about-grid">
  <div id="about"><h2>Hi, I'm Maksymilian.</h2><p>{ABOUT}</p></div>
  <aside id="support"><h2>Like what I make?</h2><p>{TIP}</p><div class="d-buttons">{support_buttons()}</div></aside>
</div></section>'''


def footer():
    return (f'<div class="mf-wrap"><footer class="mf-foot"><span>© 2026 Maksymilian Średniawa · MaksForge</span>'
            f'<a href="{GH}">github.com/maks-sredniawa</a></footer></div>')


SHARED_CSS = '''
[hidden] { display: none !important; }
.d-top { display: flex; flex-wrap: wrap; align-items: center; gap: 10px 28px; padding: 16px 0 14px; border-bottom: 3px double var(--color-rule-strong); }
.d-top .wordmark { gap: 12px; }
.d-top .wordmark span { font-size: 32px; }
.d-top nav { display: flex; flex-wrap: wrap; gap: 6px 24px; margin-left: auto; font-family: var(--font-display); font-size: 15px; font-weight: 500; }
.d-top nav a:hover, .d-top nav .cta { color: var(--color-brand); }
.d-top .lang { padding-left: 24px; border-left: 1px solid var(--color-rule); }
.d-h1 { text-wrap: balance; }
.d-h1 em { color: var(--color-brand); font-weight: 400; }
.d-about { border-top: 3px double var(--color-rule-strong); }
.d-about-grid { display: grid; grid-template-columns: minmax(0, 7fr) minmax(0, 5fr); gap: var(--layout-gap) calc(var(--layout-gap) * 2); padding-top: 32px; padding-bottom: 40px; }
.d-about-grid > aside { padding-left: calc(var(--layout-gap) * 2); border-left: 1px solid var(--color-rule); }
.d-about h2 { margin-bottom: 8px; font-family: var(--font-display); font-variation-settings: 'WONK' 1; font-size: 30px; font-weight: 400; letter-spacing: -0.01em; line-height: 1.1; }
.d-about p { max-width: 56ch; color: var(--color-ink-2); font-size: 18px; }
.d-buttons { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 16px; }
.mf-band--dark { --color-idea: var(--mf-violet-bright); }
.d-mail { color: var(--color-ink-3); }
.d-idea-list { columns: 2; column-gap: calc(var(--layout-gap) * 1.5); margin: 0; padding: 0; list-style: none; }
.d-idea-list li { break-inside: avoid; border-bottom: 1px solid var(--color-rule); }
.d-idea-list summary { display: grid; grid-template-columns: minmax(0, 1fr) auto 14px; align-items: baseline; gap: 14px; padding: 10px 0; list-style: none; cursor: pointer; }
.d-idea-list summary::-webkit-details-marker { display: none; }
.d-idea-list summary::after { content: '+' / ''; font-family: var(--font-mono); font-size: 15px; text-align: center; }
.d-idea-list details[open] summary::after { content: '−' / ''; }
.d-idea-list summary:hover b { color: var(--color-idea); }
.d-idea-list b { font-family: var(--font-display); font-size: 18px; font-weight: 600; }
.d-idea-list .mf-sc { color: var(--color-idea); font-size: 11px; }
.d-idea-list details p { max-width: 62ch; padding: 0 28px 14px 0; color: var(--color-ink-2); font-size: 16px; line-height: 1.45; }
@media (max-width: 759px) {
  .d-top .wordmark span { font-size: 28px; }
  .d-top .lang { margin-left: auto; padding-left: 0; border-left: 0; }
  .d-top nav { order: 3; flex-basis: 100%; margin-left: 0; gap: 4px 20px; }
  .d-about-grid { grid-template-columns: 1fr; }
  .d-about-grid > aside { padding: 24px 0 0; border-left: 0; border-top: 1px solid var(--color-rule); }
  .d-about h2 { font-size: 26px; }
  .d-idea-list { columns: 1; }
}
'''


A_CSS = '''
.a-intro { display: grid; grid-template-columns: minmax(0, 7fr) minmax(0, 5fr); align-items: end; gap: var(--layout-gap); padding: 40px 0 34px; }
.a-intro h1 { max-width: 15ch; font-size: clamp(42px, 4.8vw, 80px); line-height: 1; }
.a-intro p { max-width: 48ch; color: var(--color-ink-2); font-size: 20px; line-height: 1.4; }
.a-filter { display: flex; flex-wrap: wrap; gap: 0 2px; min-width: 0; margin: 0; padding: 0; border: 0; border-bottom: 2px solid var(--color-rule-strong); }
.a-filter label { position: relative; display: inline-flex; align-items: baseline; gap: 8px; padding: 9px 16px 8px; font-family: var(--font-display); font-size: 15px; font-weight: 600; cursor: pointer; }
.a-filter label:hover { background: var(--color-surface-2); }
.a-filter input { position: absolute; inset: 0; margin: 0; opacity: 0; cursor: pointer; }
.a-filter label:has(input:checked) { background: var(--color-ink); color: var(--color-bg); }
.a-filter label:has(input:focus-visible) { outline: 2px solid var(--color-brand); outline-offset: 2px; }
.a-filter small { font-family: var(--font-mono); font-size: 12px; font-weight: 400; opacity: 0.75; }
.a-list { display: grid; grid-template-columns: 52px minmax(200px, 1.1fr) minmax(0, 2.8fr) auto auto; column-gap: 28px; margin: 0 0 44px; padding: 0; list-style: none; }
.a-row { display: grid; grid-column: 1 / -1; grid-template-columns: subgrid; align-items: center; padding: 13px 0; border-bottom: 1px solid var(--color-rule); scroll-margin-top: 24px; }
.a-row img { width: 52px; height: 52px; border-radius: 8px; }
.a-row h3 { font-family: var(--font-display); font-variation-settings: 'WONK' 1; font-size: 22px; font-weight: 500; letter-spacing: -0.01em; line-height: 1.1; }
.a-row .mf-sc { display: block; margin-top: 3px; color: var(--color-ink-3); font-size: 11px; }
.a-row p { max-width: 70ch; color: var(--color-ink-2); font-size: 16px; line-height: 1.4; }
.a-row p a { text-decoration: underline; text-underline-offset: 3px; }
.a-links { display: flex; flex-wrap: wrap; gap: 8px 18px; }
.a-row .mf-tag { justify-self: end; }
body:has(#f-android:checked) .a-row:not([data-for='android']),
body:has(#f-browser:checked) .a-row:not([data-for='browser']),
body:has(#f-wot:checked) .a-row:not([data-for='wot']),
body:has(#f-dev:checked) .a-row:not([data-for='dev']) { display: none; }
.a-ideas { display: grid; grid-template-columns: minmax(0, 4fr) minmax(0, 8fr); gap: var(--layout-gap) calc(var(--layout-gap) * 2); }
.a-ideas h2 { font-family: var(--font-display); font-variation-settings: 'WONK' 1; font-size: 36px; font-weight: 500; letter-spacing: -0.01em; line-height: 1.05; }
.a-ask { max-width: 40ch; margin: 12px 0 18px; color: var(--color-ink-2); font-size: 18px; }
.a-cta { display: flex; flex-wrap: wrap; align-items: center; gap: 10px 16px; }
@media (min-width: 1700px) { .d-idea-list { columns: 3; } }
@media (max-width: 1099px) {
  .a-list { display: block; }
  .a-row { grid-template-columns: 52px minmax(0, 1fr) auto; grid-template-areas: 'icon name tag' 'icon summary summary' 'icon links links'; gap: 8px 16px; align-items: start; padding: 16px 0; }
  .a-row img { grid-area: icon; }
  .a-row > div:first-of-type { grid-area: name; }
  .a-row p { grid-area: summary; }
  .a-links { grid-area: links; }
  .a-row .mf-tag { grid-area: tag; }
  .a-ideas { grid-template-columns: 1fr; }
}
@media (max-width: 759px) {
  .a-intro { grid-template-columns: 1fr; gap: 16px; padding: 28px 0 24px; }
  .a-intro p { font-size: 18px; }
  .a-filter label { padding: 8px 11px 7px; font-size: 14px; }
  .a-row { grid-template-columns: 44px minmax(0, 1fr); grid-template-areas: 'icon name' 'summary summary' 'links links'; }
  .a-row img { width: 44px; height: 44px; }
  .a-row .mf-tag { grid-area: auto; grid-column: 1 / -1; grid-row: 4; justify-self: start; }
  .a-ideas h2 { font-size: 30px; }
}
'''


def build_a():
    chips = [('all', 'All', len(PROJECTS)), ('android', 'Android', 0), ('browser', 'Browser', 0),
             ('wot', 'World of Tanks', 0), ('dev', 'For developers', 0)]
    chip_html = ''
    for key, label, n in chips:
        n = n or sum(1 for p in PROJECTS if p[4] == key)
        checked = ' checked' if key == 'all' else ''
        chip_html += f'<label><input type="radio" name="f" id="f-{key}"{checked}>{label} <small>{n}</small></label>'
    rows = ''
    for p in PROJECTS:
        rows += (f'<li class="a-row" id="{p[1]}" data-for="{p[4]}">{icon(p, 52)}'
                 f'<div><h3>{p[0]}</h3><span class="mf-sc">{KIND[p[2]]}</span></div>'
                 f'<p>{p[5]}</p><div class="a-links">{links(p)}</div>'
                 f'<span class="mf-tag mf-tag--{p[3]}">{STATUS_LABEL[p[3]]}</span></li>')
    ideas = ''.join(
        f'<li><details><summary><b>{n}</b><span class="mf-sc">{KIND[k]}</span></summary><p>{pitch}</p></details></li>'
        for n, k, pitch in IDEAS)
    nav = [('Apps', '#apps', False), (f'Ideas', '#ideas', False), ('About', '#about', False),
           ('GitHub', GH, False), ('Support', '#support', True)]
    return f'''{topbar(nav)}
<main>
  <div class="mf-wrap">
    <section class="a-intro"><h1 class="mf-display d-h1">{H1}</h1><p>{STANDFIRST}</p></section>
    <section id="apps" aria-label="Apps and tools">
      <fieldset class="a-filter"><legend class="mf-sr">Show</legend>{chip_html}</fieldset>
      <ul class="a-list">{rows}</ul>
    </section>
  </div>
  <section id="ideas" class="mf-band mf-band--dark"><div class="mf-wrap a-ideas">
    <div><h2>What should I build next?</h2><p class="a-ask">{ASK}</p>
      <div class="a-cta"><a class="mf-btn mf-btn--brand" href="{MAILTO}">Send an idea</a><span class="mf-mono d-mail">ideas@maksforge.com</span></div></div>
    <ul class="d-idea-list" aria-label="Ideas">{ideas}</ul>
  </div></section>
  {about_band()}
</main>
{footer()}'''



B_CSS = '''
.b-hero { display: grid; grid-template-columns: minmax(0, 7fr) minmax(0, 5fr); align-items: end; gap: var(--layout-gap); padding: 44px 0 40px; }
.b-hero h1 { max-width: 14ch; font-size: clamp(46px, 5.4vw, 92px); line-height: 0.98; }
.b-hero p { max-width: 48ch; color: var(--color-ink-2); font-size: 21px; line-height: 1.4; }
.b-shelf > .mf-wrap { display: grid; grid-template-columns: var(--layout-label) minmax(0, 1fr); gap: 28px; padding-top: 28px; padding-bottom: 24px; }
.b-label h2 { font-family: var(--font-display); font-variation-settings: 'WONK' 1; font-size: 30px; font-weight: 500; letter-spacing: -0.01em; line-height: 1.05; }
.b-label .mf-tag { margin-top: 12px; }
.b-ctrl { display: flex; align-items: center; gap: 8px; margin-top: 18px; }
.b-ctrl button { width: 38px; height: 38px; padding: 0; border: 1px solid var(--color-rule-strong); background: transparent; color: var(--color-ink); font: 600 17px/1 var(--font-display); cursor: pointer; }
.b-ctrl button:hover:not(:disabled) { background: var(--color-ink); color: var(--color-bg); }
.b-ctrl button:disabled { border-color: var(--color-rule); color: var(--color-ink-3); cursor: default; }
.b-ctrl output { margin-left: 6px; color: var(--color-ink-3); font-family: var(--font-mono); font-size: 12px; white-space: nowrap; }
.b-track { display: flex; gap: 20px; margin: 0; padding: 0 0 14px; overflow-x: auto; overscroll-behavior-x: contain; scroll-snap-type: x mandatory; scrollbar-color: var(--color-ink-3) transparent; scrollbar-width: thin; list-style: none; }
.b-track > li { flex: 1 0 calc((100% - 60px) / 3.3); min-width: 0; scroll-snap-align: start; }
.b-track:focus-visible { outline-offset: 4px; }
.b-track .mf-tile__body { grid-template-rows: auto auto 1fr auto; }
.b-track .mf-tile__summary { align-self: start; }
.b-pins > li { flex-grow: 0; }
.b-pins .mf-pin { height: 100%; }
.b-ideas .mf-callout { margin-top: 14px; }
.b-ideas-main { min-width: 0; }
@media (min-width: 1700px) { .b-track > li { flex-basis: calc((100% - 80px) / 4.3); } }
@media (max-width: 1099px) {
  .b-shelf > .mf-wrap { grid-template-columns: minmax(0, 1fr); gap: 16px; }
  .b-label { display: flex; flex-wrap: wrap; align-items: center; gap: 10px 16px; }
  .b-label .mf-tag, .b-ctrl { margin-top: 0; }
  .b-ctrl { margin-left: auto; }
  .b-track > li { flex-basis: calc((100% - 40px) / 2.3); }
}
@media (max-width: 759px) {
  .b-hero { grid-template-columns: 1fr; gap: 16px; padding: 28px 0; }
  .b-hero p { font-size: 18px; }
  .b-label h2 { font-size: 26px; }
  .b-track { gap: 12px; }
  .b-track > li { flex-basis: 86%; }
  .b-ctrl button { width: 34px; height: 34px; }
}
'''

B_JS = '''
document.querySelectorAll('[data-shelf]').forEach((shelf) => {
  const track = shelf.querySelector('.b-track');
  const ctrl = shelf.querySelector('.b-ctrl');
  const [prev, next] = ctrl.querySelectorAll('button');
  const out = ctrl.querySelector('output');
  const items = [...track.children];
  const update = () => {
    const max = track.scrollWidth - track.clientWidth;
    ctrl.hidden = max < 2;
    prev.disabled = track.scrollLeft < 2;
    next.disabled = track.scrollLeft > max - 2;
    const box = track.getBoundingClientRect();
    const seen = items.flatMap((el, i) => {
      const r = el.getBoundingClientRect();
      return r.left >= box.left - 2 && r.right <= box.right + 2 ? [i + 1] : [];
    });
    out.textContent = seen.length ? (seen.length > 1 ? seen[0] + '–' + seen.at(-1) : seen[0]) + ' / ' + items.length : '';
  };
  const page = (dir) => {
    const step = items[0].getBoundingClientRect().width + parseFloat(getComputedStyle(track).columnGap);
    track.scrollBy({ left: dir * step * Math.max(1, Math.floor((track.clientWidth + 20) / step)), behavior: 'smooth' });
  };
  prev.addEventListener('click', () => page(-1));
  next.addEventListener('click', () => page(1));
  track.addEventListener('scroll', update, { passive: true });
  new ResizeObserver(update).observe(track);
  update();
});
'''


def b_ctrl(label):
    return (f'<div class="b-ctrl" hidden><button type="button" aria-label="Previous: {label}">←</button>'
            f'<button type="button" aria-label="Next: {label}">→</button><output aria-live="off"></output></div>')


def build_b():
    shelves = ''
    for status, heading, tone in GROUPS:
        items = of(status)
        tiles = ''
        for p in items:
            tiles += (f'<li class="mf-tile" id="{p[1]}"><div class="mf-tile__body">'
                      f'<img class="mf-tile__icon" src="{ASSETS}/icons/{p[1]}.webp" alt="" width="56" height="56">'
                      f'<h3 class="mf-tile__name">{p[0]}</h3><span class="mf-tile__kind mf-sc">{KIND[p[2]]}</span>'
                      f'<p class="mf-tile__summary">{p[5]}</p><div class="mf-tile__links">{links(p)}</div></div></li>')
        band = f' mf-band--{tone}' if tone else ''
        shelves += f'''<section id="{status}" class="mf-band{band} b-shelf" data-shelf><div class="mf-wrap">
  <div class="b-label"><h2>{heading}</h2><span class="mf-tag mf-tag--{status}">{STATUS_LABEL[status]} · {len(items)}</span>{b_ctrl(heading)}</div>
  <ul class="b-track" tabindex="0" role="group" aria-label="{heading}">{tiles}</ul>
</div></section>'''
    pins = ''.join(
        f'<li><div class="mf-pin mf-paper"><h3>{n}</h3><div class="mf-pin__meta"><span class="mf-sc">{KIND[k]}</span></div><p>{pitch}</p></div></li>'
        for n, k, pitch in IDEAS)
    nav = [('In production', '#live', False), ('In development', '#building', False), ('Tools', '#oss', False),
           ('Ideas', '#ideas', False), ('About', '#about', False), ('GitHub', GH, False), ('Support', '#support', True)]
    return f'''{topbar(nav)}
<main>
  <div class="mf-wrap"><section class="b-hero"><h1 class="mf-display d-h1">{H1}</h1><p>{STANDFIRST}</p></section></div>
  {shelves}
  <section id="ideas" class="mf-band mf-band--dark b-shelf b-ideas" data-shelf><div class="mf-wrap">
    <div class="b-label"><h2>What should I build next?</h2><span class="mf-tag mf-tag--idea">Ideas · {len(IDEAS)}</span>{b_ctrl('Ideas')}</div>
    <div class="b-ideas-main"><ul class="b-track b-pins" tabindex="0" role="group" aria-label="Ideas">{pins}</ul>
      <div class="mf-callout mf-paper"><p><strong>{ASK.split('?')[0]}?</strong>{ASK.split('?')[1]} <span class="mf-mono d-mail">ideas@maksforge.com</span></p>
        <a class="mf-btn mf-btn--brand" href="{MAILTO}">Send an idea</a></div></div>
  </div></section>
  {about_band()}
</main>
{footer()}
<script>{B_JS}</script>'''



C_CSS = '''
.c-page { display: grid; grid-template-columns: minmax(0, 400px) minmax(0, 1fr); gap: 0; max-width: var(--layout-max); margin: 0 auto; padding: 0 var(--layout-gutter); }
.c-panel { position: sticky; top: 0; align-self: start; display: flex; flex-direction: column; min-height: 100vh; padding: 24px 40px 24px 0; }
.c-top { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding-bottom: 16px; border-bottom: 3px double var(--color-rule-strong); }
.c-top .wordmark { gap: 12px; }
.c-top .wordmark span { font-size: 30px; }
.c-intro h1 { margin-top: 32px; font-size: clamp(44px, 3.9vw, 60px); line-height: 1; }
.c-intro p { margin-top: 18px; color: var(--color-ink-2); font-size: 18px; line-height: 1.4; }
.c-jump { margin: 28px 0 32px; padding: 0; border-top: 2px solid var(--color-rule-strong); list-style: none; }
.c-jump a { display: grid; grid-template-columns: 10px minmax(0, 1fr) auto; align-items: baseline; gap: 12px; padding: 8px 0; border-bottom: 1px solid var(--color-rule); font-family: var(--font-display); font-size: 16px; font-weight: 500; }
.c-jump a::before, .c-group > h2::before { content: ''; width: 9px; height: 9px; background: var(--dot); }
.c-jump a:hover { color: var(--color-brand); }
.c-jump span { color: var(--color-ink-3); font-family: var(--font-mono); font-size: 13px; }
.c-live { --dot: var(--color-live); }
.c-building { --dot: var(--color-building); }
.c-oss { --dot: var(--color-oss); }
.c-idea { --dot: var(--color-idea); }
.c-about { margin-top: auto; padding-top: 16px; border-top: 1px solid var(--color-rule-strong); color: var(--color-ink-2); font-size: 16px; }
.c-about strong { color: var(--color-ink); font-family: var(--font-display); font-weight: 600; }
.c-support { margin-top: 14px; color: var(--color-ink-2); font-size: 16px; }
.c-support .d-buttons { margin-top: 12px; }
.c-gh { display: flex; flex-wrap: wrap; align-items: baseline; justify-content: space-between; gap: 8px 16px; margin-top: 18px; }
.c-main { min-width: 0; padding: 30px 0 40px 48px; border-left: 1px solid var(--color-rule-strong); }
.c-group { margin-bottom: 34px; scroll-margin-top: 24px; }
.c-group > h2 { display: flex; align-items: baseline; gap: 10px; padding-bottom: 8px; border-bottom: 2px solid var(--color-rule-strong); font-family: var(--font-display); font-variation-settings: 'WONK' 1; font-size: 24px; font-weight: 500; letter-spacing: -0.01em; line-height: 1.1; }
.c-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 0 32px; margin: 0; padding: 0; list-style: none; }
.c-item { display: grid; grid-template-columns: 48px minmax(0, 1fr); grid-template-rows: auto auto auto 1fr; align-content: start; gap: 0 14px; padding: 16px 0 18px; border-bottom: 1px solid var(--color-rule); }
.c-item img { grid-row: 1 / span 2; width: 48px; height: 48px; border-radius: 8px; }
.c-item h3 { align-self: end; font-family: var(--font-display); font-variation-settings: 'WONK' 1; font-size: 21px; font-weight: 500; letter-spacing: -0.01em; line-height: 1.1; }
.c-item .mf-sc { color: var(--color-ink-3); font-size: 11px; }
.c-item p { grid-column: 1 / -1; margin-top: 10px; color: var(--color-ink-2); font-size: 16px; line-height: 1.4; }
.c-item p a { text-decoration: underline; text-underline-offset: 3px; }
.c-links { grid-column: 1 / -1; display: flex; flex-wrap: wrap; align-self: end; gap: 8px 18px; margin-top: 12px; }
.c-main .d-idea-list { column-gap: 32px; padding-top: 4px; }
.c-ask { display: flex; flex-wrap: wrap; align-items: center; gap: 12px 24px; margin-top: 22px; padding: 16px 0; border-top: 3px double var(--color-rule-strong); border-bottom: 3px double var(--color-rule-strong); }
.c-ask p { flex: 1 1 30ch; color: var(--color-ink-2); font-size: 17px; }
.c-ask p strong { color: var(--color-ink); font-family: var(--font-display); font-weight: 600; }
.c-foot { color: var(--color-ink-3); font-size: 14px; font-style: italic; }
@media (min-width: 1700px) { .c-page { grid-template-columns: minmax(0, 440px) minmax(0, 1fr); } .c-main .d-idea-list { columns: 3; } }
@media (max-height: 859px) { .c-panel { position: static; min-height: 0; } .c-about { margin-top: 0; } }
@media (max-width: 1299px) { .c-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } .c-page { grid-template-columns: minmax(0, 340px) minmax(0, 1fr); } .c-panel { padding-right: 28px; } .c-main { padding-left: 32px; } }
@media (max-width: 899px) {
  .c-page { display: flex; flex-direction: column; }
  .c-panel { display: contents; }
  .c-top { order: 1; padding-top: 14px; }
  .c-intro { order: 2; }
  .c-intro h1 { margin-top: 26px; }
  .c-panel > nav { order: 3; }
  .c-jump { display: grid; grid-template-columns: 1fr 1fr; gap: 0 16px; margin: 22px 0 0; }
  .c-main { order: 4; padding: 28px 0 32px; border-left: 0; }
  .c-about { order: 5; margin-top: 0; padding-top: 20px; border-top: 3px double var(--color-rule-strong); font-size: 17px; }
  .c-support { order: 6; font-size: 17px; }
  .c-gh { order: 7; padding-bottom: 32px; }
  .d-idea-list { columns: 1; }
  .c-grid { grid-template-columns: 1fr; }
  .c-jump a { font-size: 15px; gap: 8px; }
}
'''


def build_c():
    groups = ''
    for status, heading, _ in GROUPS:
        cells = ''
        for p in of(status):
            cells += (f'<li class="c-item" id="{p[1]}">{icon(p, 48)}<h3>{p[0]}</h3>'
                      f'<span class="mf-sc">{KIND[p[2]]}</span><p>{p[5]}</p><div class="c-links">{links(p)}</div></li>')
        groups += (f'<section class="c-group c-{status}" id="{status}"><h2>{heading}</h2>'
                   f'<ul class="c-grid">{cells}</ul></section>')
    jump = ''.join(
        f'<li><a class="c-{status}" href="#{status}">{heading}<span>{len(of(status))}</span></a></li>'
        for status, heading, _ in GROUPS)
    jump += f'<li><a class="c-idea" href="#ideas">Ideas<span>{len(IDEAS)}</span></a></li>'
    ideas = ''.join(
        f'<li><details><summary><b>{n}</b><span class="mf-sc">{KIND[k]}</span></summary><p>{pitch}</p></details></li>'
        for n, k, pitch in IDEAS)
    ask_head, ask_rest = ASK.split('?')
    return f'''<div class="c-page" id="top">
  <header class="c-panel">
    <div class="c-top">{wordmark()}{lang_menu()}</div>
    <div class="c-intro"><h1 class="mf-display d-h1">{H1}</h1><p>{STANDFIRST}</p></div>
    <nav aria-label="Sections"><ul class="c-jump">{jump}</ul></nav>
    <p class="c-about" id="about"><strong>Hi, I'm Maksymilian.</strong> {ABOUT}</p>
    <div class="c-support" id="support"><p>{TIP}</p><div class="d-buttons">{support_buttons(True)}</div></div>
    <p class="c-gh"><a class="mf-link" href="{GH}">GitHub</a><span class="c-foot">© 2026 Maksymilian Średniawa</span></p>
  </header>
  <main class="c-main">
    {groups}
    <section class="c-group c-idea" id="ideas"><h2>What should I build next?</h2>
      <ul class="d-idea-list" aria-label="Ideas">{ideas}</ul>
      <div class="c-ask"><p><strong>{ask_head}?</strong>{ask_rest} <span class="mf-mono d-mail">ideas@maksforge.com</span></p>
        <a class="mf-btn mf-btn--brand" href="{MAILTO}">Send an idea</a></div>
    </section>
  </main>
</div>'''


def page(title, css, body):
    return f'''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>MaksForge · {title}</title>
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


for slug, title, css, build in (('ledger', 'Ledger', A_CSS, build_a), ('shelves', 'Shelves', B_CSS, build_b),
                                ('counter', 'Counter', C_CSS, build_c)):
    out = HERE / slug
    out.mkdir(exist_ok=True)
    (out / 'home.html').write_text(page(title, css, build()))
    print('built', out / 'home.html')
