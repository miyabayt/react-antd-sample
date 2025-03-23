import { Switch } from 'antd'
import { forwardRef } from 'react'

type AppSwitchProps = React.ComponentProps<typeof Switch>

const AppSwitch = forwardRef<React.ElementRef<typeof Switch>, AppSwitchProps>(
  (props: AppSwitchProps, ref) => {
    return (
      <Switch ref={ref} className='app-form-content app-switch' {...props} />
    )
  },
)
AppSwitch.displayName = 'AppSwitch'

export default AppSwitch
