import type { Meta, StoryObj } from 'storybook/internal/types';
import { MyOrgShared } from './shared';
import { expect } from 'storybook/test';

const meta: Meta<typeof MyOrgShared> = {
  component: MyOrgShared,
  title: 'MyOrgShared',
};
export default meta;
type Story = StoryObj<typeof MyOrgShared>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/Welcome to MyOrgShared!/gi)).toBeTruthy();
  },
};
