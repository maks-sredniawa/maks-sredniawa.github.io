import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';
import { Filter } from './filter';

const meta: Meta<Filter> = {
  title: 'Filter',
  decorators: [moduleMetadata({ imports: [Filter] })],
  args: {
    name: 'platform',
    legend: 'Show',
    options: [
      { value: 'all', label: 'All', count: 12 },
      { value: 'android', label: 'Android', count: 5 },
      { value: 'browser', label: 'Browser', count: 2 },
      { value: 'wot', label: 'World of Tanks', count: 2 },
      { value: 'dev', label: 'For developers', count: 3 },
    ],
  },
  render: (args) => ({
    props: args,
    template: `<fieldset mfFilter [name]="name" [legend]="legend" [options]="options"></fieldset>`,
  }),
};

export default meta;
type Story = StoryObj<Filter>;

export const Default: Story = {};
