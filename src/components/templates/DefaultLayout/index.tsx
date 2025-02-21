import LoadingSpinner from '@/components/atoms/LoadingSpinner'
import AppBreadcrumb from '@/components/molecules/AppBreadcrumb'
import AppFooter from '@/components/organisms/AppFooter'
import AppHeader from '@/components/organisms/AppHeader'
import AppSidebar from '@/components/organisms/AppSidebar'
import { AppModalProvider } from '@/providers/AppModalProvider'
import { globalStyles } from '@/styles/globals'
import { Global, css } from '@emotion/react'
import { Layout } from 'antd'
import React from 'react'
import { Outlet } from 'react-router'

const DefaultLayout = () => {
  return (
    <Layout>
      <Global styles={globalStyles} />
      <AppSidebar />
      <Layout>
        <AppModalProvider>
          <AppHeader />
          <div css={styles.contentContainer}>
            <Layout.Content css={styles.content}>
              <AppBreadcrumb />
              <React.Suspense fallback={<LoadingSpinner loading={true} />}>
                <Outlet />
              </React.Suspense>
            </Layout.Content>
          </div>
          <AppFooter />
        </AppModalProvider>
      </Layout>
    </Layout>
  )
}

const styles = {
  contentContainer: css`
    // background-color: #fff;
  `,

  content: css`
    padding: 16px;
    min-height: calc(100vh - 100px);
    border-bottom: 1px solid #d0d7de;
  `,
}

export default DefaultLayout
