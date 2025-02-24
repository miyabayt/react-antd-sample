import { css } from '@emotion/react'
import { Flex } from 'antd'

interface PageTitleProps {
  title: string
  slot?: React.ReactNode
}

const PageTitle = (props: PageTitleProps) => {
  const { title, slot } = props

  return (
    <>
      <Flex
        wrap
        justify='flex-start'
        align='center'
        css={styles.pageTitleContainer}
      >
        <h1 style={{ margin: 0 }}>
          <strong>{title}</strong>
        </h1>
        <div>{slot}</div>
      </Flex>
    </>
  )
}

const styles = {
  pageTitleContainer: css`
    margin-bottom: 16px;
  `,
}

export default PageTitle
