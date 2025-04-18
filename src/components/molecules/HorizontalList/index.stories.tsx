import type { Meta, StoryObj } from '@storybook/react'
import HorizontalList from './'

const meta: Meta<typeof HorizontalList> = {
  title: 'Components / Molecules / HorizontalList',
  component: HorizontalList,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof HorizontalList>

const items = [
  { label: '受付中', to: '#1', text: '100件' },
  { label: '受付前', to: '#2', text: '200件' },
  { label: '受付保留', to: '#3', text: '300件' },
]

export const Basic: Story = {
  args: {
    title: 'ステータス',
    items: items,
    padding: 16,
    bordered: true,
  },
}
