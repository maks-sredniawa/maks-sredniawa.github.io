import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';
import { StatusBadge } from './status-badge';

type Args = StatusBadge & { label: string };

const meta: Meta<Args> = {
  title: 'Status badge',
  decorators: [moduleMetadata({ imports: [StatusBadge] })],
  args: { status: 'live', label: 'Live' },
  argTypes: { status: { control: 'inline-radio', options: ['live', 'building', 'oss', 'idea'] } },
  render: (args) => ({
    props: args,
    template: `<span [mfStatusBadge]="status">{{ label }}</span>`,
  }),
};

export default meta;
type Story = StoryObj<Args>;

export const Live: Story = {};

export const Building: Story = { args: { status: 'building', label: 'Building' } };

export const OpenSource: Story = { args: { status: 'oss', label: 'Open source' } };

export const Idea: Story = { args: { status: 'idea', label: 'Ideas' } };
