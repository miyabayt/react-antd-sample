import { Button, theme } from 'antd'
import { type ComponentProps, forwardRef } from 'react'

type AppButtonProps = Omit<ComponentProps<typeof Button>, 'type'> & {
  type?: ComponentProps<typeof Button>['type'] | 'secondary' | 'danger'
  narrow?: boolean
}

const AppButton = forwardRef<React.ElementRef<typeof Button>, AppButtonProps>(
  (props: AppButtonProps, ref) => {
    const {
      type: propType = 'primary',
      ghost: propGhost,
      danger,
      narrow = false,
      ...restProps
    } = props
    const { token } = theme.useToken()

    const style = {
      minWidth: narrow ? 0 : 120,
      ...(propType === 'secondary' && { borderColor: token.colorPrimary }),
      ...props.style,
    }

    let ghost = propGhost
    let type = propType
    if (propType === 'danger') {
      type = 'primary'
    } else if (propType === 'secondary') {
      type = 'primary'
      if (!propGhost) {
        ghost = true
      }
    } else {
      type = propType
      ghost = propGhost
    }

    return (
      <Button
        ref={ref}
        className='app-form-content app-button'
        type={type}
        ghost={ghost}
        style={style}
        danger={danger || propType === 'danger'}
        {...restProps}
      />
    )
  },
)
AppButton.displayName = 'AppButton'

export default AppButton
