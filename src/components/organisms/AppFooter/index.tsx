import { css } from '@emotion/react'
import { Layout } from 'antd'

const { Footer } = Layout

const AppFooter = () => {
  return (
    <Footer css={styles.footer}>
      Copyright &copy; Sample Admin. All rights reserved.
    </Footer>
  )
}

const styles = {
  footer: css`
    height: 50px;
    line-height: 50px;
    padding: 0 16px;
    margin: 0;
    background-color: #fff;
  `,
}

export default AppFooter
