import type { Meta, StoryObj } from '@storybook/react'
import AppInputNumber from './'

const meta: Meta<typeof AppInputNumber> = {
  title: 'Components / Atoms / AppInputNumber',
  component: AppInputNumber,
  tags: ['autodocs'],
  parameters: {
    width: 300,
  },
}

export default meta
type Story = StoryObj<typeof AppInputNumber>

export const Basic: Story = {
  args: {},
}

export const Prefix: Story = {
  args: {
    prefix: '￥',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

export const LargeSize: Story = {
  args: {
    size: 'large',
  },
}
