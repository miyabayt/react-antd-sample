import { Global, css } from '@emotion/react'
import { Layout } from 'antd'

import AppBreadcrumb from '@/components/molecules/AppBreadcrumb'
import AppFooter from '@/components/organisms/AppFooter'
import AppHeader from '@/components/organisms/AppHeader'
import AppSidebar from '@/components/organisms/AppSidebar'
import { globalStyles } from '@/styles/globals'

const { Content } = Layout

type LayoutProps = Required<{
  readonly children: React.ReactElement
}>

const DefaultLayout = ({ children }: LayoutProps) => {
  return (
    <Layout>
      <Global styles={globalStyles} />
      <AppSidebar />
      <Layout>
        <AppHeader />
        <div css={styles.contentContainer}>
          <Content css={styles.content}>
            <AppBreadcrumb />
            {children}
          </Content>
        </div>
        <AppFooter />
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
