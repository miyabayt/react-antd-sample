import { css } from '@emotion/react'

const styles = (height?: string | number | undefined) => {
  return {
    global: css`
      .app-modal {
        pointer-events: none;
        overflow: hidden !important;
      }

      .app-modal .ant-modal {
        display: flex;
        max-width: none;
        transform-origin: 50% 50% !important;
      }

      .app-modal .ant-modal-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: 16px;
      }

      .app-modal .ant-modal-header {
        flex: 0;
        padding: 0;
      }

      .app-modal .ant-modal-footer {
        flex: 0;
        padding: 16px;
      }

      .app-modal .ant-modal-body {
        ${height && `height: ${height}px;`}
        pointer-events: all;
        overflow-y: auto;
      }
    `,

    modalTitle: css`
      padding-bottom: 8px;
      width: 100%;
      cursor: move;
    `,
  }
}

export default styles
