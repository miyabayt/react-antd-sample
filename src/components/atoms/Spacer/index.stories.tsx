import type { Meta, StoryObj } from '@storybook/react'
import { Avatar } from 'antd'
import Spacer from './'

const meta: Meta<typeof Spacer> = {
  title: 'Components / Atoms / Spacer',
  component: Spacer,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: '#f5f5f5', border: '1px solid black' }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof Spacer>

export const Padding: Story = {
  args: {
    p: 20,
    children: <Avatar shape='square' size='large' />,
  },
}

export const PaddingTop: Story = {
  args: {
    pt: 20,
    children: <Avatar shape='square' size='large' />,
  },
}

export const PaddingLeft: Story = {
  args: {
    pl: 20,
    children: <Avatar shape='square' size='large' />,
  },
}

export const Margin: Story = {
  args: {
    m: 20,
    children: <Avatar shape='square' size='large' />,
  },
}

export const MarginTop: Story = {
  args: {
    mt: 20,
    children: <Avatar shape='square' size='large' />,
  },
}

export const MarginLeft: Story = {
  args: {
    ml: 20,
    children: <Avatar shape='square' size='large' />,
  },
}
