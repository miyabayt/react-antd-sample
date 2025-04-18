import type { Meta, StoryObj } from '@storybook/react'
import AppSidebar from './'

const meta: Meta<typeof AppSidebar> = {
  title: 'Components / Organisms / AppSidebar',
  component: AppSidebar,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof AppSidebar>

export const Basic: Story = {
  args: {},
}
