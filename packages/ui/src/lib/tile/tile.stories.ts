import {
  componentWrapperDecorator,
  type Meta,
  moduleMetadata,
  type StoryObj,
} from '@storybook/angular';
import { Link } from '../link/link';
import { Tile } from './tile';

type Args = Tile & { summary: string; width: number };

const meta: Meta<Args> = {
  title: 'Tile',
  decorators: [moduleMetadata({ imports: [Tile, Link] })],
  args: {
    iconSrc: 'icons/sample.svg',
    heading: 'Binky',
    kind: 'Android app',
    summary:
      "Track your rabbit's weight, health and care, so a slow change over weeks shows up instead of being forgotten.",
  },
  render: (args) => ({
    props: args,
    template: `
      <ul class="mf-tiles">
        <li mfTile [iconSrc]="iconSrc" [heading]="heading" [kind]="kind">
          <p>{{ summary }}</p>
          <a mfLink mfTileAction variant="go" href="#">Google Play</a>
          <a mfLink mfTileAction href="#">Website</a>
        </li>
      </ul>
    `,
  }),
};

export default meta;
type Story = StoryObj<Args>;

export const Default: Story = {
  decorators: [componentWrapperDecorator((story) => `<div style="width: 460px">${story}</div>`)],
};

/** A tile alone in a wide aisle lays itself out as one row. */
export const Wide: Story = {
  args: {
    heading: 'Dark Theme for Play Console',
    kind: 'Chrome extension',
    summary:
      'Switches on the dark palette that is already hidden inside Google Play Console. Unofficial, not affiliated with Google.',
  },
  decorators: [componentWrapperDecorator((story) => `<div style="width: 1100px">${story}</div>`)],
};
