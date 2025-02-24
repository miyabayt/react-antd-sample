import { validateMessages } from '@/configs/messages'
import { css } from '@emotion/react'
import {
  App,
  Flex,
  Form,
  type FormProps,
  type GlobalToken,
  Tag,
  theme,
} from 'antd'
import type { RequiredMark } from 'antd/es/form/Form'
import type React from 'react'
import { forwardRef, useCallback, useEffect, useState } from 'react'
import { useBeforeUnload, useBlocker } from 'react-router'
import { openConfirmModal } from './ConfirmModal'

type AppFormProps = Omit<FormProps, 'children'> & {
  children: React.ReactNode
  bordered?: boolean
}

const AppForm = forwardRef<React.ElementRef<typeof Form>, AppFormProps>(
  ({ form, bordered = false, ...restProps }: AppFormProps, ref) => {
    const { modal } = App.useApp()
    const { token } = theme.useToken()
    const styles = getStyles(token)
    const values = form ? Form.useWatch([], form) : undefined
    const [isFormTouched, setIsFormTouched] = useState(false)

    const requiredMark: RequiredMark = (
      label: React.ReactNode,
      { required }: { required: boolean },
    ) => (
      <>
        {required ? (
          restProps.layout === 'horizontal' ? (
            <Flex
              justify='space-between'
              align='center'
              style={{ width: '100%' }}
            >
              <div css={styles.labelContainer}>{label}</div>
              <Tag color={token.colorError}>必須</Tag>
            </Flex>
          ) : (
            <Flex align='center' style={{ width: '100%' }}>
              <Tag color={token.colorError}>必須</Tag>
              <div css={styles.labelContainer}>{label}</div>
            </Flex>
          )
        ) : (
          <div css={styles.labelContainer}>{label}</div>
        )}
      </>
    )

    useEffect(() => {
      if (form?.isFieldsTouched()) {
        //フォームの値が変更されている場合
        setIsFormTouched(true)
      }
    }, [values, form])

    const blocker = useBlocker(isFormTouched)

    useEffect(() => {
      if (blocker.state === 'blocked') {
        openConfirmModal({
          modal,
          onOk: () => blocker.proceed(),
          onCancel: () => blocker.reset(),
        })
      }
    }, [blocker])

    useBeforeUnload(
      useCallback(
        (event) => {
          if (isFormTouched) {
            event.preventDefault()
            event.returnValue = ''
          }
        },
        [isFormTouched],
      ),
      { capture: true },
    )

    return (
      <div css={bordered && styles.bordered}>
        <Form
          ref={ref}
          {...restProps}
          form={form}
          labelAlign='left'
          validateMessages={validateMessages}
          requiredMark={requiredMark}
          css={
            restProps.layout === 'horizontal'
              ? styles.formHorizontal
              : styles.formVertical
          }
        />
      </div>
    )
  },
)

const getStyles = (token: GlobalToken) => {
  return {
    labelContainer: css`
      width: 100%;
    `,

    formHorizontal: css`
      .ant-form-item {
        margin-bottom: 0;
      }

      .ant-form-item-label > label {
        margin-left: 16px;
        width: 100%;
        height: 100%;
        font-weight: bold;
      }

      .ant-form-item-control {
        margin-left: 16px;
      }

      .ant-form-item-explain {
        position: absolute;
      }

      .ant-form-item-row {
        display: flex;
        align-items: center;
        min-height: 60px;
      }

      .ant-form-item-label-left {
        height: 100%;
      }
    `,

    formVertical: css`
      .ant-form-item-label > label {
        width: 100%;
        height: 100%;
        font-weight: bold;
      }
    `,

    bordered: css`
      .ant-form .ant-form-item {
        border-bottom: 1px solid ${token.colorBorder};
        border-left: 1px solid ${token.colorBorder};
        border-right: 1px solid ${token.colorBorder};
      }

      .ant-form > *:first-child .ant-form-item {
        border-top: 1px solid ${token.colorBorder};
      }

      .ant-form .ant-form-item-row {
        height: 94px;
      }

      .ant-form .ant-form-item-label-left {
        padding-right: 10px;
        border-right: 1px solid ${token.colorBorder};
        background-color: ${token.colorBgLayout};
      }
    `,
  }
}

AppForm.displayName = 'AppForm'

export default AppForm
