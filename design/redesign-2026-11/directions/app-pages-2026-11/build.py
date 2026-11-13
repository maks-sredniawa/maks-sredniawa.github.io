#!/usr/bin/env python3
"""Generates the three app-page direction mockups (Binky and Kozica each) as self-contained HTML."""
from pathlib import Path

HERE = Path(__file__).resolve().parent
HOME_REPO = HERE.parents[3]
REPO_FROM_PAGE = '../../../../..'
ICONS = f'{REPO_FROM_PAGE}/apps/web/public/assets/icons'
LOGO = f'{REPO_FROM_PAGE}/apps/web/public/assets/logo-mark-128.webp'
FONT_DIR = f'{REPO_FROM_PAGE}/packages/ui/assets/fonts'

TOKENS = (HOME_REPO / 'packages/ui/styles/tokens.css').read_text()
FONTS = (HOME_REPO / 'packages/ui/styles/fonts.css').read_text().replace("url('/assets/fonts/", f"url('{FONT_DIR}/")

BMC = 'https://buymeacoffee.com/maksforge'

APPS = {
    'binky-app': dict(
        slug='binky-app', name='Binky', icon='binky.webp', status='live', status_label='Live',
        kind='Android app',
        desc="An Android app for keeping track of a bunny's health.",
        play='https://play.google.com/store/apps/details?id=binky.bunny.and.rabbit.tracker',
        chrome=None, package='binky.bunny.and.rabbit.tracker', repo='maks-sredniawa/binky-app',
        lead="<strong>An Android app for keeping track of a bunny's health.</strong> Free, ad-free, and entirely on your own phone: no account, no sign-up, no server, and nothing you record is ever uploaded anywhere.",
        intro="<p>Rabbits hide illness. By the time something is obvious it is often urgent, and the early signs — a little less weight, smaller droppings, a skipped meal — are easy to miss and easy to forget. Binky is somewhere to write them down, for one rabbit or several, so a change over weeks is visible instead of remembered.</p>",
        sections=[
            ('what-it-keeps-track-of', 'What it keeps track of', """
<ul>
<li><strong>Weight over time</strong>, entered in grams because that is what scales show, charted against real dates rather than evenly spaced entries, with the change since last time always shown in grams.</li>
<li><strong>Observations</strong> — droppings, cecotropes, appetite, mood, activity, water, symptoms, notes — logged when you notice something, not on a schedule.</li>
<li><strong>Vet visits</strong>, and scans of the paperwork that comes back from them.</li>
<li><strong>Medication courses</strong>, with every dose worked out and a reminder before each one, and a record of what was actually given.</li>
<li><strong>Reminders for recurring care</strong> — nail trims, vaccinations, weigh-ins, or anything you name yourself.</li>
<li><strong>Photos</strong>, because you will take them anyway.</li>
</ul>
<p>Rabbits that live together share a litter tray, so one observation can honestly cover all of them rather than pretending the droppings belonged to whichever name you tapped. A rabbit that has died or been rehomed is archived, never quietly deleted.</p>
<p>Nine languages, switchable inside the app without changing your phone: English, Polski, Deutsch, Español, Français, Italiano, Português (Brasil), Čeština, Українська.</p>"""),
            ('a-record-not-a-diagnosis', 'A record, not a diagnosis', """
<p>Binky will not tell you whether your rabbit is ill, and it never infers a problem from missing entries. Silence means nobody looked, not that everything is fine. It shows you what you recorded, clearly enough to notice a change and take it to someone qualified. If you are worried about your rabbit, see a vet experienced with rabbits.</p>"""),
            ('your-data-stays-on-your-device', 'Your data stays on your device', """
<p>There is no backend to send anything to. Everything lives in the app's private storage on your phone, and backups are exported to storage you choose. The details, including the three things that happen outside the app because the operating system or Google does them, are in the <strong><a href="privacy-policy">Privacy Policy</a></strong>.</p>"""),
            ('support', 'Support', """
<p><strong><code>binky.support@maksforge.com</code></strong> — an ordinary mailbox that a person reads. Questions, bug reports and feature requests all go to the same place.</p>"""),
            ('the-source', 'The source', """
<p>The app is built in the open at <strong><a href="https://github.com/maks-sredniawa/binky-app">github.com/maks-sredniawa/binky-app</a></strong>, under the <a href="https://github.com/maks-sredniawa/binky-app/blob/main/LICENSE">PolyForm Noncommercial</a> licence: use it, change it, share it, build it for your own rabbits — for any noncommercial purpose.</p>"""),
        ],
    ),
    'kozica': dict(
        slug='kozica', name='Kozica', icon='kozica.webp', status='building', status_label='In development',
        kind='Android app',
        desc='A hiking map of the Polish mountains that works with no signal at all.',
        play=None, chrome=None, package=None, repo='maks-sredniawa/kozica',
        lead='<strong>A hiking map of the Polish mountains that works with no signal at all.</strong> Free, ad-free, and entirely on your own phone: no account, no sign-up, and no permission to use the internet.',
        intro='',
        sections=[
            ('what-it-does', 'What it does', """
<ul>
<li><strong>Trails in their signpost colours</strong> — red, blue, green, yellow and black, each with its symbol along the line, and two trails on one path drawn side by side so you can tell which one you are on.</li>
<li><strong>Everything else you look for on the way</strong> — paths, huts and shelters, peaks, passes, springs, viewpoints, car parks and stops, national-park boundaries and the state border, in a light and a dark style.</li>
<li><strong>Where you are</strong> — one tap shows your position, its accuracy and the direction you are facing, read on the phone and never sent anywhere.</li>
</ul>"""),
            ('what-it-does-not-do', 'What it does not do', """
<p>It draws the trails as OpenStreetMap records them, at the date shown on the map. It does not know about closures, avalanche warnings, the weather or the state of a path today. Check the national park's announcements and the forecast before you go, and turn back when the mountain says so.</p>"""),
            ('your-data-stays-on-your-device', 'Your data stays on your device', """
<p>There is no backend to send anything to. Everything lives in the app's private storage on your phone. The details are in the <strong><a href="privacy-policy">Privacy Policy</a></strong>.</p>"""),
            ('support', 'Support', """
<p><strong>kozica.support@maksforge.com</strong> — an ordinary mailbox that a person reads.</p>"""),
            ('the-source', 'The source', """
<p>Built in the open at <strong><a href="https://github.com/maks-sredniawa/kozica">maks-sredniawa/kozica</a></strong>. Map data © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>, available under the Open Database License.</p>"""),
        ],
    ),
}


