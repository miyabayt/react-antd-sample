import type { Meta, StoryObj } from '@storybook/react'
import AppCheckbox from './'

const meta: Meta<typeof AppCheckbox> = {
  title: 'Components / Atoms / AppCheckbox',
  component: AppCheckbox,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof AppCheckbox>

export const Checked: Story = {
  args: {
    checked: true,
    children: 'Checkbox',
  },
}

export const Titled: Story = {
  args: {
    title: 'タイトル',
    children: 'Checkbox',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Checkbox',
  },
}
