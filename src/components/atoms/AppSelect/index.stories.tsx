import type { Meta, StoryObj } from '@storybook/react'
import AppSelect from './'

const meta: Meta<typeof AppSelect> = {
  title: 'Components / Atoms / AppSelect',
  component: AppSelect,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof AppSelect>

const optionsWithDisabled = [
  { value: 'jack', label: 'Jack' },
  { value: 'lucy', label: 'Lucy' },
  { value: 'Yiminghe', label: 'yiminghe' },
  { value: 'disabled', label: 'Disabled', disabled: true },
]

export const Basic: Story = {
  args: {
    options: optionsWithDisabled,
  },
}

export const Disabled: Story = {
  args: {
    options: optionsWithDisabled,
    disabled: true,
  },
}

export const LargeSize: Story = {
  args: {
    options: optionsWithDisabled,
    size: 'large',
  },
}

export const Width: Story = {
  args: {
    options: optionsWithDisabled,
    width: 300,
  },
}

export const Narrow: Story = {
  args: {
    defaultValue: 1,
    options: [
      { value: 1, label: '1' },
      { value: 2, label: '2' },
      { value: 3, label: '3' },
    ],
    narrow: true,
  },
}
