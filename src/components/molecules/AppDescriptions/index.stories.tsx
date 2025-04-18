import type { Meta, StoryObj } from '@storybook/react'
import type { DescriptionsProps } from 'antd'
import AppDescriptions from './'

const meta: Meta<typeof AppDescriptions> = {
  title: 'Components / Molecules / AppDescriptions',
  component: AppDescriptions,
  tags: ['autodocs'],
  parameters: {},
}

export default meta
type Story = StoryObj<typeof AppDescriptions>

const items: DescriptionsProps['items'] = [
  {
    key: '1',
    label: 'UserName',
    children: 'Zhou Maomao',
  },
  {
    key: '2',
    label: 'Telephone',
    children: '1810000000',
  },
  {
    key: '3',
    label: 'Live',
    children: 'Hangzhou, Zhejiang',
  },
  {
    key: '4',
    label: 'Remark',
    children: 'empty',
  },
  {
    key: '5',
    label: 'Address',
    children: 'No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China',
  },
]

export const Basic: Story = {
  args: {
    styles: { label: { width: 120 } },
    items: items,
  },
}

export const Borderless: Story = {
  args: {
    bordered: false,
    styles: { label: { width: 120 } },
    items: items,
  },
}
