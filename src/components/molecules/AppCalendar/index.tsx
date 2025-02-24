import AppButton from '@/components/atoms/AppButton'
import { LeftOutlined } from '@ant-design/icons'
import { css } from '@emotion/react'
import type {
  CalendarOptions,
  DayCellContentArg,
  DayHeaderContentArg,
} from '@fullcalendar/core'
import jaLocale from '@fullcalendar/core/locales/ja'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import FullCalendar from '@fullcalendar/react'
import { theme } from 'antd'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import { forwardRef } from 'react'

interface AppCalendar extends CalendarOptions {
  holidays?: Dayjs[]
}

const AppCalendar = forwardRef<
  React.ElementRef<typeof FullCalendar>,
  AppCalendar
>(({ holidays, ...restProps }, ref) => {
  const { token } = theme.useToken()

  const isHoliday = (date: Dayjs) => {
    if (!holidays) return false
    return holidays.some((holiday) => date.isSame(holiday, 'day'))
  }

  const dayHeaderContent = (arg: DayHeaderContentArg) => {
    const dayIndex = arg.date.getDay()
    const current = dayjs(arg.date)
    let color = 'black'

    if (dayIndex === 0 || isHoliday(current)) {
      color = 'red' // 日曜日、祝日
    } else if (dayIndex === 6) {
      color = 'blue' // 土曜日
    }

    return <span style={{ color }}>{arg.text}</span>
  }

  const dayCellContent = (arg: DayCellContentArg) => {
    const dayIndex = arg.date.getDay()
    const current = dayjs(arg.date)

    const style = {
      color: 'black',
      fontWeight: 'normal',
    }

    if (dayIndex === 0 || isHoliday(current)) {
      style.color = 'red' // 日曜日、祝日
    } else if (dayIndex === 6) {
      style.color = 'blue' // 土曜日
    }

    if (arg.isToday) {
      style.fontWeight = 'bold'
    }

    return <span style={style}>{arg.dayNumberText.replace('日', '')}</span>
  }

  const customButtons = {
    customPrev: {
      text: <AppButton type='text' icon={<LeftOutlined />} />,
      click: () => alert('前の月'),
    },
    customNext: {
      text: '次 ➡️',
      click: () => alert('次の月'),
    },
  }

  const styles = {
    calendarContainer: css`
      .fc .fc-scrollgrid {
        border-width: 0;
      }

      .fc .fc-scrollgrid-section > * {
        border: none;
      }

      .fc .fc-scrollgrid-sync-table {
        border: 1px;
      }

      .fc .fc-toolbar.fc-header-toolbar {
        margin-bottom: 10px;
      }

      .fc .fc-button-primary {
        font-size: 0.85rem;
        margin: 0 10px;
        background-color: ${token.colorBgBase};
        color: ${token.colorTextSecondary};
        border: none;
        outline: none;
        border-radius: 3px !important;
      }

      .fc .fc-today-button {
        color: ${token.colorText};
        border: none;
        outline: none;
      }

      .fc .fc-prev-button,
      .fc .fc-next-button {
        padding: 0 5px;
        color: ${token.colorText};
        border: none;
        outline: none;
      }

      .fc .fc-prev-button:not(:disabled):hover,
      .fc .fc-next-button:not(:disabled):hover {
        background-color: ${token.colorBgLayout};
        padding: 0 5px;
        box-shadow: none;
      }

      .fc .fc-button-primary:not(:disabled):hover {
        background-color: ${token.colorBgLayout};
        box-shadow: none;
      }

      .fc .fc-button-primary:not(:disabled):active,
      .fc .fc-button-primary:not(:disabled).fc-button-active {
        color: ${token.colorTextQuaternary};
        box-shadow: none;
      }

      .fc .fc-today-button:disabled {
        opacity: 1;
      }

      .fc .fc-toolbar-title {
        font-size: ${token.fontSize}px;
        color: ${token.colorText};
      }

      .fc .fc-col-header-cell {
        font-size: ${token.fontSize}px;
        font-weight: normal;
        border: none;
      }

      .fc .fc-daygrid-day-number {
        font-size: ${token.fontSize}px;
        margin: 4px;
      }
    `,
  }

  return (
    <div css={styles.calendarContainer}>
      <FullCalendar
        ref={ref}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView='dayGridMonth'
        headerToolbar={{ start: 'title', center: '', end: 'prev,today,next' }}
        dayHeaderContent={dayHeaderContent}
        dayCellContent={dayCellContent}
        locales={[jaLocale]}
        locale='ja'
        timeZone='Asia/Tokyo'
        businessHours={{
          daysOfWeek: [1, 2, 3, 4, 5],
          startTime: '00:00',
          endTime: '24:00',
        }}
        {...restProps}
      />
    </div>
  )
})

AppCalendar.displayName = 'AppCalendar'

export default AppCalendar
