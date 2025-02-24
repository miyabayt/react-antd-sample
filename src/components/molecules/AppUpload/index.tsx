import { UploadOutlined } from '@ant-design/icons'
import { css } from '@emotion/react'
import { Button, Flex, type UploadProps, theme } from 'antd'
import Dragger from 'antd/es/upload/Dragger'

interface AppUploadProps extends UploadProps {
  //
}

const AppUpload = (props: AppUploadProps) => {
  const {
    openFileDialogOnClick = false,
    multiple = true,
    style = { padding: '20px 0' },
    ...restProps
  } = props

  const { token } = theme.useToken()

  const styles = {
    uploadContainer: css`
      .ant-upload-drag {
        border: none;
        background-color: ${token.colorBgLayout};
      }
    `,
  }

  return (
    <div css={styles.uploadContainer}>
      <Dragger
        openFileDialogOnClick={openFileDialogOnClick}
        multiple={multiple}
        style={style}
        {...restProps}
      >
        <p className='ant-upload-drag-icon'>
          <UploadOutlined />
        </p>
        <Flex gap={10} justify='center' vertical>
          <p className='ant-upload-text'>
            アップロードするファイルをこちらへドラッグ＆ドロップするか
            <br />
            クリップボードから画像を貼り付けてください。
          </p>
          <div>
            <Button>ファイルを選択</Button>
          </div>
          <p className='ant-upload-hint'>
            ※Shiftキーを押しながらファイルを複数選択可能
          </p>
        </Flex>
      </Dragger>
    </div>
  )
}

export default AppUpload
