import dayjs from '@/utils/dayjs'
import type {
  CalendarOptions,
  DayCellContentArg,
  DayCellMountArg,
  DayHeaderContentArg,
  DayHeaderMountArg,
  EventClickArg,
} from '@fullcalendar/core'
import jaLocale from '@fullcalendar/core/locales/ja'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin, { type DateClickArg } from '@fullcalendar/interaction'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import type { PortalProps } from '@rc-component/portal'
import { Drawer, theme } from 'antd'
import type { Dayjs } from 'dayjs'
import { debounce } from 'lodash'
import type React from 'react'
import { forwardRef, useEffect, useRef, useState } from 'react'
import { calendarStyles } from './styles'

interface AppCalendar extends CalendarOptions {
  holidays?: Dayjs[]
  selectedDates?: Dayjs[]
  setSelectedDates?: (dates: Dayjs[]) => void
  drawerGetContainer?: PortalProps['getContainer']
}

const AppCalendar = forwardRef<
  React.ElementRef<typeof FullCalendar>,
  AppCalendar
>(
  (
    {
      holidays,
      selectedDates: propSelectedDates,
      setSelectedDates: propSetSelectedDates,
      handleWindowResize = true,
      events,
      drawerGetContainer = false,
      ...restProps
    },
    ref,
  ) => {
    const { token } = theme.useToken()
    const localRef = useRef<React.ElementRef<typeof FullCalendar>>(null)
    const calendarRef =
      (ref as React.RefObject<React.ElementRef<typeof FullCalendar>>) ||
      localRef
    const parentRef = useRef(null)
    const [internalSelectedDates, setInternalSelectedDates] = useState<Dayjs[]>(
      [],
    )
    const selectedDates =
      propSelectedDates !== undefined
        ? propSelectedDates
        : internalSelectedDates
    const setSelectedDates =
      propSetSelectedDates !== undefined
        ? propSetSelectedDates
        : setInternalSelectedDates

    // Drawer
    const timeGridRef = useRef<FullCalendar>(null)
    const [isDrawerLoading, setIsDrawerLoading] = useState(false)
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const [timeGridInitialDate, setTimeGridInitialDate] = useState<Date>()

    const isHoliday = (date: Dayjs) => {
      if (!holidays) return false
      return holidays.some((holiday) => date.isSame(holiday, 'day'))
    }

    const onHeaderCheckboxChecked = (event: Event) => {
      const dayCheckbox = event.target as HTMLInputElement
      const dayOfWeek = Number.parseInt(dayCheckbox.name.split('-')[1], 10) // header-0, header-1, etc. から曜日を取得

      // すべての日付ごとのチェックボックスを取得
      const dateCheckboxes = document.querySelectorAll<HTMLInputElement>(
        `input[type="checkbox"][name^="20"]`,
      ) // 20で始まるYYYY-MM-DD形式のチェックボックスを取得

      if (dateCheckboxes) {
        const startOfMonth = dayjs().startOf('month')
        const endOfMonth = dayjs().endOf('month')

        for (const dateCheckbox of dateCheckboxes) {
          const cbValue = dayjs(dateCheckbox.name)
          if (
            cbValue.day() === dayOfWeek &&
            cbValue.isBetween(startOfMonth, endOfMonth, null, '[]')
          ) {
            dateCheckbox.checked = dayCheckbox.checked
          }
        }
      }
    }

    const onDateCheckboxChecked = (event: Event) => {
      const dateCheckbox = event.target as HTMLInputElement
      const cbValue = dayjs(dateCheckbox.name)
      const dayOfWeek = cbValue.day()

      // ヘッダーのチェックボックスを取得
      const headerCheckbox = document.querySelector<HTMLInputElement>(
        `input[type="checkbox"][name^="header-${cbValue.day()}"]`,
      )

      if (headerCheckbox) {
        // すべての日付ごとのチェックボックスを取得
        const dateCheckboxes = document.querySelectorAll<HTMLInputElement>(
          'input[type="checkbox"][name^="20"]',
        ) // 20で始まるYYYY-MM-DD形式のチェックボックスを取得

        const allChecked = Array.from(dateCheckboxes).every((cb) => {
          const cbDate = dayjs(cb.name)
          return cbDate.day() !== dayOfWeek || cb.checked
        })

        const someChecked = Array.from(dateCheckboxes).some((cb) => {
          const cbDate = dayjs(cb.name)
          return cbDate.day() === dayOfWeek && cb.checked
        })

        headerCheckbox.checked = allChecked
        headerCheckbox.indeterminate = !allChecked && someChecked
      }
    }

    const dayHeaderDidMount = (arg: DayHeaderMountArg) => {
      const innerDiv = arg.el.querySelector('.fc-scrollgrid-sync-inner')
      if (innerDiv) {
        const wrapperDiv = document.createElement('div')
        wrapperDiv.style.display = 'flex'
        wrapperDiv.style.alignItems = 'center' // 縦方向の中央配置
        wrapperDiv.style.width = '100%' // 幅を設定して要素を整える
        wrapperDiv.style.position = 'relative'

        const centerDiv = document.createElement('div')
        centerDiv.style.flexGrow = '1' // 左右に広がって中央に配置されるように設定
        centerDiv.style.display = 'flex'
        centerDiv.style.justifyContent = 'center' // 中央配置
        centerDiv.classList.add('ant-checkbox-wrapper')

        const aElement = innerDiv.querySelector('a.fc-col-header-cell-cushion')
        if (aElement) {
          centerDiv.appendChild(aElement)
          wrapperDiv.appendChild(centerDiv)
        }

        // チェックボックスを作成
        const checkbox = document.createElement('input')
        checkbox.type = 'checkbox'
        checkbox.name = `header-${arg.date.getDay()}`
        checkbox.className = 'ant-checkbox-input'
        checkbox.style.position = 'absolute'
        checkbox.style.right = '5px' // 右端に配置
        checkbox.addEventListener('change', onHeaderCheckboxChecked)

        // チェックボックスを右寄せにする
        checkbox.style.marginLeft = 'auto'
        wrapperDiv.appendChild(checkbox)
        innerDiv.appendChild(wrapperDiv)
      }
    }

    const dayCellDidMount = (arg: DayCellMountArg) => {
      const innerDiv = arg.el.querySelector('.fc-daygrid-day-top')
      if (innerDiv) {
        const wrapperDiv = document.createElement('div')
        wrapperDiv.style.display = 'flex'
        wrapperDiv.style.alignItems = 'center' // 縦方向の中央配置
        wrapperDiv.style.width = '100%' // 幅を設定して要素を整える
        wrapperDiv.style.position = 'relative'

        const centerDiv = document.createElement('div')
        centerDiv.style.flexGrow = '1'
        centerDiv.style.display = 'flex'
        centerDiv.style.justifyContent = 'start' // 左寄せ
        centerDiv.style.marginLeft = '2px'
        centerDiv.classList.add('ant-checkbox-wrapper')

        const aElement = innerDiv.querySelector('a.fc-daygrid-day-number')
        if (aElement) {
          centerDiv.appendChild(aElement)
          wrapperDiv.appendChild(centerDiv)
        }

        // チェックボックスを作成
        const checkbox = document.createElement('input')
        checkbox.type = 'checkbox'
        checkbox.name = arg.date.toISOString().split('T')[0] // YYYY-MM-DD
        checkbox.className = 'ant-checkbox-input'
        checkbox.style.position = 'absolute'
        checkbox.style.right = '5px' // 右端に配置
        checkbox.style.zIndex = '800'
        checkbox.addEventListener('change', onDateCheckboxChecked)
        checkbox.addEventListener('mouseup', (event) => event.stopPropagation())

        // チェックボックスを右寄せにする
        checkbox.style.marginLeft = 'auto'
        wrapperDiv.appendChild(checkbox)
        innerDiv.appendChild(wrapperDiv)

        // ステートに反映
        setSelectedDates([...selectedDates, dayjs(arg.date)])
      }

      if (isHoliday(dayjs(arg.date))) {
        arg.el.classList.add('fc-day-holiday')
      }
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

    useEffect(() => {
      if (calendarRef.current) {
        const calendarApi = calendarRef.current.getApi()

        calendarApi.unselect()
        for (const selectedDate of selectedDates) {
          calendarApi.select(selectedDate)
        }
      }
    }, [selectedDates])

    useEffect(() => {
      const handleResize = debounce(() => {
        if (calendarRef.current) {
          const calendarApi = calendarRef.current.getApi()
          calendarApi.updateSize()
        }
      }, 50) // 遅延を設定

      const observer = new ResizeObserver(handleResize)
      if (parentRef.current) {
        observer.observe(parentRef.current)
      }

      return () => {
        if (parentRef.current) {
          observer.unobserve(parentRef.current)
        }
        handleResize.cancel() // デバウンスされた関数をキャンセル
      }
    }, [calendarRef, parentRef])

    const handleDateClick = (arg: DateClickArg) => {
      setIsDrawerLoading(true) // ドロワー読み込み中
      setIsDrawerOpen(true)

      setTimeGridInitialDate(arg.date)
      const timeGridApi = timeGridRef.current?.getApi()
      if (timeGridApi) {
        timeGridApi.gotoDate(arg.date)
      }

      setTimeout(() => {
        setIsDrawerLoading(false)
      }, 100)
    }

    const handleEventClick = (arg: EventClickArg) => {
      const eventStart = arg.event.start

      if (eventStart) {
        setIsDrawerLoading(true) // ドロワー読み込み中
        setIsDrawerOpen(true)

        setTimeGridInitialDate(eventStart)
        const timeGridApi = timeGridRef.current?.getApi()
        if (timeGridApi) {
          timeGridApi.gotoDate(eventStart)

          const eventTime = eventStart.getTime()
          timeGridApi.scrollToTime(eventTime)
        }

        setTimeout(() => {
          setIsDrawerLoading(false)
        }, 100)
      }
    }

    const styles = calendarStyles(token)

    return (
      <div ref={parentRef} css={styles.calendarContainer}>
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView='dayGridMonth'
          headerToolbar={{ start: 'title', center: '', end: 'prev,today,next' }}
          dayHeaderDidMount={dayHeaderDidMount}
          dayCellDidMount={dayCellDidMount}
          dayHeaderContent={dayHeaderContent}
          dayCellContent={dayCellContent}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          handleWindowResize={handleWindowResize}
          buttonText={{ today: '今月' }}
          locales={[jaLocale]}
          locale='ja'
          timeZone='Asia/Tokyo'
          businessHours={{
            daysOfWeek: [1, 2, 3, 4, 5],
            startTime: '00:00',
            endTime: '24:00',
          }}
          events={events}
          {...restProps}
          selectable={false}
        />
        <div css={styles.drawerContainer}>
          <Drawer
            loading={isDrawerLoading}
            closable={false}
            onClose={() => setIsDrawerOpen(false)}
            open={isDrawerOpen}
            getContainer={drawerGetContainer}
            css={styles.drawer}
          >
            <FullCalendar
              ref={timeGridRef}
              plugins={[timeGridPlugin]}
              initialView='timeGridOneDay'
              stickyHeaderDates={false} // ヘッダーを追従させない
              //loading={(isLoading) => setIsDrawerLoading(isLoading)}
              initialDate={timeGridInitialDate}
              headerToolbar={{
                left: 'title',
                center: '',
                right: '',
              }}
              datesSet={(info) => {
                const today = new Date()
                const titleEl = document.querySelector(
                  '.ant-drawer-body .fc-toolbar-title',
                )
                if (titleEl) {
                  const originalTitle = info.view.title
                  if (info.start <= today && today <= info.end) {
                    titleEl.innerHTML = `${originalTitle}（今日）`
                  } else {
                    titleEl.innerHTML = originalTitle
                  }
                }
              }}
              slotLabelFormat={{
                hour: 'numeric',
                minute: '2-digit',
                hour12: false, // 24時間形式に設定
              }}
              events={events}
              locales={[jaLocale]}
              locale='ja'
              timeZone='Asia/Tokyo'
              views={{
                timeGridOneDay: {
                  // 1日のタイムスケージュール
                  type: 'timeGrid',
                  duration: { days: 1 },
                },
              }}
              height='auto'
            />
          </Drawer>
        </div>
      </div>
    )
  },
)

AppCalendar.displayName = 'AppCalendar'

export default AppCalendar
