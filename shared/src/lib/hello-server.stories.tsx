import type { Meta, StoryObj } from 'storybook/internal/types';
import { expect } from 'storybook/test';

// Create a client-compatible wrapper for Storybook
function HelloServerWrapper() {
  // Since we can't render async components in Storybook,
  // we'll create a synchronous version that shows the same output
  return <h1>Hello Server</h1>;
}

const meta: Meta<typeof HelloServerWrapper> = {
  component: HelloServerWrapper,
  title: 'HelloServer',
  parameters: {
    docs: {
      description: {
        component: 'A server component that renders a greeting. This is a client-compatible version for Storybook demonstration.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof HelloServerWrapper>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/Hello Server/gi)).toBeTruthy();
  },
};
