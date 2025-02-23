import { cache } from '@emotion/css'
import { CacheProvider } from '@emotion/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { App as AntdApp, ConfigProvider } from 'antd'
import 'antd/dist/reset.css'
import React from 'react'
import ReactDOM from 'react-dom/client'

import { antdTheme } from '@/configs/theme'
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'
import jaJP from 'antd/locale/ja_JP'
import App from './App'
import reportWebVitals from './reportWebVitals'

// ag-grid register all community features
ModuleRegistry.registerModules([AllCommunityModule])

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <CacheProvider value={cache}>
      <ConfigProvider theme={antdTheme} locale={jaJP}>
        <AntdApp>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </AntdApp>
      </ConfigProvider>
    </CacheProvider>
  </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
