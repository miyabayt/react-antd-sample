import type { Preview } from '@storybook/react'
import React from 'react'
import 'antd/dist/reset.css'

import { antdTheme } from '@/configs/theme'
import { globalStyles } from '@/styles/globals'
import { cache } from '@emotion/css'
import { CacheProvider, Global } from '@emotion/react'
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'
import { App as AntdApp, ConfigProvider } from 'antd'
import jaJP from 'antd/locale/ja_JP'
import { createMemoryRouter } from 'react-router'
import { RouterProvider } from 'react-router'

// ag-grid register all community features
ModuleRegistry.registerModules([AllCommunityModule])

// dummy
React.version

const RouterProviderWrapper = ({ Story, context }) => {
  const router = createMemoryRouter([
    {
      path: '/',
      element: <Story {...context} />,
    },
  ])

  return <RouterProvider router={router} />
}

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story, context) => (
      <CacheProvider value={cache}>
        <ConfigProvider theme={antdTheme} locale={jaJP}>
          <AntdApp>
            <Global styles={globalStyles} />
            <div style={{ width: context.parameters.width }}>
              <RouterProviderWrapper Story={Story} context={context} />
            </div>
          </AntdApp>
        </ConfigProvider>
      </CacheProvider>
    ),
  ],
}

export default preview
