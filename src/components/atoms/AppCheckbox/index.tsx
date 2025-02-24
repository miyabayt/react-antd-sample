import { css } from '@emotion/react'
import { Checkbox, theme } from 'antd'
import type { CheckboxChangeEvent } from 'antd/es/checkbox'
import type React from 'react'
import { forwardRef } from 'react'

type AppCheckboxProps = React.ComponentProps<typeof Checkbox> & {
  defaultChecked?: boolean
  checked?: boolean
  disabled?: boolean
  title?: string
  name?: string
  onChange?: (e: CheckboxChangeEvent) => void
  color?: string
}

const AppCheckbox = forwardRef<
  React.ElementRef<typeof Checkbox>,
  AppCheckboxProps
>((props: AppCheckboxProps, ref) => {
  const { token } = theme.useToken()

  const styles = {
    colorDefault: css`
        //
      `,

    colorError: css`
        .app-checkbox {
          .ant-checkbox-inner {
            border-color: ${token.colorError}
          }
        }
      `,
  }

  const styleColor =
    props.color === 'danger' ? styles.colorError : styles.colorDefault

  return (
    <Checkbox
      ref={ref}
      className='app-form-content app-checkbox'
      {...props}
      css={styleColor}
    />
  )
})
AppCheckbox.displayName = 'AppCheckbox'

export default AppCheckbox
