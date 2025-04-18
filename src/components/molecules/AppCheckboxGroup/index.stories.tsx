import type { Meta, StoryObj } from '@storybook/react'
import AppCheckboxGroup from './'

const meta: Meta<typeof AppCheckboxGroup> = {
  title: 'Components / Molecules / AppCheckboxGroup',
  component: AppCheckboxGroup,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof AppCheckboxGroup>

const options = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange' },
]

const optionsWithDisabled = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange', disabled: false },
]

export const Plain: Story = {
  args: {
    defaultValue: ['Apple'],
    options: options,
  },
}

export const Horizontal: Story = {
  args: {
    defaultValue: ['Apple'],
    options: options,
    horizontal: true,
  },
}

export const WithDisabled: Story = {
  args: {
    defaultValue: ['Apple'],
    disabled: true,
    options: optionsWithDisabled,
  },
}
