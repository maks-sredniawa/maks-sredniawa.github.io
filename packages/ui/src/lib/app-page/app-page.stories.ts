import type { Meta, StoryObj } from '@storybook/angular';

// pages-theme's _layouts/default.html around sample prose, so app-page.css has visual baselines.
const topbar = `
  <header class="mf-topbar">
    <div class="mf-wrap">
      <a class="mf-topbar__brand" href="#" aria-label="MaksForge home">
        <img src="icons/sample.svg" alt="" width="34" height="34" />
        <span>MaksForge</span>
      </a>
      <nav aria-label="Kozica">
        <a href="#">All apps</a>
        <a href="#">Privacy</a>
        <a href="#">Source</a>
        <a class="mf-topbar__cta" href="#">Support</a>
      </nav>
    </div>
  </header>
`;

const actions = `
  <div class="mf-app-head__actions">
    <a class="mf-btn mf-btn--primary mf-btn--raised" href="#">Google Play</a>
    <a class="mf-btn" href="#">Source on GitHub</a>
  </div>
`;

const homeHead = `
  <section class="mf-app-head">
    <div class="mf-wrap">
      <div class="mf-app-head__icon">
        <img src="icons/sample.svg" alt="" width="150" height="150" />
        <span class="mf-stamp" aria-hidden="true">Free</span>
      </div>
      <div>
        <div class="mf-app-head__tags"><span class="mf-tag mf-tag--live">Live</span></div>
        <h1 class="mf-display">Kozica</h1>
        <p class="mf-app-head__standfirst">An offline hiking map of the Polish mountains.</p>
      </div>
      ${actions}
    </div>
  </section>
  <section class="mf-spec">
    <dl class="mf-wrap">
      <div><dt class="mf-sc">Status</dt><dd>Live</dd></div>
      <div><dt class="mf-sc">Price</dt><dd>Free, no ads</dd></div>
      <div><dt class="mf-sc">Package</dt><dd class="mf-mono">com.maksforge.kozica</dd></div>
      <div><dt class="mf-sc">Source</dt><dd class="mf-mono"><a href="#">maks-sredniawa/kozica</a></dd></div>
      <div><dt class="mf-sc">Privacy</dt><dd><a href="#">Privacy policy</a></dd></div>
    </dl>
  </section>
`;

const compactHead = `
  <section class="mf-app-head mf-app-head--compact">
    <div class="mf-wrap">
      <div class="mf-app-head__icon">
        <img src="icons/sample.svg" alt="" width="150" height="150" />
      </div>
      <div>
        <div class="mf-app-head__tags"><span class="mf-tag mf-tag--live">Live</span></div>
        <p class="mf-app-head__name"><a href="#">Kozica</a></p>
      </div>
      ${actions}
    </div>
  </section>
`;

const side = (contents: string[][]): string => `
  <div class="mf-app-side">
    <nav class="mf-toc" aria-label="On this page">
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
    <a class="mf-app-side__back" href="#">← All apps</a>
  </div>
`;

const foot = `
  <footer class="mf-app-foot">
    <div class="mf-wrap">
      <span>© 2026 Maksymilian Średniawa · <a href="#">MaksForge</a></span>
      <span><a href="#">Privacy policy</a> · <a href="#">Buy me a coffee</a></span>
    </div>
  </footer>
`;

function page(head: string, prose: string, contents: string[][]): string {
  return `
    ${topbar}
    <main>
      ${head}
      <section class="mf-app-body">
        <div class="mf-wrap">
          <article class="mf-prose">${prose}</article>
          ${side(contents)}
        </div>
      </section>
    </main>
    ${foot}
  `;
}

const meta: Meta = {
  title: 'App page',
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj;

// The theme hides the home page's h1 with CSS; hidden stands in for it here.
export const Home: Story = {
  render: () => ({
    template: page(
      homeHead,
      `
        <h1 hidden>Kozica</h1>
        <p><strong>A hiking map that works with no signal at all.</strong> Free, ad-free, and
        entirely on your own phone.</p>
        <h2 id="what-it-does">What it does</h2>
        <ul>
          <li><strong>Trails in their signpost colours</strong>, each with its symbol along the line.</li>
          <li><strong>Huts, peaks and springs</strong>, found offline.</li>
        </ul>
        <blockquote><p>Nothing leaves the phone.</p></blockquote>
        <h2 id="privacy">Privacy</h2>
        <ol>
          <li>No account.</li>
          <li>No internet permission: <code>android.permission.INTERNET</code> is absent.</li>
        </ol>
        <table>
          <thead><tr><th>Data</th><th>Where it stays</th></tr></thead>
          <tbody><tr><td>Map</td><td>On the phone</td></tr></tbody>
        </table>
      `,
      [
        ['what-it-does', 'What it does'],
        ['privacy', 'Privacy'],
      ],
    ),
  }),
};

export const Subpage: Story = {
  render: () => ({
    template: page(
      compactHead,
      `
        <h1>Privacy Policy</h1>
        <p><em>Last updated: 31 October 2026</em></p>
        <p>Kozica is an Android app for hiking in the Polish mountains. This policy describes what
        the app does with information about you.</p>
        <h2 id="collects-nothing">The app collects nothing</h2>
        <p>It has no internet permission, so it cannot send anything anywhere.</p>
        <hr />
        <h2 id="contact">Contact</h2>
        <p>Questions go to <a href="#">the support address</a>.</p>
      `,
      [
        ['collects-nothing', 'The app collects nothing'],
        ['contact', 'Contact'],
      ],
    ),
  }),
};
