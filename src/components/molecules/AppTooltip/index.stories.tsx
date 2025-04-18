import type { Meta, StoryObj } from '@storybook/react'
import AppTooltip from './'

const meta: Meta<typeof AppTooltip> = {
  title: 'Components / Molecules / AppTooltip',
  component: AppTooltip,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof AppTooltip>

export const Basic: Story = {
  args: {
    title: 'prompt text',
    children: <span>Tooltip will show on mouse enter.</span>,
  },
}

export const ColorRed: Story = {
  args: {
    color: 'red',
    title: 'prompt text',
    children: <span>Tooltip will show on mouse enter.</span>,
  },
}
