import type { BASE_BUTTON_PROPS } from '@/configs/uiparts'
import { Button, theme } from 'antd'
import type { ButtonType } from 'antd/es/button'
import type { BaseButtonProps } from 'antd/es/button/button'
import { forwardRef } from 'react'

declare const ButtonPriority: readonly [
  'primary',
  'secondary',
  'danger',
  'link',
]

type AppButtonProps = BASE_BUTTON_PROPS & {
  priority: (typeof ButtonPriority)[number]
  narrow?: boolean
} & BaseButtonProps

function decideBtnType(priority: (typeof ButtonPriority)[number]): ButtonType {
  switch (priority) {
    case 'primary':
      return 'primary'
    case 'secondary':
      return 'default'
    case 'danger':
      return 'primary'
    case 'link':
      return 'link'
  }
}

const AppButton = forwardRef<typeof Button, AppButtonProps>(
  (props: AppButtonProps, ref) => {
    const { priority, narrow = false, ...restProps } = props
    const { token } = theme.useToken()
    const type = decideBtnType(priority)

    const style = {
      minWidth: narrow ? 0 : 120,
      ...(priority === 'secondary' && { borderColor: token.colorPrimary }),
      ...props.style,
    }

    return (
      <Button
        className='app-form-content app-button'
        type={type}
        style={style}
        danger={priority === 'danger'}
        {...restProps}
      />
    )
  },
)
AppButton.displayName = 'AppButton'

export default AppButton
