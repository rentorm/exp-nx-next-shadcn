import type { Meta, StoryObj } from '@storybook/react';
import { MyOrgShared } from './shared';
import { expect } from '@storybook/jest';

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
  play: async ({ canvasElement }) => {
    const canvas = canvasElement;
    await expect(canvas.textContent).toMatch(/Welcome to MyOrgShared!/gi);
  },
};
