import {
  componentWrapperDecorator,
  type Meta,
  moduleMetadata,
  type StoryObj,
} from '@storybook/angular';
import { Idea } from './idea';

type Args = Idea & { pitch: string };

const meta: Meta<Args> = {
  title: 'Idea',
  decorators: [
    moduleMetadata({ imports: [Idea] }),
    componentWrapperDecorator(
      (story) => `<section class="mf-band mf-band--dark"><div class="mf-wrap">${story}</div></section>`,
    ),
  ],
  args: {
    heading: 'Gmail dark mode',
    kind: 'Chrome extension',
    pitch: 'A proper dark mode for Gmail in the browser, for people who want the whole of it dark.',
  },
  render: (args) => ({
    props: args,
    template: `
      <ul class="mf-ideas">
        <li mfIdea [heading]="heading" [kind]="kind">{{ pitch }}</li>
        <li mfIdea heading="Darts scorer" kind="Android app">Counts your darts score.</li>
      </ul>
    `,
  }),
};

export default meta;
type Story = StoryObj<Args>;

export const Default: Story = {};
