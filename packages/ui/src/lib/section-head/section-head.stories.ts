import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';
import { SectionHead } from './section-head';

type Args = SectionHead & { blurb: string };

const meta: Meta<Args> = {
  title: 'Section head',
  decorators: [moduleMetadata({ imports: [SectionHead] })],
  args: {
    status: 'live',
    statusLabel: 'Live',
    heading: 'In production',
    blurb: 'Available now on Google Play, the Chrome Web Store and GitHub.',
  },
  argTypes: { status: { control: 'inline-radio', options: ['live', 'building', 'oss', 'idea'] } },
  render: (args) => ({
    props: args,
    template: `
      <div mfSectionHead [status]="status" [statusLabel]="statusLabel" [heading]="heading">
        {{ blurb }}
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<Args>;

export const Live: Story = {};

export const Ideas: Story = {
  args: {
    status: 'idea',
    statusLabel: 'Ideas',
    heading: 'What should I build next?',
    blurb: 'Small things I might build next. Yours could join them.',
  },
};
