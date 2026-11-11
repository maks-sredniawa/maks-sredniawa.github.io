import type { Meta, StoryObj } from '@storybook/angular';

// pages-theme's _layouts/default.html around sample prose, so sheet.css has visual baselines.
const tabs = (current: 'overview' | 'privacy'): string => `
  <nav class="mf-sheet__tabs" aria-label="Kozica">
    <a class="mf-sheet__back" href="#">← All apps</a>
    <a href="#"${current === 'overview' ? ' aria-current="page"' : ''}>Overview</a>
    <a href="#"${current === 'privacy' ? ' aria-current="page"' : ''}>Privacy policy</a>
  </nav>
`;

const row = (name: string, pitch: string): string => `
  <header class="mf-sheet__row">
    <img class="mf-sheet__icon" src="icons/sample.svg" alt="" width="64" height="64" />
    <div>
      ${name}
      <span class="mf-sheet__kind mf-sc">Android app</span>
    </div>
    ${pitch}
    <div class="mf-sheet__links">
      <a class="mf-link mf-link--go" href="#">Google Play</a>
      <a class="mf-link" href="#">Source</a>
      <span class="mf-mono">com.maksforge.kozica</span>
    </div>
    <span class="mf-sheet__status mf-tag mf-tag--live">Live</span>
  </header>
`;

const toc = (contents: string[][]): string => `
  <nav class="mf-sheet__toc" aria-label="On this page">
    <h2 class="mf-sc">On this page</h2>
    <ol>
      ${contents.map(([id, heading]) => `<li><a href="#${id}">${heading}</a></li>`).join('')}
    </ol>
  </nav>
`;

const meta: Meta = {
  title: 'Sheet',
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj;

export const Home: Story = {
  render: () => ({
    template: `
      <div class="mf-wrap">
        ${tabs('overview')}
        <div class="mf-sheet">
          ${row(
            '<h1 class="mf-sheet__name">Kozica</h1>',
            `<div class="mf-sheet__pitch mf-prose">
              <p><strong>A hiking map that works with no signal at all.</strong> Free, ad-free, and
              entirely on your own phone.</p>
              <p>Trails, huts and springs for the Polish mountains, stored on the device.</p>
            </div>`,
          )}
          <main class="mf-sheet__body mf-prose">
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
          </main>
          ${toc([
            ['what-it-does', 'What it does'],
            ['privacy', 'Privacy'],
          ])}
        </div>
      </div>
    `,
  }),
};

export const Subpage: Story = {
  render: () => ({
    template: `
      <div class="mf-wrap">
        ${tabs('privacy')}
        <div class="mf-sheet">
          ${row(
            '<p class="mf-sheet__name"><a href="#">Kozica</a></p>',
            '<p class="mf-sheet__pitch">An offline hiking map of the Polish mountains.</p>',
          )}
          <main class="mf-sheet__body mf-prose">
            <h1>Privacy Policy</h1>
            <p><em>Last updated: 31 October 2026</em></p>
            <p>Kozica is an Android app for hiking in the Polish mountains.</p>
            <h2 id="collects-nothing">The app collects nothing</h2>
            <p>It has no internet permission, so it cannot send anything anywhere.</p>
            <h2 id="contact">Contact</h2>
            <p>Questions go to <a href="#">the support address</a>.</p>
          </main>
        </div>
      </div>
    `,
  }),
};
