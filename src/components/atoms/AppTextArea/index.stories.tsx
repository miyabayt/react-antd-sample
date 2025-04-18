import type { Meta, StoryObj } from '@storybook/react'
import AppTextArea from './'

const meta: Meta<typeof AppTextArea> = {
  title: 'Components / Atoms / AppTextArea',
  component: AppTextArea,
  tags: ['autodocs'],
  parameters: {
    width: 300,
  },
}

export default meta
type Story = StoryObj<typeof AppTextArea>

export const ShowCount: Story = {
  args: {
    showCount: true,
    maxLength: 100,
  },
}

export const ResizeDisabled: Story = {
  args: {
    placeholder: 'disable resize',
    style: { resize: 'none' },
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

export const SmallSize: Story = {
  args: {
    size: 'small',
  },
}

export const WithClearButton: Story = {
  args: {
    allowClear: true,
  },
}
