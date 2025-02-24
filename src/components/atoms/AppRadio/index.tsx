import { Radio } from 'antd'
import { forwardRef } from 'react'

type AppRadioProps = React.ComponentProps<typeof Radio>

const AppRadio = forwardRef<React.ElementRef<typeof Radio>, AppRadioProps>(
  (props: AppRadioProps, ref) => {
    return (
      <Radio
        ref={ref}
        className='app-form-content app-radio-button'
        {...props}
      />
    )
  },
)
AppRadio.displayName = 'AppRadioButton'

export default AppRadio
