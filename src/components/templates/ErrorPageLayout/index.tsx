import { css } from '@emotion/react'
import { Layout } from 'antd'

import AppFooter from '@/components/organisms/AppFooter'
import AppHeader from '@/components/organisms/AppHeader'
import { Outlet } from 'react-router-dom'

const ErrorPageLayout = () => {
  return (
    <Layout>
      <Layout>
        <AppHeader
          showTrigger={false}
          showAppLogo={true}
          showUserProfile={false}
        />
        <div css={styles.contentContainer}>
          <Layout.Content css={styles.content}>
            <Outlet />
          </Layout.Content>
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
