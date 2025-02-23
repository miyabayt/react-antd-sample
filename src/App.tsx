import NProgressIndicator from '@/components/atoms/NProgressIndicator'
import routes from '@/configs/routes'
import LoginPage from '@/pages/login'
import { Outlet, type RouteObject, createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router'

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
