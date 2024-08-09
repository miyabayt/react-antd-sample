import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import LoadingSpinner from '@/components/atoms/LoadingSpinner'
import getLoginUser from '@/services/auth/getLoginUser'
import useAuthStore from '@/stores/useAuthStore'

type LoginRequiredProps = {
  children: React.ReactNode
}

type PromiseResolver = (() => void) | null

let isTokenRefreshing = false
let refreshPromiseResolver: PromiseResolver = null

const LoginRequired = ({ children }: LoginRequiredProps) => {
  const location = useLocation()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [isTokenValid, setIsTokenValid] = useState(false)
  const { loginUser, setLoginUser, setRedirectTo } = useAuthStore(
    (state) => state,
  )

  useEffect(() => {
    const checkAuth = async () => {
      if (isTokenRefreshing) {
        await new Promise<void>((resolve) => {
          refreshPromiseResolver = resolve
        })
        return
      }

      let valid = false
      isTokenRefreshing = true
      setIsLoading(true)
      try {
        const { data: loginUser, success } = await getLoginUser()
        if (success) {
          console.log('checkAuth: valid')
          setIsTokenValid(true)
          setLoginUser(loginUser)
          valid = true
        }
      } finally {
        if (!valid) {
          console.log('checkAuth: invalid')
          setIsTokenValid(false)
          setLoginUser(null)
          setRedirectTo(location.pathname)
          navigate('/login')
        }
        isTokenRefreshing = false
        if (refreshPromiseResolver) {
          refreshPromiseResolver()
          refreshPromiseResolver = null
        }
        setIsLoading(false)
      }
    }

    if (!isLoading) checkAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!loginUser || !isTokenValid) {
    return <LoadingSpinner loading={isLoading} />
  }

  return <>{children}</>
}

export default LoginRequired