def fill(template, **kw):
    out = template
    for key, value in kw.items():
        out = out.replace(f'[[{key}]]', str(value))
    assert '[[' not in out, out[out.index('[['):out.index('[[') + 40]
    return out


def store_buttons(app, primary, secondary):
    buttons = []
    if app['play']:
        buttons.append(f'<a class="{primary}" href="{app["play"]}">Google Play</a>')
    if app['chrome']:
        buttons.append(f'<a class="{primary}" href="{app["chrome"]}">Chrome Web Store</a>')
    source_class = primary if not buttons else secondary
    buttons.append(f'<a class="{source_class}" href="https://github.com/{app["repo"]}">Source on GitHub</a>')
    return '\n'.join(buttons)


def facts(app, row='<div><dt>[[label]]</dt><dd[[cls]]>[[value]]</dd></div>', mono_class=' class="mono"'):
    rows = [('Status', app['status_label'], False), ('Price', 'Free, no ads', False)]
    if app['package']:
        rows.append(('Package', app['package'], True))
    rows.append(('Source', f'<a href="https://github.com/{app["repo"]}">{app["repo"]}</a>', True))
    rows.append(('Privacy', '<a href="privacy-policy">Privacy policy</a>', False))
    return '\n'.join(fill(row, label=l, value=v, cls=mono_class if m else '') for l, v, m in rows)


def head(app, title_suffix, extra_css, extra_links=''):
    return f"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{app['name']} · MaksForge · {title_suffix}</title>
<meta name="description" content="{app['desc']}">
<meta name="color-scheme" content="light dark">
{extra_links}
<style>
{FONTS}
{TOKENS}
{extra_css}
</style>
</head>"""


DOSSIER_CSS = """
*, *::before, *::after { box-sizing: border-box; }
html { -webkit-text-size-adjust: 100%; }
body { margin: 0; background: var(--color-bg); color: var(--color-ink); font: 18px/1.55 var(--font-text); }
a { color: inherit; text-decoration: none; }
img { display: block; }
h1, h2, h3, p, dl, dd, ul, ol { margin: 0; }
.sc { font-family: var(--font-display); font-size: 12px; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; }
.mono { font-family: var(--font-mono); font-size: 14px; font-weight: 500; }

.wrap { max-width: var(--layout-max); margin: 0 auto; padding: 0 var(--layout-gutter); }
.page { display: grid; grid-template-columns: 380px minmax(0, 1fr); gap: 0 72px; }

.rail { display: flex; flex-direction: column; padding: 28px 44px 56px 0; border-right: 1px solid var(--color-rule-strong); }
.brand { display: flex; align-items: center; gap: 10px; font-family: var(--font-display); font-variation-settings: 'WONK' 1; font-size: 20px; font-weight: 600; letter-spacing: -0.02em; }
.brand img { width: 28px; height: 28px; border-radius: 3px; }
.rail-top { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding-bottom: 14px; border-bottom: 1px solid var(--color-rule); }
.rail-top .back { color: var(--color-ink-3); font-style: italic; font-size: 16px; }
.rail-top .back:hover { color: var(--color-brand); }

.plate { position: relative; display: grid; place-items: center; aspect-ratio: 1; margin-top: 28px; border: 1px solid var(--color-rule-strong); outline: 1px solid var(--color-rule-strong); outline-offset: 3px; background: var(--color-surface); background-image: radial-gradient(var(--color-rule) 1px, transparent 1px); background-size: 14px 14px; background-position: 7px 7px; }
.plate img { width: 176px; height: 176px; border: 1px solid var(--color-rule-strong); border-radius: 26px; box-shadow: var(--shadow-paper); }
.stamp { position: absolute; top: -14px; right: -12px; z-index: 1; padding: 5px 12px; border: 3px double var(--color-brand); background: var(--color-bg); color: var(--color-brand); font-family: var(--font-display); font-size: 18px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; transform: rotate(8deg); }

.tags { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 30px; }
.tag { --tag-bg: var(--color-ink); --tag-fg: var(--color-bg); position: relative; display: inline-flex; align-items: center; height: 24px; padding: 0 10px 0 20px; background: var(--tag-bg); color: var(--tag-fg); clip-path: polygon(9px 0, 100% 0, 100% 100%, 9px 100%, 0 50%); font-family: var(--font-display); font-size: 11px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; white-space: nowrap; }
.tag::before { content: ''; position: absolute; top: 50%; left: 9px; width: 4px; height: 4px; margin-top: -2px; border-radius: 50%; background: var(--tag-fg); }
.tag--live { --tag-bg: var(--color-live); --tag-fg: var(--color-on-status); }
.tag--building { --tag-bg: var(--color-building); --tag-fg: var(--color-on-status); }
.tag--oss { --tag-bg: var(--color-oss); --tag-fg: var(--color-on-status); }
.tag--plain { --tag-bg: var(--color-surface-2); --tag-fg: var(--color-ink-2); }

.rail h1 { margin-top: 12px; font-family: var(--font-display); font-variation-settings: 'SOFT' 30, 'WONK' 1; font-size: 60px; font-weight: 400; letter-spacing: -0.015em; line-height: 0.98; }
.standfirst { margin-top: 12px; color: var(--color-ink-2); font-size: 20px; line-height: 1.4; }

