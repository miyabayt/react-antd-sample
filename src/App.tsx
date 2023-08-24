import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import LoadingSpinner from '@/components/atoms/LoadingSpinner'
import NProgressIndicator from '@/components/atoms/NProgressIndicator'
import routes from '@/configs/routes'
import LoginPage from '@/pages/login'

function App() {
  return (
    <BrowserRouter>
      <NProgressIndicator />
      <React.Suspense fallback={<LoadingSpinner loading={true} />}>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          {routes.map((route, i) => (
            <Route key={i} path={route.path} element={route.element} />
          ))}
        </Routes>
      </React.Suspense>
    </BrowserRouter>
  )
}

export default App
