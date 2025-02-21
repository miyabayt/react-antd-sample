import { css } from '@emotion/react'
import { Collapse, type CollapseProps, theme } from 'antd'
import { forwardRef } from 'react'

interface AppCollapseParams extends CollapseProps {
  labelSize?: 'small' | 'middle' | 'large'
}

const AppCollapse = forwardRef<
  React.ElementRef<typeof Collapse>,
  AppCollapseParams
>((props: AppCollapseParams, ref) => {
  const { labelSize = 'middle', ...restProps } = props
  const { token } = theme.useToken()

  const styles = {
    collapse: css`
      .ant-collapse-header {
        height: ${token.Card?.headerHeight}px;
        background-color: ${token.colorBgBase};
        align-items: center !important;
        vertical-align: middle;
      }

      .ant-collapse-header-text {
        ${labelSize === 'small' ? `font-size: ${token.fontSizeSM}px; line-height: ${token.fontSizeSM}px;` : null}
        ${labelSize === 'middle' ? `font-size: ${token.fontSizeLG}px; line-height: ${token.fontSizeLG}px;` : null}
        ${labelSize === 'large' ? `font-size: ${token.fontSizeXL}px; line-height: ${token.fontSizeXL}px;` : null}
        font-weight: bold;
      }
    `,
  }

  return (
    <Collapse
      ref={ref}
      expandIconPosition='end'
      {...restProps}
      css={styles.collapse}
    />
  )
})

AppCollapse.displayName = 'AppCollapse'

export default AppCollapse
