import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';
import { Link } from './link';

type Args = Link & { label: string };

const meta: Meta<Args> = {
  title: 'Link',
  decorators: [moduleMetadata({ imports: [Link] })],
  args: { label: 'Website', variant: 'plain' },
  argTypes: { variant: { control: 'inline-radio', options: ['plain', 'go'] } },
  render: (args) => ({
    props: args,
    template: `<a mfLink href="#" [variant]="variant">{{ label }}</a>`,
  }),
};

export default meta;
type Story = StoryObj<Args>;

export const Plain: Story = {};

export const Go: Story = { args: { label: 'Google Play', variant: 'go' } };
