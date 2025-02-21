import type { BASE_INPUT_PROPS } from '@/configs/uiparts'
import { Input } from 'antd'
import { forwardRef } from 'react'

type AppInputProps = React.ComponentProps<typeof Input> &
  BASE_INPUT_PROPS & {
    type?: 'text' | 'number'
  }

const AppInput = forwardRef<typeof Input, AppInputProps>(
  (props: AppInputProps, ref) => {
    return <Input className='app-form-content app-input' {...props} />
  },
)
AppInput.displayName = 'AppInput'

export default AppInput
