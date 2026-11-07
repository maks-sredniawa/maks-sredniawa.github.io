import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';
import { Stamp } from './stamp';

interface Args {
  label: string;
}

const meta: Meta<Args> = {
  title: 'Stamp',
  decorators: [moduleMetadata({ imports: [Stamp] })],
  args: { label: 'Free' },
  render: (args) => ({
    props: args,
    template: `
      <div style="position: relative; width: 140px; height: 64px; padding: 14px 20px">
        <span mfStamp>{{ label }}</span>
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<Args>;

export const Default: Story = {};
