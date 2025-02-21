import type {
  BASE_HTMLELM_PROPS,
  CheckboxOptionType,
  CheckboxValueType,
} from '@/configs/uiparts'
import { Radio } from 'antd'
import type { SizeType } from 'antd/es/config-provider/SizeContext'
import type { RadioChangeEvent } from 'antd/lib'
import { forwardRef } from 'react'

type AppRadioGroupProps = BASE_HTMLELM_PROPS & {
  defaultValue?: CheckboxValueType
  value?: CheckboxValueType
  size?: SizeType
  disabled?: boolean
  name: string
  id?: string
  options?: Array<CheckboxOptionType>
  role?: string
  horizontal?: boolean
  onFocus?: React.FocusEventHandler<HTMLDivElement>
  onBlur?: React.FocusEventHandler<HTMLDivElement>
  onChange?: (e: RadioChangeEvent) => void
}

const AppRadioGroup = forwardRef<typeof Radio.Group, AppRadioGroupProps>(
  ({ horizontal = false, ...props }, ref) => {
    return (
      <Radio.Group
        className='app-form-content app-radio-group'
        {...props}
        style={{
          display: 'flex',
          flexDirection: horizontal ? 'row' : 'column',
          gap: '8px',
        }}
      />
    )
  },
)
AppRadioGroup.displayName = 'AppRadioGroup'

export default AppRadioGroup
