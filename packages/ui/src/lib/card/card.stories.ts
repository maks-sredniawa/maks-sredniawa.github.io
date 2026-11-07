import {
  componentWrapperDecorator,
  type Meta,
  moduleMetadata,
  type StoryObj,
} from '@storybook/angular';
import { Button } from '../button/button';
import { Card } from './card';

type Args = Card & { summary: string };

const meta: Meta<Args> = {
  title: 'Card',
  decorators: [
    moduleMetadata({ imports: [Card, Button] }),
    componentWrapperDecorator((story) => `<div class="grid">${story}</div>`),
  ],
  args: {
    iconSrc: 'icons/sample.svg',
    heading: 'Binky',
    kind: 'Android app',
    headingLevel: 4,
    summary:
      "Track your rabbit's weight, health and care, so a slow change over weeks shows up instead of being forgotten.",
  },
  argTypes: { headingLevel: { control: 'inline-radio', options: [3, 4] } },
  render: (args) => ({
    props: args,
    template: `
      <article mfCard [iconSrc]="iconSrc" [heading]="heading" [kind]="kind" [headingLevel]="headingLevel">
        <p>{{ summary }}</p>
        <a mfButton mfCardAction size="small" href="#">Google Play</a>
        <a mfButton mfCardAction size="small" variant="ghost" href="#">Website</a>
      </article>
    `,
  }),
};

export default meta;
type Story = StoryObj<Args>;

export const Live: Story = {};

export const InDevelopment: Story = {
  args: {
    heading: 'Kozica',
    headingLevel: 3,
    summary:
      'An offline trail map of the Polish mountains, drawn in the colours of the trail signposts.',
  },
  render: (args) => ({
    props: args,
    template: `
      <article mfCard [iconSrc]="iconSrc" [heading]="heading" [kind]="kind" [headingLevel]="headingLevel">
        <p>{{ summary }}</p>
        <a mfButton mfCardAction size="small" variant="ghost" href="#">Website</a>
      </article>
    `,
  }),
};
