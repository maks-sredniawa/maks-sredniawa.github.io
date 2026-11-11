import {
  componentWrapperDecorator,
  type Meta,
  moduleMetadata,
  type StoryObj,
} from '@storybook/angular';
import { Link } from '../link/link';
import { LedgerRow } from './ledger-row';

type Args = LedgerRow & { summary: string; width: number };

const meta: Meta<Args> = {
  title: 'Ledger row',
  decorators: [moduleMetadata({ imports: [LedgerRow, Link] })],
  args: {
    iconSrc: 'icons/sample.svg',
    heading: 'Binky',
    kind: 'Android app',
    status: 'live',
    statusLabel: 'Live',
    summary:
      "Track your rabbit's weight, health and care, so a slow change over weeks shows up instead of being forgotten.",
  },
  render: (args) => ({
    props: args,
    template: `
      <ul class="mf-ledger">
        <li
          mfLedgerRow
          [iconSrc]="iconSrc"
          [heading]="heading"
          [kind]="kind"
          [status]="status"
          [statusLabel]="statusLabel"
        >
          <p>{{ summary }}</p>
          <a mfLink mfLedgerRowAction variant="go" href="#">Google Play</a>
          <a mfLink mfLedgerRowAction href="#">Website</a>
        </li>
      </ul>
    `,
  }),
};

export default meta;
type Story = StoryObj<Args>;

export const Default: Story = {
  decorators: [componentWrapperDecorator((story) => `<div style="width: 1300px">${story}</div>`)],
};

/** Below 1100px the summary and links move under the name. */
export const Tablet: Story = {
  args: {
    heading: 'Dark Theme for Play Console',
    kind: 'Chrome extension',
    summary:
      'Switches on the dark palette that is already hidden inside Google Play Console. Unofficial, not affiliated with Google.',
  },
  decorators: [componentWrapperDecorator((story) => `<div style="width: 700px">${story}</div>`)],
};

export const Building: Story = {
  args: {
    heading: 'Kozica',
    status: 'building',
    statusLabel: 'Building',
    summary:
      'An offline trail map of the Polish mountains, drawn in the colours of the trail signposts.',
  },
  decorators: [componentWrapperDecorator((story) => `<div style="width: 1300px">${story}</div>`)],
};
