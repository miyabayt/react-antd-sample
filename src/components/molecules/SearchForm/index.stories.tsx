import type { Meta, StoryObj } from '@storybook/react'
import { Col, Form, Input, Row } from 'antd'
import type { ComponentProps } from 'react'
import AppFormItem from '../AppFormItem'
import SearchForm from './'

const meta: Meta<typeof SearchForm> = {
  title: 'Components / Molecules / SearchForm',
  component: SearchForm,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof SearchForm>

const SearchFormWithHooks = (args: ComponentProps<typeof SearchForm>) => {
  const [form] = Form.useForm()

  return (
    <SearchForm form={form} name='searchForm'>
      <Row gutter={24}>
        <Col span={8}>
          <AppFormItem name='name' label='氏名'>
            <Input />
          </AppFormItem>
        </Col>
        <Col span={8}>
          <AppFormItem name='email' label='メールアドレス'>
            <Input />
          </AppFormItem>
        </Col>
      </Row>
    </SearchForm>
  )
}

export const Basic: Story = {
  args: {},
  render: (args) => <SearchFormWithHooks {...args} />,
}
