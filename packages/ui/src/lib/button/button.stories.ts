import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';
import { Button } from './button';

type Args = Button & { label: string };

const meta: Meta<Args> = {
  title: 'Button',
  decorators: [moduleMetadata({ imports: [Button] })],
  args: { label: 'See the apps', variant: 'primary', size: 'regular' },
  argTypes: {
    variant: { control: 'inline-radio', options: ['primary', 'secondary', 'brand'] },
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

export const Secondary: Story = { args: { label: 'GitHub', variant: 'secondary' } };

export const Brand: Story = { args: { label: 'Buy me a coffee', variant: 'brand' } };

export const Small: Story = { args: { size: 'small' } };
