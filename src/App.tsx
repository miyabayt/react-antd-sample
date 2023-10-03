import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import NProgressIndicator from '@/components/atoms/NProgressIndicator'
import routes, { RouteConfig } from '@/configs/routes'
import LoginPage from '@/pages/login'

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

  return (
    <BrowserRouter>
      <NProgressIndicator />
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        {renderRoutes(routes)}
      </Routes>
    </BrowserRouter>
  )
}

export default App
