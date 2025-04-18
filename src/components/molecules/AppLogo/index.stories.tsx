import type { Meta, StoryObj } from '@storybook/react'
import AppLogo from './'

const meta: Meta<typeof AppLogo> = {
  title: 'Components / Molecules / AppLogo',
  component: AppLogo,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof AppLogo>

export const Basic: Story = {
  args: {},
}

export const Collapsed: Story = {
  args: {
    collapseLogo: true,
  },
}
