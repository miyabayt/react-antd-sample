import { Input } from 'antd'
import { forwardRef } from 'react'

type AppInputProps = React.ComponentProps<typeof Input>

const AppInput = forwardRef<React.ElementRef<typeof Input>, AppInputProps>(
  (props: AppInputProps, ref) => {
    return <Input ref={ref} className='app-form-content app-input' {...props} />
  },
)
AppInput.displayName = 'AppInput'

export default AppInput
