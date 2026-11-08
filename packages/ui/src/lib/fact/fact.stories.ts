import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';
import { Fact } from './fact';

type Args = Fact & { label: string };

const meta: Meta<Args> = {
  title: 'Fact',
  decorators: [moduleMetadata({ imports: [Fact] })],
  args: { value: 5, label: 'apps, extensions and mods live' },
  render: (args) => ({
    props: args,
    template: `<ul class="mf-facts"><li mfFact [value]="value">{{ label }}</li></ul>`,
  }),
};

export default meta;
type Story = StoryObj<Args>;

export const Default: Story = {};

export const Zero: Story = { args: { value: 0, label: 'ads or trackers' } };
