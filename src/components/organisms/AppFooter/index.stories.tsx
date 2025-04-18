import type { Meta, StoryObj } from '@storybook/react'
import AppFooter from './'

const meta: Meta<typeof AppFooter> = {
  title: 'Components / Organisms / AppFooter',
  component: AppFooter,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof AppFooter>

export const Basic: Story = {
  args: {},
}
