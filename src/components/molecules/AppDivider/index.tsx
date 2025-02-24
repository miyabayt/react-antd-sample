import { css } from '@emotion/react'
import { Divider, type DividerProps, theme } from 'antd'

interface AppDividerProps extends DividerProps {
  innerDescriptions?: boolean
  size?: 'small' | 'middle' | 'large'
}

const AppDivider = (props: AppDividerProps) => {
  const {
    innerDescriptions = false,
    style = innerDescriptions
      ? { margin: '16px 0px' }
      : { margin: '24px 0 10px 0' },
    size = 'middle',
    ...restProps
  } = props
  const { token } = theme.useToken()

  const styles = {
    dividerContainer: css`
      ${innerDescriptions ? 'margin: 0 -24px;' : null}

      .ant-divider-inner-text {
        ${size === 'small' ? `font-size: ${token.fontSize}px;` : null}
        ${size === 'middle' ? `font-size: ${token.fontSizeLG};` : null}
        ${size === 'large' ? `font-size: ${token.fontSizeXL}px;` : null}
      }
    `,
  }

  return (
    <div css={styles.dividerContainer}>
      <Divider style={style} {...restProps} />
    </div>
  )
}

export default AppDivider
