import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons'
import type { Meta, StoryObj } from '@storybook/react'
import AppSegmented from './'

const meta: Meta<typeof AppSegmented> = {
  title: 'Components / Molecules / AppSegmented',
  component: AppSegmented,
  tags: ['autodocs'],
  parameters: {
    width: 300,
  },
}

export default meta
type Story = StoryObj<typeof AppSegmented>

const options = ['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly']
const withIconOptions = [
  { value: 'List', icon: <BarsOutlined /> },
  { value: 'Kanban', icon: <AppstoreOutlined /> },
]

export const Basic: Story = {
  args: {
    options: options,
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    options: options,
  },
}

export const LargeSize: Story = {
  args: {
    size: 'large',
    options: options,
  },
}

export const Icon: Story = {
  args: {
    options: withIconOptions,
  },
}

export const Vertical: Story = {
  args: {
    vertical: true,
    options: withIconOptions,
  },
}