.actions { display: flex; flex-direction: column; gap: 10px; margin-top: 24px; }
.btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; height: 44px; padding: 0 20px; border: 1px solid var(--color-rule-strong); background: transparent; color: var(--color-ink); font-family: var(--font-display); font-size: 15px; font-weight: 600; white-space: nowrap; }
.btn:hover { background: var(--color-surface-2); }
.btn--primary { background: var(--color-ink); color: var(--color-bg); box-shadow: var(--shadow-paper); }
.btn--primary:hover { background: var(--color-ink-2); }
.btn--brand { border-color: var(--color-brand); background: var(--color-brand); color: var(--color-on-brand); box-shadow: var(--shadow-paper); }
.btn--brand:hover { opacity: 0.9; }

.facts { margin-top: 30px; border-top: 2px solid var(--color-rule-strong); }
.facts > div { display: grid; grid-template-columns: 80px minmax(0, 1fr); gap: 12px; padding: 9px 0; border-bottom: 1px solid var(--color-rule); }
.facts dt { padding-top: 3px; color: var(--color-ink-3); }
.facts dd { font-family: var(--font-display); font-size: 16px; font-weight: 600; line-height: 1.3; overflow-wrap: anywhere; }
.facts dd.mono { padding-top: 3px; font-size: 13px; }
.facts dd a { border-bottom: 1px solid var(--color-rule-strong); }
.facts dd a:hover { color: var(--color-brand); border-color: var(--color-brand); }

.pinned { position: sticky; top: 24px; margin-top: 36px; }
.toc h2 { padding-bottom: 8px; border-bottom: 2px solid var(--color-rule-strong); color: var(--color-ink-3); }
.toc ol { padding: 0; list-style: none; counter-reset: toc; }
.toc li a { display: grid; grid-template-columns: 3ch 1fr; gap: 10px; padding: 7px 0; border-bottom: 1px solid var(--color-rule); font-size: 16px; }
.toc li a::before { counter-increment: toc; content: '§' counter(toc); padding-top: 2px; color: var(--color-brand); font-family: var(--font-display); font-size: 12px; font-weight: 600; letter-spacing: 0.06em; }
.toc li a:hover { color: var(--color-brand); }

.notice { position: relative; margin-top: 28px; padding: 20px 22px; border: 1px solid var(--color-rule-strong); outline: 1px solid var(--color-rule-strong); outline-offset: 3px; background: var(--color-surface); }
.notice .kicker { color: var(--color-brand); }
.notice h2 { margin: 2px 0 8px; font-family: var(--font-display); font-variation-settings: 'WONK' 1; font-size: 28px; font-weight: 400; letter-spacing: -0.01em; line-height: 1.1; }
.notice p { margin-bottom: 16px; color: var(--color-ink-2); font-size: 16px; }

.rail-links { display: flex; flex-wrap: wrap; gap: 6px 18px; margin-top: 26px; color: var(--color-ink-3); }
.rail-links a { border-bottom: 1px solid var(--color-rule-strong); }
.rail-links a:hover { color: var(--color-brand); border-color: var(--color-brand); }

.body { padding: 28px 0 72px; }
.running { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 8px 24px; padding-bottom: 14px; border-bottom: 1px solid var(--color-rule); color: var(--color-ink-3); }
.running b { color: var(--color-brand); }

.row { display: grid; grid-template-columns: 200px minmax(0, 66ch); gap: 0 44px; padding: 30px 0 14px; }
.row + .row { border-top: 1px solid var(--color-rule-strong); }
.row > .margin { position: sticky; top: 24px; align-self: start; }
.row .num { display: block; margin-bottom: 6px; color: var(--color-brand); }
.row h2 { font-family: var(--font-display); font-variation-settings: 'WONK' 1; font-size: 26px; font-weight: 500; letter-spacing: -0.01em; line-height: 1.2; text-wrap: balance; }
.row .kicker { color: var(--color-ink-3); }

.lead { font-size: 23px; line-height: 1.45; color: var(--color-ink-2); }
.lead strong { color: var(--color-ink); font-weight: 600; }
.prose p, .prose ul { margin: 0 0 1em; color: var(--color-ink-2); }
.prose > :last-child { margin-bottom: 0; }
.prose strong { color: var(--color-ink); font-weight: 600; }
.prose ul { padding-left: 1.4em; list-style: none; }
.prose li { margin: 0.5em 0; }
.prose li::before { content: '—'; margin: 0 0.5em 0 -1.4em; color: var(--color-brand); }
.prose a { color: var(--color-brand); text-decoration: underline; text-decoration-color: color-mix(in srgb, var(--color-brand) 40%, transparent); text-underline-offset: 3px; }
.prose a:hover { text-decoration-color: var(--color-brand); }
.prose code { padding: 0.1em 0.35em; border: 1px solid var(--color-rule); background: var(--color-surface); font: 0.85em/1.5 var(--font-mono); }

.foot { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 12px; padding: 18px 0 48px; border-top: 3px double var(--color-rule-strong); color: var(--color-ink-3); font-size: 14px; font-style: italic; }
.foot a { text-decoration: underline; text-underline-offset: 3px; }
.foot a:hover { color: var(--color-brand); }

@media (min-width: 1700px) {
  .page { grid-template-columns: 440px minmax(0, 1fr); gap: 0 110px; }
  .plate img { width: 208px; height: 208px; }
  .rail h1 { font-size: 68px; }
  .row { grid-template-columns: 280px minmax(0, 70ch); gap: 0 56px; }
}

@media (max-width: 1099px) {
  .page { grid-template-columns: minmax(0, 1fr); }
  .rail { padding: 20px 0 28px; border-right: 0; border-bottom: 1px solid var(--color-rule-strong); }
  .rail-main { display: grid; grid-template-columns: 220px minmax(0, 1fr); gap: 0 32px; align-items: start; }
  .plate { margin-top: 26px; }
  .plate img { width: 128px; height: 128px; border-radius: 20px; }
  .rail h1 { font-size: 52px; }
  .actions { flex-flow: row wrap; }
  .facts { grid-column: 1 / -1; display: grid; grid-template-columns: 1fr 1fr; gap: 0 32px; }
  .pinned { position: static; margin-top: 24px; display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 0 32px; align-items: start; }
  .notice { margin-top: 0; }
  .rail-links { grid-column: 1 / -1; }
  .body { padding-top: 20px; }
  .row { grid-template-columns: minmax(0, 1fr); gap: 10px 0; }
  .row > .margin { position: static; }
  .row .num { display: inline; margin-right: 10px; }
}

