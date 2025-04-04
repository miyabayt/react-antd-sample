import { LoadingOutlined } from '@ant-design/icons'
import { css, keyframes } from '@emotion/react'
import { Spin } from 'antd'

interface LoadingSpinnerProps {
  loading: boolean
}

const antIcon = <LoadingOutlined style={{ fontSize: 36 }} />

const LoadingSpinner = (props: LoadingSpinnerProps) => {
  return (
    <>
      {props.loading && (
        <div css={styles.spinner}>
          <Spin indicator={antIcon} />
        </div>
      )}
    </>
  )
}

const spinnerAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const styles = {
  spinner: css`
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1200;
    animation: ${spinnerAnimation} 1s linear infinite;
  `,
}

export default LoadingSpinner
