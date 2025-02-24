import { YYYY_MM, YYYY_MM_DD } from '@/configs/app'

import { type SerializedStyles, css } from '@emotion/react'
import { DatePicker, type DatePickerProps } from 'antd'
import type { Dayjs } from 'dayjs'
import { type ComponentProps, forwardRef } from 'react'

type AppDatePickerProps = ComponentProps<typeof DatePicker> & {
  width?: number | string
  holidays?: Dayjs[]
} & React.ComponentPropsWithoutRef<typeof DatePicker>

const AppDatePicker = forwardRef<
  React.ElementRef<typeof DatePicker>,
  AppDatePickerProps
>(({ mode = 'date', holidays, ...props }: AppDatePickerProps, ref) => {
  const isHoliday = (date: Dayjs) => {
    if (!holidays) return false
    return holidays.some((holiday) => date.isSame(holiday, 'day'))
  }

  const cellRender: DatePickerProps<Dayjs>['cellRender'] = (current, info) => {
    if (info.type !== 'date') {
      return info.originNode
    }
    if (typeof current === 'number' || typeof current === 'string') {
      return <div className='ant-picker-cell-inner'>{current}</div>
    }

    const day = current.day()
    let renderCss: SerializedStyles = css``
    if (day === 0 || isHoliday(current)) {
      // 日曜日、祝日
      renderCss = styles.sundayOrHoliday
    } else if (day === 6) {
      // 土曜日
      renderCss = styles.saturday
    }

    return (
      <div className='ant-picker-cell-inner' css={renderCss}>
        {current.date()}
      </div>
    )
  }

  let format = undefined
  if (!props.picker || props.picker === 'date') {
    format = YYYY_MM_DD
  } else if (props.picker === 'month') {
    format = YYYY_MM
  }

  if (!props.picker || props.picker === 'date') {
    props.placeholder = YYYY_MM_DD
  }

  return (
    <DatePicker
      ref={ref}
      className='app-form-content app-date-picker'
      style={{ minWidth: 160, width: props.width }}
      format={format}
      cellRender={cellRender}
      {...props}
    />
  )
})
AppDatePicker.displayName = 'AppDatePicker'

const styles = {
  saturday: css`
    color: blue;
  `,

  sundayOrHoliday: css`
    color: red;
  `,

  other: css`
  `,
}

export default AppDatePicker
