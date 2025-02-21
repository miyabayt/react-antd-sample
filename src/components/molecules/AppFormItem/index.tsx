import { css } from '@emotion/react'
import { Form } from 'antd'

import type FormItem from 'antd/lib/form/FormItem'
import { forwardRef } from 'react'

type AppFormItemProps = React.ComponentProps<typeof FormItem> & {
  labelStyle?: React.CSSProperties
}

const AppFormItem = forwardRef<HTMLDivElement, AppFormItemProps>(
  (
    {
      label,
      required = false,
      labelCol,
      wrapperCol,
      labelStyle,
      rules = [],
      ...restProps
    },
    ref,
  ) => {
    const customRules =
      required &&
      !rules.some((rule) => (rule as { required?: boolean }).required)
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
          validateTrigger='onBlur'
          colon={false}
          label={label}
          required={required}
          labelCol={labelCol}
          wrapperCol={wrapperCol}
          rules={customRules}
          {...restProps}
        />
      </div>
    )
  },
)

AppFormItem.displayName = 'AppFormItem'

export default AppFormItem
