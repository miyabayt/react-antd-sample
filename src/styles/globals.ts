import { css } from '@emotion/react'

export const styles = {
  errorPage: css`
    h1 {
      font-size: 2rem;
    }
  `,
}

export const globalStyles = css`
  .ant-table-thead .ant-table-cell {
    background-color: #f5f5f5 !important;
  }

  .ant-card-head {
    min-height: 52px !important;
    padding: 10px 24px !important;
  }

  .ant-card-head-title {
    font-size: 14px;
  }

  .ant-descriptions-title {
    font-size: 14px !important;
  }
`

export const fadeEnter = css`
  opacity: 0;
`

export const fadeEnterActive = css`
  opacity: 1;
  transition: opacity 500ms ease-in-out;
`

export const fadeExit = css`
  opacity: 1;
`

export const fadeExitActive = css`
  opacity: 0;
  transition: opacity 500ms ease-in-out;
`
