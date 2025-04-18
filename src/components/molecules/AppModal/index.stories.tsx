import { AppModalProvider } from '@/providers/AppModalProvider'
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from 'antd'
import { type ComponentProps, useState } from 'react'
import AppModal from './'

const meta: Meta<typeof AppModal> = {
  title: 'Components / Molecules / AppModal',
  component: AppModal,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <AppModalProvider>
        <Story />
      </AppModalProvider>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof AppModal>

const AppModalWithHooks = (args: ComponentProps<typeof AppModal>) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <Button type='primary' onClick={showModal}>
        Open Modal
      </Button>
      <AppModal
        title='Basic Modal'
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        {...args}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </AppModal>
    </>
  )
}

export const Basic: Story = {
  args: {},
  render: (args) => <AppModalWithHooks {...args} />,
}

export const Movable: Story = {
  args: {
    movable: true,
  },
  render: (args) => <AppModalWithHooks {...args} />,
}
