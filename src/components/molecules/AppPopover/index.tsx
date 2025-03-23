import { Popover } from 'antd'
import type React from 'react'

type AppPopoverProps = {} & React.ComponentProps<typeof Popover>

const AppPopover = (props: AppPopoverProps) => {
  const { ...restProps } = props
  return <Popover {...restProps} />
}

export default AppPopover
