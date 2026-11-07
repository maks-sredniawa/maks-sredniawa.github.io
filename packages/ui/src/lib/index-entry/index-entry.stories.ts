import {
  componentWrapperDecorator,
  type Meta,
  moduleMetadata,
  type StoryObj,
} from '@storybook/angular';
import { IndexEntry } from './index-entry';

type Args = IndexEntry;

const meta: Meta<Args> = {
  title: 'Index entry',
  decorators: [
    moduleMetadata({ imports: [IndexEntry] }),
    componentWrapperDecorator((story) => `<div style="width: 380px">${story}</div>`),
  ],
  args: { name: 'Binky', kind: 'Android app', href: '#', status: 'live', statusLabel: 'Live' },
  render: (args) => ({
    props: args,
    template: `
      <div class="mf-index-group">
        <h3 class="mf-sc">In production</h3>
        <ul>
          <li mfIndexEntry [name]="name" [kind]="kind" [href]="href" [status]="status" [statusLabel]="statusLabel"></li>
          <li mfIndexEntry name="Kozica" kind="Android app" href="#" status="building" statusLabel="Building"></li>
          <li mfIndexEntry name="wgmods CLI" kind="CLI" href="#" status="oss" statusLabel="Source"></li>
        </ul>
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<Args>;

export const Group: Story = {};
