import { SearchOutlined } from '@ant-design/icons'
import type { Meta, StoryObj } from '@storybook/react'
import AppButton from './'

const meta: Meta<typeof AppButton> = {
  title: 'Components / Atoms / AppButton',
  component: AppButton,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof AppButton>

export const Primary: Story = {
  args: {
    type: 'primary',
    children: 'Primary Button',
  },
}

export const Seconday: Story = {
  args: {
    type: 'secondary',
    children: 'Secondary Button',
  },
}

export const Default: Story = {
  args: {
    type: 'default',
    children: 'Default Button',
  },
}

export const Dashed: Story = {
  args: {
    type: 'dashed',
    children: 'Dashed Button',
  },
}

export const Text: Story = {
  args: {
    type: 'text',
    children: 'Text Button',
  },
}

export const Danger: Story = {
  args: {
    type: 'danger',
    children: 'Danger Button',
  },
}

export const Icon: Story = {
  args: {
    type: 'primary',
    icon: <SearchOutlined />,
    children: 'Search',
  },
}
