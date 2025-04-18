import type { Meta, StoryObj } from '@storybook/react'
import AppAlert from './'

const meta: Meta<typeof AppAlert> = {
  title: 'Components / Molecules / AppAlert',
  component: AppAlert,
  tags: ['autodocs'],
  parameters: {},
}

export default meta
type Story = StoryObj<typeof AppAlert>

export const Basic: Story = {
  args: {
    message: 'Success Text',
    type: 'success',
  },
}

export const WarnAlert: Story = {
  args: {
    message: 'Success Text',
    type: 'warning',
  },
}

export const ErrorAlert: Story = {
  args: {
    message: 'Success Text',
    type: 'error',
  },
}

export const Closable: Story = {
  args: {
    closable: true,
    message: 'Success Text',
    type: 'success',
  },
}

export const Icon: Story = {
  args: {
    showIcon: true,
    message: 'Success Text',
    type: 'success',
  },
}

export const Description: Story = {
  args: {
    description: 'Success Description Success Description Success Description',
    message: 'Success Text',
    type: 'success',
  },
}

export const Banner: Story = {
  args: {
    banner: true,
    message: 'Success Text',
    type: 'success',
  },
}
