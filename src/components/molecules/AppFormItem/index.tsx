import { css } from '@emotion/react'
import { Form } from 'antd'
import type FormItem from 'antd/es/form/FormItem'

type AppFormItemProps = React.ComponentProps<typeof FormItem>

const AppFormItem = (props: AppFormItemProps) => {
  const {
    label,
    colon = false,
    required = false,
    validateTrigger = 'onBlur',
    labelCol,
    wrapperCol,
    rules = [],
    ...restProps
  } = props

  const customRules =
    required && !rules.some((rule) => (rule as { required?: boolean }).required)
      ? [...rules, { required: true }]
      : rules

  const styles = {
    formItemContainer: css`
      .ant-form-item-extra {
        position: absolute;
        white-space: nowrap;
      }
    `,
  }

  return (
    <div css={styles.formItemContainer}>
      <Form.Item
        validateTrigger={validateTrigger}
        colon={colon}
        label={label}
        required={required}
        labelCol={labelCol}
        wrapperCol={wrapperCol}
        rules={customRules}
        {...restProps}
      />
    </div>
  )
}
AppFormItem.displayName = 'AppFormItem'

export default AppFormItem
