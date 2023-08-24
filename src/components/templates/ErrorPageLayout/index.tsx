import { css } from '@emotion/react'
import { Layout } from 'antd'

import AppFooter from '@/components/organisms/AppFooter'
import AppHeader from '@/components/organisms/AppHeader'

const { Content } = Layout

type LayoutProps = Required<{
  readonly children: React.ReactElement
}>

const ErrorPageLayout = ({ children }: LayoutProps) => {
  return (
    <Layout>
      <Layout>
        <AppHeader showTrigger={false} showAppLogo={true} />
        <div css={styles.contentContainer}>
          <Content css={styles.content}>
            <main>{children}</main>
          </Content>
        </div>
        <AppFooter />
      </Layout>
    </Layout>
  )
}

const styles = {
  contentContainer: css``,

  content: css`
    padding: 16px;
    min-height: calc(100vh - 100px);
  `,
}

export default ErrorPageLayout
