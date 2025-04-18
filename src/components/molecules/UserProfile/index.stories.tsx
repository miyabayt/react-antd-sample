import type { Meta, StoryObj } from '@storybook/react'
import UserProfile from './'

const meta: Meta<typeof UserProfile> = {
  title: 'Components / Molecules / UserProfile',
  component: UserProfile,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof UserProfile>

export const Basic: Story = {
  args: {},
}
