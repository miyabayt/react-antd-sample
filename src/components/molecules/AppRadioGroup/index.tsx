import { Radio } from 'antd'
import { forwardRef } from 'react'

type AppRadioGroupProps = React.ComponentProps<typeof Radio.Group> & {
  role?: string
  horizontal?: boolean
}

const AppRadioGroup = forwardRef<
  React.ElementRef<typeof Radio.Group>,
  AppRadioGroupProps
>(({ horizontal = false, ...props }, ref) => {
  return (
    <Radio.Group
      ref={ref}
      className='app-form-content app-radio-group'
      {...props}
      style={{
        display: 'flex',
        flexDirection: horizontal ? 'column' : undefined,
        gap: horizontal ? '8px' : undefined,
      }}
    />
  )
})

AppRadioGroup.displayName = 'AppRadioGroup'

export default AppRadioGroup
