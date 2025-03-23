import { Tooltip } from 'antd'
import type React from 'react'

type AppTooltipProps = {} & React.ComponentProps<typeof Tooltip>

const AppTooltip = (props: AppTooltipProps) => {
  const { ...restProps } = props
  return <Tooltip {...restProps} />
}

export default AppTooltip
