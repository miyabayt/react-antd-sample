import { NotificationOutlined } from '@ant-design/icons'
import type { Meta, StoryObj } from '@storybook/react'
import { Avatar, Card } from 'antd'
import AppBadge from './'

const meta: Meta<typeof AppBadge> = {
  title: 'Components / Atoms / AppBadge',
  component: AppBadge,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof AppBadge>

export const Basic: Story = {
  args: {
    count: 99,
    children: <Avatar shape='square' size='large' />,
  },
}

export const Standalone: Story = {
  args: {
    count: 99,
  },
}

export const Dot: Story = {
  args: {
    dot: true,
    children: <NotificationOutlined style={{ fontSize: 16 }} />,
  },
}

export const Ribbon: Story = {
  args: {
    ribbon: true,
    text: 'サンプル',
    children: (
      <Card title='Pushes open the window' size='small'>
        and raises the spyglass.
      </Card>
    ),
  },
  decorators: [
    (Story) => (
      <div style={{ width: 300 }}>
        <Story />
      </div>
    ),
  ],
}
