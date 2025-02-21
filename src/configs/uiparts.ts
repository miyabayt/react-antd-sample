import type { InputStatus } from 'antd/es/_util/statusUtils'
import type { ButtonHTMLType } from 'antd/es/button'
import type { SizeType } from 'antd/es/config-provider/SizeContext'
import type { CSSProperties, InputHTMLAttributes, ReactNode } from 'react'

export type BASE_HTMLELM_PROPS = {
  id?: string
  className?: string
  children?: ReactNode
  style?: CSSProperties
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
}

export type BASE_BUTTON_PROPS = BASE_HTMLELM_PROPS & {
  size?: SizeType
  htmlType?: ButtonHTMLType
  loading?: boolean
  block?: boolean
  disabled?: boolean
  href?: string
  icon?: ReactNode
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void
}

export type BASE_INPUT_PROPS = BASE_HTMLELM_PROPS & {
  status?: InputStatus
  size?: SizeType
  disabled?: boolean
  value?: InputHTMLAttributes<HTMLInputElement>['value']
  onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>) => void
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export type CheckboxValueType = string | number | boolean
export type CheckboxOptionType = {
  label: string
  value: string | number
  disabled?: boolean
  title?: string
  id?: string
}

export declare const DatePickerMode: readonly ['time', 'date', 'month', 'year']
export declare const PopupPlacement: readonly [
  'topLeft',
  'topRight',
  'bottomLeft',
  'bottomRight',
]
