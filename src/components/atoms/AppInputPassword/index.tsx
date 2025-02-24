import { Input } from 'antd'
import { forwardRef } from 'react'

type AppInputPasswordProps = React.ComponentProps<typeof Input.Password> & {
  withEyeButton?: boolean
}

const AppInputPassword = forwardRef<
  React.ElementRef<typeof Input.Password>,
  AppInputPasswordProps
>((props: AppInputPasswordProps, ref) => {
  return (
    <Input.Password
      ref={ref}
      className='app-form-content app-input-password'
      visibilityToggle={props.withEyeButton ?? true}
      {...props}
    />
  )
})
AppInputPassword.displayName = 'AppInputPassword'

export default AppInputPassword
