import {
  componentWrapperDecorator,
  type Meta,
  moduleMetadata,
  type StoryObj,
} from '@storybook/angular';
import { ShelfItem } from './shelf-item';

type Args = ShelfItem;

const meta: Meta<Args> = {
  title: 'Shelf item',
  decorators: [
    moduleMetadata({ imports: [ShelfItem] }),
    componentWrapperDecorator((story) => `<div style="width: 480px">${story}</div>`),
  ],
  args: { iconSrc: 'icons/sample.svg', name: 'Binky', status: 'live', href: '#' },
  argTypes: { status: { control: 'inline-radio', options: ['live', 'building', 'oss'] } },
  render: (args) => ({
    props: args,
    template: `
      <ul class="mf-shelf">
        <li mfShelfItem [iconSrc]="iconSrc" [name]="name" [status]="status" [href]="href"></li>
        <li mfShelfItem [iconSrc]="iconSrc" name="Kozica" status="building" href="#"></li>
        <li mfShelfItem [iconSrc]="iconSrc" name="Dark Theme for Play Console" status="live" href="#"></li>
        <li mfShelfItem [iconSrc]="iconSrc" name="wgmods CLI" status="oss" href="#"></li>
      </ul>
    `,
  }),
};

export default meta;
type Story = StoryObj<Args>;

export const Shelf: Story = {};
