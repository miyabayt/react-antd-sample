import type { Meta, StoryObj } from '@storybook/react'
import AppCalendar from './'

const meta: Meta<typeof AppCalendar> = {
  title: 'Components / Molecules / AppCalendar',
  component: AppCalendar,
  tags: ['autodocs'],
  parameters: {},
}

export default meta
type Story = StoryObj<typeof AppCalendar>

export const Basic: Story = {
  args: {},
}
