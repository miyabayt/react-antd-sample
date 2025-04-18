import { SearchOutlined } from '@ant-design/icons'
import type { Meta, StoryObj } from '@storybook/react'
import AppInput from './'

const meta: Meta<typeof AppInput> = {
  title: 'Components / Atoms / AppInput',
  component: AppInput,
  tags: ['autodocs'],
  parameters: {
    width: 300,
  },
}

export default meta
type Story = StoryObj<typeof AppInput>

export const Basic: Story = {
  args: {
    placeholder: 'Basic usage',
  },
}

export const AddonBefore: Story = {
  args: {
    addonBefore: <SearchOutlined />,
    placeholder: 'search keyword',
  },
}

export const Disabled: Story = {
  args: {
    addonBefore: <SearchOutlined />,
    placeholder: 'large size',
    disabled: true,
  },
}

export const LargeSize: Story = {
  args: {
    size: 'large',
    placeholder: 'large size',
  },
}
