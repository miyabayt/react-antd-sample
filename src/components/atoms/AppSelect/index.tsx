import { css } from '@emotion/react'
import { Select, theme } from 'antd'
import { forwardRef } from 'react'

type AppSelectProps = React.ComponentProps<typeof Select> & {
  width?: number
  color?: 'danger'
  narrow?: boolean
}

const AppSelect = forwardRef<React.ElementRef<typeof Select>, AppSelectProps>(
  (props: AppSelectProps, ref) => {
    const { color, width, narrow = false, ...restProps } = props
    const { token } = theme.useToken()

    const styles = {
      colorDefault: css`
        //
      `,

      colorError: css`
        .ant-select-selector {
          background-color: ${token.colorErrorBg} !important;;
          border: 1px solid ${token.colorError} !important;
          color: ${token.colorError} !important;
        }

        .ant-select-arrow {
          color: ${token.colorError} !important;
        }
      `,
    }

    const styleColor =
      props.color === 'danger' ? styles.colorError : styles.colorDefault

    const style = {
      minWidth: narrow ? undefined : 120,
      ...props.style,
    }

    return (
      <Select
        ref={ref}
        rootClassName='app-form-content app-select'
        style={{ ...style, width: props.width }}
        {...restProps}
        css={styleColor}
      />
    )
  },
)
AppSelect.displayName = 'AppSelect'

export default AppSelect
