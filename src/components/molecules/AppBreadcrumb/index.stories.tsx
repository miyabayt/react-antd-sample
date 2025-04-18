import type { Meta, StoryObj } from '@storybook/react'
import AppBreadcrumb from './'

const meta: Meta<typeof AppBreadcrumb> = {
  title: 'Components / Atoms / AppBreadcrumb',
  component: AppBreadcrumb,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof AppBreadcrumb>

export const BasicUsage: Story = {
  args: {},
}
