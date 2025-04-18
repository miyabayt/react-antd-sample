import { css } from '@emotion/react'
import type { GlobalToken } from 'antd'

export const calendarStyles = (token: GlobalToken) => {
  return {
    calendarContainer: css`
      width: 100%;

      .fc .fc-toolbar.fc-header-toolbar {
        margin-bottom: 2px;
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
        padding: 5px;
        color: ${token.colorText};
        border: none;
        outline: none;
      }

      .fc .fc-prev-button,
      .fc .fc-next-button {
        padding: 0 5px;
        margin-bottom: 5px;
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
        color: ${token.colorTextDisabled};
        cursor: not-allowed;
      }

      .fc .fc-toolbar-title {
        font-size: ${token.fontSizeLG}px;
        color: ${token.colorText};
        font-weight: bold;
      }

      .fc .fc-col-header-cell {
        font-size: ${token.fontSize}px;
        font-weight: normal;
        background-color: ${token.colorBgLayout};
      }

      .fc .fc-daygrid-day-frame {
        cursor: pointer;
      }

      .fc .fc-daygrid-day-top {
        flex-direction: unset;
      }

      .fc .fc-daygrid-day-number {
        font-size: ${token.fontSize}px;
        margin: 4px;
      }

      .fc .fc-non-business {
        background: unset;
      }

      .fc-day-sat {
        background-color: ${token.colorInfoBg};
      }

      .fc-day-sun {
        background-color: ${token.colorErrorBg};
      }

      .fc-day-holiday {
        background-color: ${token.colorErrorBg};
      }
    `,

    drawerContainer: css`
      //
    `,

    drawer: css`
      .ant-drawer-body {
        padding: 16px;
      }

      .fc .fc-toolbar-title {
        font-size: ${token.fontSizeLG}px;
        color: ${token.colorText};
        font-weight: bold;
      }

      .fc .fc-toolbar.fc-header-toolbar {
        margin-bottom: 2px;
      }
    `,
  }
}