@media (max-width: 759px) {
  .rail-main { grid-template-columns: minmax(0, 1fr); }
  .plate { width: 150px; aspect-ratio: 1; margin-top: 22px; }
  .plate img { width: 96px; height: 96px; border-radius: 16px; }
  .stamp { top: -12px; right: -14px; font-size: 13px; }
  .rail h1 { font-size: 46px; }
  .standfirst { font-size: 18px; }
  .facts { grid-template-columns: 1fr; }
  .pinned { grid-template-columns: minmax(0, 1fr); }
  .notice { margin-top: 22px; }
  .lead { font-size: 20px; }
  .row h2 { font-size: 24px; }
  .foot { flex-direction: column; }
}
"""

DOSSIER_BODY = """
<body>
<div class="wrap page">
  <aside class="rail">
    <div class="rail-top">
      <a class="brand" href="/" aria-label="MaksForge home"><img src="[[logo]]" alt="" width="28" height="28"><span>MaksForge</span></a>
      <a class="back" href="/#live">← All apps</a>
    </div>
    <div class="rail-main">
      <div class="plate">
        <img src="[[icon]]" alt="" width="176" height="176">
        <span class="stamp" aria-hidden="true">Free</span>
      </div>
      <div>
        <div class="tags"><span class="tag tag--[[status]]">[[status_label]]</span><span class="tag tag--plain">[[kind]]</span></div>
        <h1>[[name]]</h1>
        <p class="standfirst">[[desc]]</p>
        <div class="actions">
[[buttons]]
        </div>
      </div>
      <dl class="facts">
[[facts]]
      </dl>
    </div>
    <div class="pinned">
      <nav class="toc" aria-label="On this page">
        <h2 class="sc">Contents</h2>
        <ol>
[[toc]]
        </ol>
      </nav>
      <aside class="notice">
        <p class="kicker sc">Notice</p>
        <h2>Like what I make?</h2>
        <p>The apps stay free. Tips are optional and very appreciated.</p>
        <a class="btn btn--brand" href="[[bmc]]">Buy me a coffee</a>
      </aside>
      <p class="rail-links sc"><a href="privacy-policy">Privacy policy</a><a href="https://github.com/[[repo]]">Source</a><a href="[[bmc]]">Support</a></p>
    </div>
  </aside>

  <main class="body">
    <p class="running sc"><span>maksforge.com <b>/</b> [[slug]]</span><span>[[kind]] · [[status_label]] · Free</span></p>
    <article>
      <div class="row">
        <div class="margin"><span class="kicker sc">In brief</span></div>
        <div class="prose"><p class="lead">[[lead]]</p>[[intro]]</div>
      </div>
[[sections]]
    </article>
  </main>
</div>
<footer class="wrap"><div class="foot">
  <span>© 2026 Maksymilian Średniawa · <a href="/">MaksForge</a></span>
  <span><a href="privacy-policy">Privacy policy</a> · <a href="[[bmc]]">Buy me a coffee</a></span>
</div></footer>
</body>
</html>
"""


def render_dossier(app):
    sections = '\n'.join(
        f'<section class="row" id="{sid}"><div class="margin"><span class="num sc">§{i}</span><h2>{title}</h2></div><div class="prose">{body}</div></section>'
        for i, (sid, title, body) in enumerate(app['sections'], 1))
    toc = '\n'.join(f'<li><a href="#{sid}">{title}</a></li>' for sid, title, _ in app['sections'])
    return head(app, 'Dossier', DOSSIER_CSS) + fill(
        DOSSIER_BODY, logo=LOGO, icon=f'{ICONS}/{app["icon"]}', bmc=BMC,
        buttons=store_buttons(app, 'btn btn--primary', 'btn'), facts=facts(app), toc=toc, sections=sections, **{k: v for k, v in app.items() if isinstance(v, str) and k != 'icon'})


MANUAL_LINKS = '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Condensed:wght@200;300;500;600;700&family=IBM+Plex+Serif:ital,wght@0,400;0,500;0,600;1,400&display=swap">'

MANUAL_CSS = """
:root {
  --font-display: 'IBM Plex Sans Condensed', 'Arial Narrow', sans-serif-condensed, sans-serif;
  --font-text: 'IBM Plex Serif', Georgia, serif;
}
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; background: var(--color-bg); color: var(--color-ink); font: 18px/1.6 var(--font-text); }
a { color: inherit; text-decoration: none; }
img { display: block; }
h1, h2, h3, p, dl, dd, ul, ol { margin: 0; }
.mono { font-family: var(--font-mono); font-size: 12px; font-weight: 500; letter-spacing: 0.06em; text-transform: uppercase; }
.wrap { max-width: var(--layout-max); margin: 0 auto; padding: 0 var(--layout-gutter); }

.topline { border-bottom: 1px solid var(--color-rule); }
.topline .wrap { display: flex; align-items: center; justify-content: space-between; gap: 24px; height: 44px; }
.crumb { display: flex; align-items: center; gap: 10px; color: var(--color-ink-3); }
.crumb img { width: 22px; height: 22px; border-radius: 2px; }
.crumb a { color: var(--color-ink); }
.crumb a:hover, .topline nav a:hover { color: var(--color-brand); }
.topline nav { display: flex; gap: 22px; }
.topline nav .cta { color: var(--color-brand); }

