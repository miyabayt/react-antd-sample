import { Alert } from 'antd'
import type React from 'react'

type AppAlertProps = {} & React.ComponentProps<typeof Alert>

const AppAlert = (props: AppAlertProps) => {
  const { ...restProps } = props
  return <Alert {...restProps} />
}

export default AppAlert
