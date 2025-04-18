import NProgressIndicator from '@/components/atoms/NProgressIndicator'
import routes from '@/configs/routes'
import LoginPage from '@/pages/login'
import { Outlet, type RouteObject, createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router'
import ErrorPageLayout from './components/templates/ErrorPageLayout'
import ErrorPage from './pages/error'

function App() {
  const renderRoutes = (routes: RouteObject[]): RouteObject[] => {
    return routes.map((route) => ({
      path: route.path,
      element: route.element,
      handle: route.handle,
      children: route.children ? renderRoutes(route.children) : undefined,
    }))
  }

  const router = createBrowserRouter([
    {
      element: (
        <>
          <Outlet />
          <div id='modal-root' />
        </>
      ),
      children: [
        {
          path: '/login',
          element: <LoginPage />,
        },
        ...renderRoutes(routes),
        {
          element: <ErrorPageLayout />,
          children: [
            {
              path: '/error',
              element: (
                <ErrorPage description='予期せぬエラーが発生しました。' />
              ),
            },
            {
              path: '/notfound', // 404エラー
              element: (
                <ErrorPage
                  description='ページが見つかりません。'
                  type='warning'
                />
              ),
            },
            {
              path: '*', // 404エラー
              element: (
                <ErrorPage
                  description='ページが見つかりません。'
                  type='warning'
                />
              ),
            },
          ],
        },
      ],
    },
  ])

  return (
    <>
      <NProgressIndicator />
      <RouterProvider router={router} />
    </>
  )
}

export default App
