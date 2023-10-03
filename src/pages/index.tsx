import { Card } from 'antd'

import LoginRequired from '@/components/atoms/LoginRequired'

const TopPage = () => {
  return (
    <LoginRequired>
      <Card title='Hello'>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </Card>
    </LoginRequired>
  )
}

export default TopPage
