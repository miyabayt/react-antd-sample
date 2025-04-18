import type { Meta, StoryObj } from '@storybook/react'
import AppRadioGroup from './'

const meta: Meta<typeof AppRadioGroup> = {
  title: 'Components / Molecules / AppRadioGroup',
  component: AppRadioGroup,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof AppRadioGroup>

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

export const Disabled: Story = {
  args: {
    defaultValue: ['Apple'],
    disabled: true,
    options: optionsWithDisabled,
  },
}

export const ButtonOption: Story = {
  args: {
    defaultValue: ['Apple'],
    options: options,
    optionType: 'button',
  },
}

export const ButtonOptionSolid: Story = {
  args: {
    defaultValue: ['Apple'],
    options: options,
    optionType: 'button',
    buttonStyle: 'solid',
  },
}
