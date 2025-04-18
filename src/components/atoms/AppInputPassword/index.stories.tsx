import type { Meta, StoryObj } from '@storybook/react'
import AppInputPassword from './'

const meta: Meta<typeof AppInputPassword> = {
  title: 'Components / Atoms / AppInputPassword',
  component: AppInputPassword,
  tags: ['autodocs'],
  parameters: {
    width: 300,
  },
}

export default meta
type Story = StoryObj<typeof AppInputPassword>

export const Basic: Story = {
  args: {
    withEyeButton: false,
    placeholder: 'input password',
  },
}

export const withEyeButton: Story = {
  args: {
    withEyeButton: true,
    placeholder: 'input password',
  },
}

export const Disabled: Story = {
  args: {
    withEyeButton: false,
    placeholder: 'input password',
    disabled: true,
  },
}

export const LargeSize: Story = {
  args: {
    withEyeButton: false,
    size: 'large',
    placeholder: 'large size',
  },
}
