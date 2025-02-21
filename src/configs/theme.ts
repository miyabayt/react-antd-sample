import { variables } from '@/styles/globals'
import type { ThemeConfig } from 'antd'

export const antdTheme: ThemeConfig = {
  // see: https://ant.design/docs/react/customize-theme#theme
  token: {
    fontFamily: 'Noto Sans JP, sans-serif',
    colorPrimary: variables.colorPrimary,
    colorError: variables.colorError,
    borderRadius: 3,
    colorBorder: variables.borderColor,
    colorBorderSecondary: variables.borderColor,
    controlHeight: 36,
    colorLink: variables.colorPrimary,
    colorTextPlaceholder: variables.borderColor,
    paddingContentVertical: 20,
  },
  components: {
    Breadcrumb: {
      linkColor: variables.colorPrimary,
    },
    Button: {
      colorText: variables.colorPrimary,
      borderRadius: 6,
    },
    Card: {
      padding: 16,
      headerFontSize: 16,
      headerPadding: 16,
      headerHeight: 52,
      bodyPadding: 16,
    },
    Descriptions: {
      fontSize: 14,
      labelBg: variables.backgroundColor,
      borderRadius: 3,
    },
    Form: {
      verticalLabelPadding: '0 0 2px',
    },
    Modal: {
      padding: 16,
    },
    Table: {
      headerBg: variables.backgroundColor,
    },
  },
}
