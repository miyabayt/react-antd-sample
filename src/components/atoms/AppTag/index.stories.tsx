import type { Meta, StoryObj } from '@storybook/react'
import AppTag from './'

const meta: Meta<typeof AppTag> = {
  title: 'Components / Atoms / AppTag',
  component: AppTag,
  tags: ['autodocs'],
  parameters: {
    width: 300,
  },
}

export default meta
type Story = StoryObj<typeof AppTag>

export const Basic: Story = {
  args: {
    children: 'Tag 1',
  },
}

export const Closable: Story = {
  args: {
    closeIcon: true,
    children: 'Tag 2',
  },
}

export const ColorSuccess: Story = {
  args: {
    color: 'success',
    children: 'Tag 3',
  },
}

export const LargeSize: Story = {
  args: {
    size: 'large',
    children: 'Tag 4aaa',
  },
}
