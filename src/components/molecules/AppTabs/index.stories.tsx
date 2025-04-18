import type { Meta, StoryObj } from '@storybook/react'
import type { TabsProps } from 'antd'
import AppTabs from './'

const meta: Meta<typeof AppTabs> = {
  title: 'Components / Molecules / AppTabs',
  component: AppTabs,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof AppTabs>

const items: TabsProps['items'] = [
  {
    key: '1',
    label: 'Tab 1',
    children: 'Content of Tab Pane 1',
  },
  {
    key: '2',
    label: 'Tab 2',
    children: 'Content of Tab Pane 2',
  },
  {
    key: '3',
    label: 'Tab 3',
    children: 'Content of Tab Pane 3',
  },
]

export const Basic: Story = {
  args: {
    items: items,
  },
}

export const Card: Story = {
  args: {
    type: 'card',
    items: items,
  },
}

export const EditableCard: Story = {
  args: {
    type: 'editable-card',
    items: items,
  },
}

export const Left: Story = {
  args: {
    tabPosition: 'left',
    items: items,
  },
}