.cover { --color-bg: var(--color-band-dark); --color-ink: var(--color-on-band-dark); --color-ink-2: color-mix(in srgb, var(--color-on-band-dark) 80%, transparent); --color-ink-3: color-mix(in srgb, var(--color-on-band-dark) 62%, transparent); --color-rule: color-mix(in srgb, var(--color-on-band-dark) 22%, transparent); --color-rule-strong: var(--color-on-band-dark); --color-brand: var(--mf-brand-bright); --color-on-brand: var(--mf-brand-night); background: var(--color-band-dark); color: var(--color-ink); border-top: 8px solid var(--status); }
.cover .wrap { display: grid; grid-template-columns: 220px minmax(0, 1fr) auto; gap: 24px 56px; align-items: end; padding-top: 52px; padding-bottom: 36px; }
.cover .icon { position: relative; align-self: start; }
.cover .icon img { width: 220px; height: 220px; border: 1px solid var(--color-rule); border-radius: 32px; }
.stamp { position: absolute; top: -16px; right: -18px; z-index: 1; padding: 5px 12px; border: 3px double var(--color-brand); background: var(--color-bg); color: var(--color-brand); font-family: var(--font-display); font-size: 18px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; transform: rotate(8deg); }
.tags { display: flex; flex-wrap: wrap; gap: 6px 20px; color: var(--color-ink-3); }
.tags .status { color: var(--status-on-dark); }
.tags span::before { content: ''; display: inline-block; width: 8px; height: 8px; margin: 0 8px 1px 0; background: currentColor; }
.cover h1 { margin: 14px 0 0 -0.03em; font-family: var(--font-display); font-size: clamp(64px, 8.6vw, 150px); font-weight: 700; letter-spacing: -0.015em; line-height: 0.88; text-transform: uppercase; }
.standfirst { max-width: 40ch; margin-top: 22px; color: var(--color-ink-2); font-size: 24px; line-height: 1.35; }
.actions { display: flex; flex-direction: column; gap: 10px; min-width: 220px; }
.btn { display: inline-flex; align-items: center; justify-content: center; height: 46px; padding: 0 22px; border: 1px solid var(--color-rule-strong); color: var(--color-ink); font-family: var(--font-display); font-size: 17px; font-weight: 600; letter-spacing: 0.02em; text-transform: uppercase; white-space: nowrap; }
.btn:hover { background: color-mix(in srgb, var(--color-ink) 10%, transparent); }
.btn--primary { background: var(--color-ink); color: var(--color-bg); }
.btn--primary:hover { background: var(--color-ink-2); }
.btn--brand { border-color: var(--color-brand); background: var(--color-brand); color: var(--color-on-brand); }
.btn--brand:hover { opacity: 0.9; }
.contents { grid-column: 1 / -1; display: flex; flex-wrap: wrap; align-items: baseline; gap: 10px 32px; padding-top: 18px; border-top: 1px solid var(--color-rule); }
.contents .label { color: var(--color-ink-3); }
.contents a { display: inline-flex; align-items: baseline; gap: 8px; font-family: var(--font-display); font-size: 17px; font-weight: 500; }
.contents a b { color: var(--color-brand); font-family: var(--font-mono); font-size: 12px; font-weight: 500; }
.contents a:hover { color: var(--color-brand); }

.row { border-top: 1px solid var(--color-rule-strong); }
.row .wrap { display: grid; grid-template-columns: 96px 240px minmax(0, 1fr); gap: 0 40px; padding-top: 36px; padding-bottom: 44px; }
.row .head { display: contents; }
.num { color: var(--color-brand); font-family: var(--font-display); font-size: 76px; font-weight: 200; font-variant-numeric: tabular-nums; letter-spacing: -0.04em; line-height: 0.8; }
.row h2 { padding-top: 4px; font-family: var(--font-display); font-size: 34px; font-weight: 600; letter-spacing: -0.01em; line-height: 1.05; text-wrap: balance; }
.body { max-width: 68ch; }
.body p, .body ul { margin: 0 0 1em; color: var(--color-ink-2); }
.body > :last-child { margin-bottom: 0; }
.body strong { color: var(--color-ink); font-weight: 600; }
.body ul { padding-left: 1.3em; list-style: none; }
.body li { margin: 0.5em 0; }
.body li::before { content: ''; display: inline-block; width: 8px; height: 8px; margin: 0 0.6em 2px -1.3em; background: var(--color-brand); }
.body a { color: var(--color-brand); text-decoration: underline; text-decoration-color: color-mix(in srgb, var(--color-brand) 40%, transparent); text-underline-offset: 3px; }
.body a:hover { text-decoration-color: var(--color-brand); }
.body code { padding: 0.1em 0.35em; border: 1px solid var(--color-rule); background: var(--color-surface); font: 0.85em/1.5 var(--font-mono); }
.body a.btn { color: var(--color-on-brand); text-decoration: none; }
.lead { font-size: 23px; line-height: 1.45; }
.glance .body { max-width: none; }
.glance .body > p { max-width: 68ch; }
.notes { display: none; color: var(--color-ink-3); font-size: 15px; font-style: italic; line-height: 1.5; }
.notes a { text-decoration: underline; text-underline-offset: 3px; }
.notes a:hover { color: var(--color-brand); }

.glance { background: var(--color-surface); }
.glance .wrap { padding-bottom: 36px; }
.facts { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px 32px; margin-top: 28px; }
.facts dt { padding-bottom: 6px; border-bottom: 1px solid var(--color-rule-strong); color: var(--color-ink-3); }
.facts dd { margin-top: 8px; font-family: var(--font-display); font-size: 21px; font-weight: 600; line-height: 1.2; overflow-wrap: anywhere; }
.facts dd.mono { font-family: var(--font-mono); font-size: 13px; font-weight: 500; letter-spacing: 0; text-transform: none; }
.facts dd a { border-bottom: 1px solid var(--color-rule-strong); }
.facts dd a:hover { color: var(--color-brand); border-color: var(--color-brand); }

.tip h2 { font-weight: 300; }
.tip .body p { font-size: 20px; }
.tip .body .btn { margin-top: 4px; }
.tip .back { color: var(--color-ink-3); font-style: italic; }
.tip .back:hover { color: var(--color-brand); }

.foot { border-top: 1px solid var(--color-rule-strong); }
.foot .wrap { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 10px 24px; padding-top: 18px; padding-bottom: 48px; color: var(--color-ink-3); }
.foot a:hover { color: var(--color-brand); }

