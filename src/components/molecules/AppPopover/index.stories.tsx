import type { Meta, StoryObj } from '@storybook/react'
import { Button } from 'antd'
import AppPopover from './'

const meta: Meta<typeof AppPopover> = {
  title: 'Components / Molecules / AppPopover',
  component: AppPopover,
  tags: ['autodocs'],
  parameters: {
    width: 300,
  },
}

export default meta
type Story = StoryObj<typeof AppPopover>

const content = (
  <div>
    <p>Content</p>
    <p>Content</p>
  </div>
)

export const Basic: Story = {
  args: {
    content: content,
    title: 'Title',
    children: <Button type='primary'>Hover me</Button>,
  },
}
