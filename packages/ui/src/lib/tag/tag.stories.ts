import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';
import { Tag } from './tag';

type Args = Tag & { label: string };

const meta: Meta<Args> = {
  title: 'Tag',
  decorators: [moduleMetadata({ imports: [Tag] })],
  args: { tone: 'live', label: 'Live · 5' },
  argTypes: {
    tone: { control: 'inline-radio', options: ['live', 'building', 'oss', 'idea', 'plain', 'ink'] },
  },
  render: (args) => ({
    props: args,
    template: `<span [mfTag]="tone">{{ label }}</span>`,
  }),
};

export default meta;
type Story = StoryObj<Args>;

export const Live: Story = {};

export const Building: Story = { args: { tone: 'building', label: 'Building · 3' } };

export const OpenSource: Story = { args: { tone: 'oss', label: 'Open source · 3' } };

export const Idea: Story = { args: { tone: 'idea', label: 'Ideas · 9' } };

export const Plain: Story = { args: { tone: 'plain', label: 'Android app' } };
