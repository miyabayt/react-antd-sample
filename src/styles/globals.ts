import { css } from '@emotion/react'

export const variables = {
  colorPrimary: '#1677ff',
  colorError: '#ff4d4f',
  backgroundColor: '#f5f5f5',
  borderColor: '#d9d9d9',
}

export const components = {
  AppHeader: {
    borderColor: variables.borderColor,
  },
  AppSidebar: {
    backgroundColor: variables.backgroundColor,
    borderColor: variables.borderColor,
  },
}

export const styles = {
  errorPage: css`
    h1 {
      font-size: 2rem;
    }
  `,
}

export const globalStyles = css`
  .ant-descriptions-item-label {
    color: black !important;
    font-weight: bold !important;
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
