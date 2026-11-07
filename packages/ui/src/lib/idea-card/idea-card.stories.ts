import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';
import { IdeaCard } from './idea-card';

type Args = IdeaCard & { pitch: string };

const meta: Meta<Args> = {
  title: 'Idea card',
  decorators: [moduleMetadata({ imports: [IdeaCard] })],
  args: {
    heading: 'Take your meds',
    kind: 'Android app',
    added: '2026-11-07',
    pitch:
      'Reminds you to take your meds, with everything kept on your phone. No ads, no tracking.',
  },
  render: (args) => ({
    props: args,
    template: `
      <ul class="grid ideas">
        <li mfIdeaCard [heading]="heading" [kind]="kind" [added]="added">{{ pitch }}</li>
      </ul>
    `,
  }),
};

export default meta;
type Story = StoryObj<Args>;

export const Default: Story = {};
