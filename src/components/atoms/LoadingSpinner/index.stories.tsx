import type { Meta, StoryObj } from '@storybook/react'
import LoadingSpinner from './'

const meta: Meta<typeof LoadingSpinner> = {
  title: 'Components / Atoms / LoadingSpinner',
  component: LoadingSpinner,
  tags: ['autodocs'],
  parameters: {
    width: 300,
  },
}

export default meta
type Story = StoryObj<typeof LoadingSpinner>

export const Loading: Story = {
  args: {
    loading: true,
  },
}
