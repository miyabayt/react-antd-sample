import { InputNumber } from 'antd'
import { forwardRef } from 'react'

type AppInputNumberProps = React.ComponentProps<typeof InputNumber>

const AppInputNumber = forwardRef<
  React.ElementRef<typeof InputNumber>,
  AppInputNumberProps
>((props: AppInputNumberProps, ref) => {
  return (
    <InputNumber
      ref={ref}
      className='app-form-content app-input-number'
      {...props}
    />
  )
})

AppInputNumber.displayName = 'AppInputNumber'

export default AppInputNumber
