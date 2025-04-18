import type { Meta, StoryObj } from '@storybook/react'
import type { CollapseProps } from 'antd'
import AppCollapse from './'

const meta: Meta<typeof AppCollapse> = {
  title: 'Components / Molecules / AppCollapse',
  component: AppCollapse,
  tags: ['autodocs'],
  parameters: {},
}

export default meta
type Story = StoryObj<typeof AppCollapse>

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`

const items: CollapseProps['items'] = [
  {
    key: '1',
    label: 'This is panel header 1',
    children: <p>{text}</p>,
  },
  {
    key: '2',
    label: 'This is panel header 2',
    children: <p>{text}</p>,
  },
  {
    key: '3',
    label: 'This is panel header 3',
    children: <p>{text}</p>,
  },
]

export const Basic: Story = {
  args: {
    items: items,
  },
}

export const Accordion: Story = {
  args: {
    accordion: true,
    items: items,
  },
}
