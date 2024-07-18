import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'

import NProgressIndicator from '@/components/atoms/NProgressIndicator'
import routes, { RouteConfig } from '@/configs/routes'
import LoginPage from '@/pages/login'
import { setNavigate } from '@/utils/fetcher'

function App() {
  const renderRoutes = (routes: RouteConfig[]) => {
    return routes.map((route, i) => {
      if (route.children) {
        return (
          <Route key={i} element={route.element}>
            <Route>{renderRoutes(route.children)}</Route>
          </Route>
        )
      } else {
        return <Route key={i} path={route.path} element={route.element} />
      }
    })
  }

  const RouterSetup = () => {
    const navigate = useNavigate()

    useEffect(() => {
      setNavigate(navigate)
    }, [navigate])

    return null
  }

  return (
    <BrowserRouter>
      <RouterSetup />
      <NProgressIndicator />
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        {renderRoutes(routes)}
      </Routes>
    </BrowserRouter>
  )
}

export default App
