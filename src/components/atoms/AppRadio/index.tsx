import type { BASE_HTMLELM_PROPS, CheckboxValueType } from '@/configs/uiparts'
import { Radio } from 'antd'
import { forwardRef } from 'react'

type AppRadioProps = BASE_HTMLELM_PROPS & {
  value?: CheckboxValueType
  defaultChecked?: boolean
  checked?: boolean
  disabled?: boolean
}

const AppRadio = forwardRef<typeof Radio, AppRadioProps>(
  (props: AppRadioProps, ref) => {
    return <Radio className='app-form-content app-radio-button' {...props} />
  },
)
AppRadio.displayName = 'AppRadioButton'

export default AppRadio
