import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';
import { Aisle } from '../aisle/aisle';
import { Link } from '../link/link';
import { Pin } from '../pin/pin';
import { Tile } from '../tile/tile';
import { Band } from './band';

type Args = Band;

const meta: Meta<Args> = {
  title: 'Band',
  decorators: [moduleMetadata({ imports: [Band, Aisle, Tile, Link, Pin] })],
  parameters: { layout: 'fullscreen' },
  args: {
    heading: 'In development',
    blurb: 'Being built and tested right now.',
    status: 'building',
    statusLabel: 'Building · 2',
    tone: 'tint',
  },
  argTypes: { tone: { control: 'inline-radio', options: ['plain', 'tint', 'dark'] } },
  render: (args) => ({
    props: args,
    template: `
      <section mfBand [heading]="heading" [blurb]="blurb" [status]="status" [statusLabel]="statusLabel" [tone]="tone">
        <div mfAisle heading="Coming next" note="Not in a store yet.">
          <ul class="mf-tiles">
            <li mfTile iconSrc="icons/sample.svg" heading="Kozica" kind="Android app">
              <p>An offline trail map of the Polish mountains, drawn in the colours of the trail signposts.</p>
              <a mfLink mfTileAction href="#">Website</a>
            </li>
            <li mfTile iconSrc="icons/sample.svg" heading="Darek" kind="Android app">
              <p>A Polish voice assistant that calls your gate opener, offline on the phone.</p>
              <a mfLink mfTileAction href="#">Website</a>
            </li>
          </ul>
        </div>
      </section>
    `,
  }),
};

export default meta;
type Story = StoryObj<Args>;

export const Tint: Story = {};

export const Plain: Story = {
  args: {
    heading: 'In production',
    blurb: 'Available now.',
    status: 'live',
    statusLabel: 'Live · 2',
    tone: 'plain',
  },
};

export const DarkWithPins: Story = {
  args: {
    heading: 'What should I build next?',
    blurb: 'Small things I might build next.',
    status: 'idea',
    statusLabel: 'Ideas · 2',
    tone: 'dark',
  },
  render: (args) => ({
    props: args,
    template: `
      <section mfBand [heading]="heading" [blurb]="blurb" [status]="status" [statusLabel]="statusLabel" [tone]="tone">
        <ul class="mf-pins">
          <li mfPin heading="Gmail dark mode" kind="Chrome extension" added="2026-11-07">
            A proper dark mode for Gmail in the browser.
          </li>
          <li mfPin heading="IOU tracker" kind="Android app" added="2026-11-07">
            Keeps track of informal loans, so you remember to pay them back.
          </li>
        </ul>
      </section>
    `,
  }),
};
