import {
  componentWrapperDecorator,
  type Meta,
  moduleMetadata,
  type StoryObj,
} from '@storybook/angular';
import { Button } from '../button/button';
import { Notice } from './notice';

type Args = Notice & { text: string };

const meta: Meta<Args> = {
  title: 'Notice',
  decorators: [
    moduleMetadata({ imports: [Notice, Button] }),
    componentWrapperDecorator(
      (story) => `<div style="width: 420px; padding-top: 24px">${story}</div>`,
    ),
  ],
  args: {
    kicker: 'Notice',
    heading: 'Like what I make?',
    stamp: 'Free',
    text: 'The apps stay free. Tips are optional and very appreciated.',
  },
  render: (args) => ({
    props: args,
    template: `
      <aside mfNotice [kicker]="kicker" [heading]="heading" [stamp]="stamp">
        {{ text }}
        <a mfButton mfNoticeAction variant="brand" href="#">Buy me a coffee</a>
        <a mfButton mfNoticeAction variant="secondary" href="#">PayPal</a>
      </aside>
    `,
  }),
};

export default meta;
type Story = StoryObj<Args>;

export const Support: Story = {};

export const WithoutStamp: Story = { args: { stamp: undefined } };
