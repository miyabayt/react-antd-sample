import type { Meta, StoryObj } from '@storybook/react'
import AppDivider from './'

const meta: Meta<typeof AppDivider> = {
  title: 'Components / Molecules / AppDivider',
  component: AppDivider,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne
          merninisti licere mihi ista probare, quae sunt a te dicta? Refert
          tamen, quo modo.
        </p>
        <Story />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne
          merninisti licere mihi ista probare, quae sunt a te dicta? Refert
          tamen, quo modo.
        </p>
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof AppDivider>

export const Basic: Story = {
  args: {},
}

export const Dashed: Story = {
  args: {
    dashed: true,
  },
}