@media (min-width: 1700px) {
  .row .wrap { grid-template-columns: 120px 300px minmax(0, 1fr) 320px; gap: 0 48px; }
  .notes { display: block; }
  .body { max-width: 72ch; }
  .cover .wrap { grid-template-columns: 260px minmax(0, 1fr) auto; }
  .cover .icon img { width: 260px; height: 260px; }
}

@media (max-width: 1099px) {
  .cover .wrap { grid-template-columns: 140px minmax(0, 1fr); align-items: start; }
  .cover .icon img { width: 140px; height: 140px; border-radius: 22px; }
  .actions { grid-column: 1 / -1; flex-flow: row wrap; }
  .row .wrap { grid-template-columns: 72px minmax(0, 1fr); gap: 16px 28px; }
  .num { font-size: 56px; }
  .row .body, .row .notes { grid-column: 2; }
}

@media (max-width: 759px) {
  .topline nav a:not(.cta) { display: none; }
  .cover .wrap { grid-template-columns: minmax(0, 1fr); gap: 20px; padding-top: 32px; padding-bottom: 28px; }
  .cover .icon img { width: 96px; height: 96px; border-radius: 16px; }
  .cover .icon { width: 96px; }
  .stamp { top: -12px; right: -16px; font-size: 13px; }
  .cover h1 { font-size: 60px; }
  .standfirst { font-size: 20px; }
  .actions { flex-direction: column; }
  .contents { flex-direction: column; gap: 8px; }
  .row .wrap { grid-template-columns: minmax(0, 1fr); gap: 12px; padding-top: 26px; padding-bottom: 30px; }
  .row .head { display: flex; align-items: baseline; gap: 14px; }
  .num { font-size: 44px; }
  .row h2 { padding-top: 0; font-size: 28px; }
  .row .body, .row .notes { grid-column: 1; }
  .lead { font-size: 20px; }
  .facts { grid-template-columns: 1fr 1fr; }
  .facts > div:has(.mono) { grid-column: 1 / -1; }
  .foot .wrap { flex-direction: column; }
}
"""

MANUAL_BODY = """
<body>
<header class="topline"><div class="wrap">
  <p class="crumb mono"><a href="/" aria-label="MaksForge home"><img src="[[logo]]" alt="" width="22" height="22"></a><a href="/">MaksForge</a><span>/</span><a href="/#live">Apps</a><span>/</span><span>[[slug]]</span></p>
  <nav class="mono" aria-label="[[name]]"><a href="/#live">All apps</a><a href="privacy-policy">Privacy</a><a href="https://github.com/[[repo]]">Source</a><a class="cta" href="[[bmc]]">Support</a></nav>
</div></header>

<section class="cover" style="--status: var(--color-[[status]]); --status-on-dark: var(--[[status_dark]])"><div class="wrap">
  <div class="icon"><img src="[[icon]]" alt="" width="220" height="220"><span class="stamp" aria-hidden="true">Free</span></div>
  <div>
    <p class="tags mono"><span class="status">[[status_label]]</span><span>[[kind]]</span><span>Free, no ads</span></p>
    <h1>[[name]]</h1>
    <p class="standfirst">[[desc]]</p>
  </div>
  <div class="actions">
[[buttons]]
  </div>
  <nav class="contents" aria-label="On this page"><span class="label mono">Contents</span>[[contents]]</nav>
</div></section>

<main>
  <section class="row glance" id="at-a-glance"><div class="wrap">
    <div class="head"><span class="num">00</span><h2>At a glance</h2></div>
    <div class="body"><p class="lead">[[lead]]</p>[[intro]]<dl class="facts">
[[facts]]
    </dl></div>
    <p class="notes">Nothing you record leaves the phone. The three things that happen outside the app are listed in the <a href="privacy-policy">privacy policy</a>.</p>
  </div></section>
[[sections]]
  <section class="row tip"><div class="wrap">
    <div class="head"><span class="num">[[tip_num]]</span><h2>Like what I make?</h2></div>
    <div class="body"><p>The apps stay free. Tips are optional and very appreciated.</p><a class="btn btn--brand" href="[[bmc]]">Buy me a coffee</a></div>
    <p class="notes"><a class="back" href="/#live">← All apps</a></p>
  </div></section>
</main>

<footer class="foot"><div class="wrap mono">
  <span>© 2026 Maksymilian Średniawa · <a href="/">MaksForge</a></span>
  <span><a href="privacy-policy">Privacy policy</a> · <a href="[[bmc]]">Buy me a coffee</a></span>
</div></footer>
</body>
</html>
"""

STATUS_DARK = {'live': 'mf-green-bright', 'building': 'mf-amber-bright', 'oss': 'mf-blue-bright'}


def render_manual(app):
    n = len(app['sections'])
    sections = '\n'.join(
        f'<section class="row" id="{sid}"><div class="wrap"><div class="head"><span class="num">{i:02d}</span><h2>{title}</h2></div><div class="body">{body}</div></div></section>'
        for i, (sid, title, body) in enumerate(app['sections'], 1))
    contents = ''.join(f'<a href="#{sid}"><b>{i:02d}</b>{title}</a>' for i, (sid, title, _) in enumerate(app['sections'], 1))
    return head(app, 'Manual', MANUAL_CSS, MANUAL_LINKS) + fill(
        MANUAL_BODY, logo=LOGO, icon=f'{ICONS}/{app["icon"]}', bmc=BMC, status_dark=STATUS_DARK[app['status']],
        buttons=store_buttons(app, 'btn btn--primary', 'btn'), facts=facts(app), contents=contents,
        sections=sections, tip_num=f'{n + 1:02d}',
        **{k: v for k, v in app.items() if isinstance(v, str) and k != 'icon'})


LEAFLET_LINKS = '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Alegreya:ital,wght@0,400;0,500;0,700;1,400;1,500&family=Alegreya+Sans:ital,wght@0,400;0,500;0,700;1,400&family=Alegreya+Sans+SC:wght@500;700&display=swap">'

LEAFLET_CSS = """
:root {
  --font-display: 'Alegreya', Georgia, serif;
  --font-text: 'Alegreya Sans', 'Gill Sans', Calibri, sans-serif;
  --font-caps: 'Alegreya Sans SC', 'Alegreya Sans', sans-serif;
}
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; background: var(--color-bg); color: var(--color-ink); font: 18px/1.5 var(--font-text); }
a { color: inherit; text-decoration: none; }
img { display: block; }
h1, h2, h3, p, dl, dd, ul, ol { margin: 0; }
.caps { font-family: var(--font-caps); font-size: 15px; font-weight: 700; letter-spacing: 0.08em; text-transform: lowercase; }
.mono { font-family: var(--font-mono); font-size: 14px; font-weight: 500; }
.wrap { max-width: var(--layout-max); margin: 0 auto; padding: 0 var(--layout-gutter); }

