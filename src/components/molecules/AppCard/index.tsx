import { css } from '@emotion/react'
import { Card, type CardProps, theme } from 'antd'
import { forwardRef } from 'react'

interface AppCardParams extends CardProps {
  showHeaderBorder?: boolean // ヘッダーの下線を表示しない
}

const AppCard = forwardRef<React.ElementRef<typeof Card>, AppCardParams>(
  (props: AppCardParams, ref) => {
    const { token } = theme.useToken()
    const { showHeaderBorder = true, children, ...restProps } = props

    const styles = {
      cardContainer: css`
        .ant-card-head {
          ${showHeaderBorder ? null : 'border-bottom: none;'}
        }

        .ant-card-head-title {
          line-height: ${token.Card?.headerFontSize}px;
        }
      `,
    }

    return (
      <div css={styles.cardContainer} style={restProps.style}>
        <Card ref={ref} {...restProps}>
          {children}
        </Card>
      </div>
    )
  },
)

AppCard.displayName = 'AppCard'

export default AppCard

export const SubTitle = ({ children }: { children: React.ReactNode }) => {
  const { token } = theme.useToken()

  const styles = {
    title: css`
      font-size: ${token.fontSizeLG}px;
      font-weight: bold;
    `,
  }

  return (
    <div style={{ marginBottom: 10 }}>
      <div css={styles.title}>{children}</div>
    </div>
  )
}
