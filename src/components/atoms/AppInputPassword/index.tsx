import type { BASE_INPUT_PROPS } from '@/configs/uiparts'
import { Input } from 'antd'
import { forwardRef } from 'react'

type AppInputPasswordProps = BASE_INPUT_PROPS & {
  withEyeButton?: boolean
}

const AppInputPassword = forwardRef<
  typeof Input.Password,
  AppInputPasswordProps
>((props: AppInputPasswordProps, ref) => {
  return (
    <Input.Password
      className='app-form-content app-input-password'
      visibilityToggle={props.withEyeButton ?? true}
      {...props}
    />
  )
})
AppInputPassword.displayName = 'AppInputPassword'

export default AppInputPassword
