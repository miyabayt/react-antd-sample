import { Badge } from 'antd'
import type { BadgeProps } from 'antd/es/badge'
import type React from 'react'
import { forwardRef } from 'react'

interface AppBadgeProps extends BadgeProps {
  ribbon?: boolean
  textColor?: string
}

const AppBadge = forwardRef<React.ElementRef<typeof Badge>, AppBadgeProps>(
  (
    {
      ribbon = false,
      showZero = true,
      text,
      textColor = 'white',
      ...restProps
    },
    ref,
  ) => {
    if (ribbon !== true) {
      return (
        <Badge
          ref={ref}
          className='app-label'
          text={text}
          showZero
          {...restProps}
        />
      )
    }

    return (
      <Badge.Ribbon
        {...restProps}
        className='app-label no-corner'
        text={<span style={{ color: textColor }}>{text}</span>}
      />
    )
  },
)

AppBadge.displayName = 'AppBadge'

export default AppBadge