.front { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); border-bottom: 3px double var(--color-rule-strong); }
.panel { padding: 28px 40px 36px 0; }
.panel + .panel { padding-left: 40px; border-left: 1px solid var(--color-rule); }
.panel:last-child { padding-right: 0; }

.brandline { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding-bottom: 12px; border-bottom: 1px solid var(--color-rule-strong); }
.brand { display: flex; align-items: center; gap: 10px; font-family: var(--font-display); font-size: 22px; font-weight: 500; letter-spacing: -0.01em; }
.brand img { width: 26px; height: 26px; border-radius: 3px; }
.brandline .caps a:hover, .brandline .caps a { color: var(--color-ink-3); }
.brandline .caps a:hover { color: var(--color-brand); }

.cover .icon { position: relative; display: inline-block; margin-top: 30px; }
.cover .icon img { width: 150px; height: 150px; border: 1px solid var(--color-rule-strong); border-radius: 22px; background: var(--color-surface); box-shadow: var(--shadow-paper); }
.stamp { position: absolute; top: -14px; right: -22px; z-index: 1; padding: 4px 11px; border: 3px double var(--color-brand); background: var(--color-bg); color: var(--color-brand); font-family: var(--font-caps); font-size: 20px; font-weight: 700; letter-spacing: 0.1em; transform: rotate(8deg); }
.tags { display: flex; flex-wrap: wrap; gap: 6px 18px; margin-top: 26px; color: var(--color-ink-3); }
.tags .status { color: var(--color-[[status]]); }
.tags span::before { content: '●'; margin-right: 8px; font-size: 10px; vertical-align: 2px; }
.cover h1 { margin-top: 8px; font-family: var(--font-display); font-size: 76px; font-weight: 400; letter-spacing: -0.015em; line-height: 0.95; }
.standfirst { margin-top: 14px; color: var(--color-ink-2); font-family: var(--font-display); font-size: 24px; font-style: italic; line-height: 1.3; }
.actions { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 26px; }
.btn { display: inline-flex; align-items: center; justify-content: center; height: 44px; padding: 0 20px; border: 1px solid var(--color-rule-strong); color: var(--color-ink); font-family: var(--font-caps); font-size: 17px; font-weight: 700; letter-spacing: 0.06em; white-space: nowrap; }
.btn:hover { background: var(--color-surface-2); }
.btn--primary { background: var(--color-ink); color: var(--color-bg); box-shadow: var(--shadow-paper); }
.btn--primary:hover { background: var(--color-ink-2); }
.btn--brand { border-color: var(--color-brand); background: var(--color-brand); color: var(--color-on-brand); }
.btn--brand:hover { opacity: 0.9; }

.panel h2 { padding: 8px 0 8px; border-bottom: 1px solid var(--color-rule-strong); color: var(--color-ink-3); }
.lead { margin-top: 18px; font-size: 21px; line-height: 1.45; color: var(--color-ink-2); }
.lead strong { color: var(--color-ink); font-weight: 700; }
.intro { margin-top: 12px; color: var(--color-ink-2); }
.facts { margin-top: 20px; }
.facts > div { display: grid; grid-template-columns: 82px minmax(0, 1fr); gap: 12px; padding: 8px 0; border-bottom: 1px solid var(--color-rule); }
.facts dt { padding-top: 2px; color: var(--color-ink-3); }
.facts dd { font-weight: 500; line-height: 1.35; overflow-wrap: anywhere; }
.facts dd.mono { padding-top: 3px; font-size: 13px; }
.facts dd a { border-bottom: 1px solid var(--color-rule-strong); }
.facts dd a:hover { color: var(--color-brand); border-color: var(--color-brand); }

.toc ol { margin: 6px 0 0; padding: 0; list-style: none; counter-reset: toc; }
.toc li a { display: grid; grid-template-columns: 2.2ch 1fr; gap: 10px; padding: 7px 0; border-bottom: 1px solid var(--color-rule); font-family: var(--font-display); font-size: 19px; }
.toc li a::before { counter-increment: toc; content: counter(toc); color: var(--color-brand); font-family: var(--font-display); font-style: italic; }
.toc li a:hover { color: var(--color-brand); }
.notice { position: relative; margin-top: 30px; padding: 20px 22px; border: 1px solid var(--color-rule-strong); outline: 1px solid var(--color-rule-strong); outline-offset: 3px; background: var(--color-surface); }
.notice .kicker { color: var(--color-brand); }
.notice h3 { margin: 2px 0 8px; font-family: var(--font-display); font-size: 30px; font-weight: 400; line-height: 1.1; }
.notice p { margin-bottom: 16px; color: var(--color-ink-2); }
.links { display: flex; flex-wrap: wrap; gap: 6px 18px; margin-top: 24px; color: var(--color-ink-3); }
.links a { border-bottom: 1px solid var(--color-rule-strong); }
.links a:hover { color: var(--color-brand); border-color: var(--color-brand); }

