import type { Meta, StoryObj } from '@storybook/react'
import AppUpload from './'

const meta: Meta<typeof AppUpload> = {
  title: 'Components / Molecules / AppUpload',
  component: AppUpload,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof AppUpload>

export const Basic: Story = {
  args: {},
}
