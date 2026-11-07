import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';
import { Button } from './button';

type Args = Button & { label: string };

const meta: Meta<Args> = {
  title: 'Button',
  decorators: [moduleMetadata({ imports: [Button] })],
  args: { label: 'Google Play', variant: 'primary', size: 'regular' },
  argTypes: {
    variant: { control: 'inline-radio', options: ['primary', 'ghost'] },
    size: { control: 'inline-radio', options: ['regular', 'small'] },
  },
  render: (args) => ({
    props: args,
    template: `<a mfButton href="#" [variant]="variant" [size]="size">{{ label }}</a>`,
  }),
};

export default meta;
type Story = StoryObj<Args>;

export const Primary: Story = {};

export const Ghost: Story = { args: { label: 'Website', variant: 'ghost' } };

export const Small: Story = { args: { size: 'small' } };

export const SmallGhost: Story = { args: { label: 'Source', variant: 'ghost', size: 'small' } };
