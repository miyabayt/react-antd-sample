import { Alert, Button, Row } from 'antd'

interface ErrorPageProps {
  description: string
  message?: string
  type?: 'warning' | 'error'
}

const ErrorPage = ({
  description,
  message = 'エラーが発生しました',
  type = 'error',
}: ErrorPageProps) => {
  const handleClick = () => {
    location.href = '/' // ブラウザのAPIで強制リダイレクト
  }

  return (
    <>
      <Alert message={message} description={description} type={type} showIcon />
      <Row justify='center' style={{ margin: '2rem' }}>
        <Button
          type='primary'
          style={{ minWidth: 100, backgroundColor: 'white' }}
          onClick={handleClick}
          ghost
        >
          トップに戻る
        </Button>
      </Row>
    </>
  )
}

export default ErrorPage
