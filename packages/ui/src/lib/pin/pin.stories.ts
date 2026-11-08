import {
  componentWrapperDecorator,
  type Meta,
  moduleMetadata,
  type StoryObj,
} from '@storybook/angular';
import { Pin } from './pin';

type Args = Pin & { pitch: string };

const meta: Meta<Args> = {
  title: 'Pin',
  decorators: [
    moduleMetadata({ imports: [Pin] }),
    componentWrapperDecorator((story) => `<div style="width: 340px">${story}</div>`),
  ],
  args: {
    heading: 'Gmail dark mode',
    kind: 'Chrome extension',
    added: '2026-11-07',
    pitch: 'A proper dark mode for Gmail in the browser.',
  },
  render: (args) => ({
    props: args,
    template: `
      <ul class="mf-pins">
        <li mfPin [heading]="heading" [kind]="kind" [added]="added">{{ pitch }}</li>
      </ul>
    `,
  }),
};

export default meta;
type Story = StoryObj<Args>;

export const Default: Story = {};
