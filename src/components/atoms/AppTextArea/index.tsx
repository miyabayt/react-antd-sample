import { Input } from 'antd'
import type { InputStatus } from 'antd/es/_util/statusUtils'
import type { SizeType } from 'antd/es/config-provider/SizeContext'
import type TextArea from 'antd/lib/input/TextArea'
import { type CSSProperties, type InputHTMLAttributes, forwardRef } from 'react'

type AppTextAreaProps = React.ComponentProps<typeof TextArea> & {
  status?: InputStatus
  size?: SizeType
  disabled?: boolean
  value?: InputHTMLAttributes<HTMLInputElement>['value']
  style?: CSSProperties
}

const AppTextArea = forwardRef<
  React.ElementRef<typeof Input.TextArea>,
  AppTextAreaProps
>((props: AppTextAreaProps, ref) => {
  return (
    <Input.TextArea
      ref={ref}
      className='app-form-content app-textarea'
      {...props}
    />
  )
})
AppTextArea.displayName = 'AppTextArea'

export default AppTextArea
