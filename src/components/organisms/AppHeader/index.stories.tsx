import type { Meta, StoryObj } from '@storybook/react'
import AppHeader from './'

const meta: Meta<typeof AppHeader> = {
  title: 'Components / Organisms / AppHeader',
  component: AppHeader,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof AppHeader>

export const Basic: Story = {
  args: {},
}