.pages { padding: 36px 0 48px; column-count: 3; column-gap: 72px; column-rule: 1px solid var(--color-rule); }
.pages section { margin-bottom: 34px; }
.pages h2, .pages .num { break-after: avoid; }
.pages li, .pages p { orphans: 3; widows: 3; }
.pages li { break-inside: avoid; }
.pages .num { display: block; color: var(--color-brand); }
.pages h2 { margin: 2px 0 10px; font-family: var(--font-display); font-size: 31px; font-weight: 500; letter-spacing: -0.01em; line-height: 1.1; }
.pages p, .pages ul { margin: 0 0 0.9em; color: var(--color-ink-2); }
.pages strong { color: var(--color-ink); font-weight: 700; }
.pages ul { padding-left: 1.2em; list-style: none; }
.pages li { margin: 0.45em 0; }
.pages li::before { content: '—'; margin: 0 0.45em 0 -1.2em; color: var(--color-brand); }
.pages a { color: var(--color-brand); text-decoration: underline; text-decoration-color: color-mix(in srgb, var(--color-brand) 40%, transparent); text-underline-offset: 3px; }
.pages a:hover { text-decoration-color: var(--color-brand); }
.pages code { padding: 0.1em 0.35em; border: 1px solid var(--color-rule); background: var(--color-surface); font: 0.85em/1.5 var(--font-mono); }

.foot { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 10px 24px; padding: 16px 0 48px; border-top: 1px solid var(--color-rule-strong); color: var(--color-ink-3); font-style: italic; }
.foot a { text-decoration: underline; text-underline-offset: 3px; }
.foot a:hover { color: var(--color-brand); }

@media (min-width: 1700px) {
  .front { grid-template-columns: repeat(4, minmax(0, 1fr)); }
  .cover { grid-column: span 2; }
  .cover h1 { font-size: 112px; }
  .cover .icon img { width: 176px; height: 176px; border-radius: 26px; }
  .pages { column-count: 4; column-gap: 64px; }
}

@media (max-width: 1099px) {
  .front { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .cover { grid-column: 1 / -1; padding-right: 0; }
  .cover .icon { float: right; margin: 26px 0 16px 24px; }
  .glance { padding-left: 0; border-left: 0; }
  .cover h1 { font-size: 64px; }
  .pages { column-count: 2; column-gap: 48px; }
}

@media (max-width: 759px) {
  .front { grid-template-columns: minmax(0, 1fr); }
  .panel { padding: 22px 0 28px; }
  .panel + .panel { padding-left: 0; border-left: 0; border-top: 1px solid var(--color-rule); }
  .cover .icon { float: none; margin: 24px 0 0; }
  .cover .icon img { width: 110px; height: 110px; border-radius: 16px; }
  .stamp { top: -12px; right: -18px; font-size: 14px; }
  .cover h1 { font-size: 54px; }
  .standfirst { font-size: 21px; }
  .pages { column-count: 1; padding-top: 28px; }
  .pages h2 { font-size: 28px; }
  .foot { flex-direction: column; }
}
"""

LEAFLET_BODY = """
<body>
<div class="wrap">
  <header class="front">
    <div class="panel cover">
      <div class="brandline">
        <a class="brand" href="/" aria-label="MaksForge home"><img src="[[logo]]" alt="" width="26" height="26"><span>MaksForge</span></a>
        <span class="caps"><a href="/#live">← All apps</a></span>
      </div>
      <div class="icon"><img src="[[icon]]" alt="" width="150" height="150"><span class="stamp" aria-hidden="true">Free</span></div>
      <p class="tags caps"><span class="status">[[status_label]]</span><span>[[kind]]</span></p>
      <h1>[[name]]</h1>
      <p class="standfirst">[[desc]]</p>
      <div class="actions">
[[buttons]]
      </div>
    </div>
    <div class="panel glance">
      <h2 class="caps">At a glance</h2>
      <p class="lead">[[lead]]</p>
      <div class="intro">[[intro]]</div>
      <dl class="facts">
[[facts]]
      </dl>
    </div>
    <div class="panel side">
      <nav class="toc" aria-label="On this page">
        <h2 class="caps">Contents</h2>
        <ol>
[[toc]]
        </ol>
      </nav>
      <aside class="notice">
        <p class="kicker caps">Notice</p>
        <h3>Like what I make?</h3>
        <p>The apps stay free. Tips are optional and very appreciated.</p>
        <a class="btn btn--brand" href="[[bmc]]">Buy me a coffee</a>
      </aside>
      <p class="links caps"><a href="privacy-policy">Privacy policy</a><a href="https://github.com/[[repo]]">Source</a><a href="[[bmc]]">Support</a></p>
    </div>
  </header>

  <main class="pages">
[[sections]]
  </main>

  <footer class="foot">
    <span>© 2026 Maksymilian Średniawa · <a href="/">MaksForge</a></span>
    <span><a href="privacy-policy">Privacy policy</a> · <a href="[[bmc]]">Buy me a coffee</a></span>
  </footer>
</div>
</body>
</html>
"""


def render_leaflet(app):
    sections = '\n'.join(
        f'<section id="{sid}"><span class="num caps">{i}</span><h2>{title}</h2>{body}</section>'
        for i, (sid, title, body) in enumerate(app['sections'], 1))
    toc = '\n'.join(f'<li><a href="#{sid}">{title}</a></li>' for sid, title, _ in app['sections'])
    return head(app, 'Leaflet', fill(LEAFLET_CSS, status=app['status']), LEAFLET_LINKS) + fill(
        LEAFLET_BODY, logo=LOGO, icon=f'{ICONS}/{app["icon"]}', bmc=BMC,
        buttons=store_buttons(app, 'btn btn--primary', 'btn'), facts=facts(app), toc=toc, sections=sections, **{k: v for k, v in app.items() if isinstance(v, str) and k != 'icon'})


DIRECTIONS = {'dossier': render_dossier, 'manual': render_manual, 'leaflet': render_leaflet}

if __name__ == '__main__':
    for slug, render in DIRECTIONS.items():
        folder = HERE / slug
        folder.mkdir(exist_ok=True)
        (folder / 'index.html').write_text(render(APPS['binky-app']))
        (folder / 'kozica.html').write_text(render(APPS['kozica']))
        print('wrote', folder)
