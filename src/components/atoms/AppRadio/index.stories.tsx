import type { Meta, StoryObj } from '@storybook/react'
import AppRadio from './'

const meta: Meta<typeof AppRadio> = {
  title: 'Components / Atoms / AppRadio',
  component: AppRadio,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof AppRadio>

export const Basic: Story = {
  args: {
    checked: true,
    children: 'Radio',
  },
}

export const Button: Story = {
  args: {
    title: 'タイトル',
    children: 'Radio',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Radio',
  },
}
