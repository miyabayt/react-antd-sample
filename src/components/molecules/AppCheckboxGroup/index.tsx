import type {
  BASE_HTMLELM_PROPS,
  CheckboxOptionType,
  CheckboxValueType,
} from '@/configs/uiparts'
import { Checkbox } from 'antd'
import { forwardRef } from 'react'

type AppCheckboxGroupProps = BASE_HTMLELM_PROPS & {
  name: string
  defaultValue?: Array<CheckboxValueType>
  value?: Array<CheckboxValueType>
  options: Array<CheckboxOptionType>
  disabled?: boolean
  horizontal?: boolean
  onChange?: (checkedValue: Array<CheckboxValueType>) => void
}

const AppCheckboxGroup = forwardRef<
  typeof Checkbox.Group,
  AppCheckboxGroupProps
>(({ horizontal = false, ...props }, ref) => {
  return (
    <Checkbox.Group
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
