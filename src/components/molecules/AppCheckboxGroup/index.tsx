import { Checkbox } from 'antd'
import { forwardRef } from 'react'

type AppCheckboxGroupProps = React.ComponentProps<typeof Checkbox.Group> & {
  name: string
  disabled?: boolean
  horizontal?: boolean
}

const AppCheckboxGroup = forwardRef<
  React.ElementRef<typeof Checkbox.Group>,
  AppCheckboxGroupProps
>(({ horizontal = false, ...props }, ref) => {
  return (
    <Checkbox.Group
      ref={ref}
      {...props}
      style={{
        display: 'flex',
        flexDirection: horizontal ? 'row' : 'column',
        gap: '8px',
      }}
    />
  )
})

AppCheckboxGroup.displayName = 'AppCheckboxGroup'

export default AppCheckboxGroup
