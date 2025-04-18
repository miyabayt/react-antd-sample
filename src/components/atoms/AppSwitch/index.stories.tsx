import type { Meta, StoryObj } from '@storybook/react'
import AppSwitch from './'

const meta: Meta<typeof AppSwitch> = {
  title: 'Components / Atoms / AppSwitch',
  component: AppSwitch,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof AppSwitch>

export const Basic: Story = {
  args: {},
}

export const Text: Story = {
  args: {
    checkedChildren: 'on',
    unCheckedChildren: 'off',
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
