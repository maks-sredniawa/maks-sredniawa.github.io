import type { Meta, StoryObj } from '@storybook/angular';

// pages-theme's _layouts/default.html around sample prose, so dossier.css has visual baselines.
const top = `
  <div class="mf-dossier__top">
    <a class="mf-dossier__brand" href="#" aria-label="MaksForge home">
      <img src="icons/sample.svg" alt="" width="28" height="28" />
      <span>MaksForge</span>
    </a>
    <a class="mf-dossier__back" href="#">← All apps</a>
  </div>
`;

const actions = `
  <div class="mf-dossier__actions">
    <a class="mf-btn mf-btn--primary mf-btn--raised" href="#">Google Play</a>
    <a class="mf-btn" href="#">Source on GitHub</a>
  </div>
`;

const tags = `
  <div class="mf-dossier__tags">
    <span class="mf-tag mf-tag--live">Live</span>
    <span class="mf-tag mf-tag--plain">Android app</span>
  </div>
`;

const running = `
  <p class="mf-dossier__running mf-sc">
    <span>maksforge.com <b>/</b> kozica</span>
    <span>Android app · Live · Free</span>
  </p>
`;

const pinned = (contents: string[][]): string => `
  <div class="mf-dossier__pinned">
    <nav class="mf-dossier__toc" aria-label="On this page">
      <h2 class="mf-sc">Contents</h2>
      <ol>
        ${contents.map(([id, heading]) => `<li><a href="#${id}">${heading}</a></li>`).join('')}
      </ol>
    </nav>
    <aside class="mf-notice">
      <p class="mf-notice__kicker mf-sc">Notice</p>
      <h2>Like what I make?</h2>
      <p>The apps stay free. Tips are optional and very appreciated.</p>
      <div class="mf-notice__actions">
        <a class="mf-btn mf-btn--brand mf-btn--raised" href="#">Buy me a coffee</a>
      </div>
    </aside>
    <nav class="mf-dossier__links mf-sc" aria-label="Kozica">
      <a href="#">Privacy policy</a><a href="#">Source</a><a href="#">Support</a>
    </nav>
  </div>
`;

const foot = `
  <footer class="mf-wrap">
    <div class="mf-dossier__foot">
      <span>© 2026 Maksymilian Średniawa · <a href="#">MaksForge</a></span>
      <span><a href="#">Privacy policy</a> · <a href="#">Buy me a coffee</a></span>
    </div>
  </footer>
`;

const row = (number: number, id: string, heading: string, body: string): string => `
  <section class="mf-dossier__row" id="${id}">
    <div class="mf-dossier__margin">
      <span class="mf-dossier__num mf-sc" aria-hidden="true">§${number}</span>
      <h2>${heading}</h2>
    </div>
    <div class="mf-prose">${body}</div>
  </section>
`;

const meta: Meta = {
  title: 'Dossier',
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj;

// The theme hides the home page's h1 with CSS; hidden stands in for it here.
export const Home: Story = {
  render: () => ({
    template: `
      <div class="mf-wrap mf-dossier">
        <header class="mf-dossier__file">
          ${top}
          <div class="mf-dossier__card">
            <div class="mf-dossier__plate">
              <img src="icons/sample.svg" alt="" width="176" height="176" />
              <span class="mf-stamp" aria-hidden="true">Free</span>
            </div>
            <div>
              ${tags}
              <h1 class="mf-dossier__name">Kozica</h1>
              <p class="mf-dossier__standfirst">An offline hiking map of the Polish mountains.</p>
              ${actions}
            </div>
            <dl class="mf-dossier__facts">
              <div><dt>Status</dt><dd>Live</dd></div>
              <div><dt>Price</dt><dd>Free, no ads</dd></div>
              <div><dt>Package</dt><dd class="mf-mono">com.maksforge.kozica</dd></div>
              <div><dt>Source</dt><dd class="mf-mono"><a href="#">maks-sredniawa/kozica</a></dd></div>
              <div><dt>Privacy</dt><dd><a href="#">Privacy policy</a></dd></div>
            </dl>
          </div>
        </header>
        <main class="mf-dossier__text">
          ${running}
          <article>
            <div class="mf-dossier__row">
              <div class="mf-dossier__margin"><span class="mf-dossier__kicker mf-sc">In brief</span></div>
              <div class="mf-prose">
                <h1 hidden>Kozica</h1>
                <p><strong>A hiking map that works with no signal at all.</strong> Free, ad-free, and
                entirely on your own phone.</p>
                <p>Trails, huts and springs for the Polish mountains, stored on the device.</p>
              </div>
            </div>
            ${row(
              1,
              'what-it-does',
              'What it does',
              `<ul>
                <li><strong>Trails in their signpost colours</strong>, each with its symbol along the line.</li>
                <li><strong>Huts, peaks and springs</strong>, found offline.</li>
              </ul>
              <blockquote><p>Nothing leaves the phone.</p></blockquote>`,
            )}
            ${row(
              2,
              'privacy',
              'Privacy',
              `<ol>
                <li>No account.</li>
                <li>No internet permission: <code>android.permission.INTERNET</code> is absent.</li>
              </ol>
              <table>
                <thead><tr><th>Data</th><th>Where it stays</th></tr></thead>
                <tbody><tr><td>Map</td><td>On the phone</td></tr></tbody>
              </table>`,
            )}
          </article>
        </main>
        ${pinned([
          ['what-it-does', 'What it does'],
          ['privacy', 'Privacy'],
        ])}
      </div>
      ${foot}
    `,
  }),
};

export const Subpage: Story = {
  render: () => ({
    template: `
      <div class="mf-wrap mf-dossier mf-dossier--compact">
        <header class="mf-dossier__file">
          ${top}
          <div class="mf-dossier__card">
            <div class="mf-dossier__plate">
              <img src="icons/sample.svg" alt="" width="76" height="76" />
            </div>
            <div>
              ${tags}
              <p class="mf-dossier__name"><a href="#">Kozica</a></p>
              ${actions}
            </div>
          </div>
        </header>
        <main class="mf-dossier__text">
          ${running}
          <article>
            <div class="mf-dossier__lede mf-prose">
              <h1>Privacy Policy</h1>
              <p><em>Last updated: 31 October 2026</em></p>
              <p>Kozica is an Android app for hiking in the Polish mountains.</p>
            </div>
            ${row(
              1,
              'collects-nothing',
              'The app collects nothing',
              `<p>It has no internet permission, so it cannot send anything anywhere.</p><hr />`,
            )}
            ${row(2, 'contact', 'Contact', `<p>Questions go to <a href="#">the support address</a>.</p>`)}
          </article>
        </main>
        ${pinned([
          ['collects-nothing', 'The app collects nothing'],
          ['contact', 'Contact'],
        ])}
      </div>
      ${foot}
    `,
  }),
};
