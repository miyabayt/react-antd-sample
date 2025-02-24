import { Alert } from 'antd'

const NoRowsAlert = () => {
  return (
    <>
      <Alert
        message='指定された検索条件に該当する手続は存在しません。'
        description={
          <>
            検索のヒント
            <ul>
              <li>検索条件を減らしてみてください。</li>
              <li>違うキーワードを使ってみてください。</li>
            </ul>
          </>
        }
        type='warning'
        showIcon
      />
    </>
  )
}

NoRowsAlert.displayName = 'NoRowsAlert'

export default NoRowsAlert
