import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Cookie from 'js-cookie'

import LoadingSpinner from '@/components/atoms/LoadingSpinner'
import getLoginUser from '@/services/auth/getLoginUser'
import useAuthStore from '@/stores/useAuthStore'
import { isTokenExpired } from '@/utils/jwt'

type LoginRequiredProps = {
  children: React.ReactNode
}

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
      setIsLoading(true)
      try {
        const accessToken = Cookie.get('access_token')
        const expired = isTokenExpired(accessToken)
        if (expired || !accessToken) {
          console.log('checkAuth: invalid')
          setIsTokenValid(false)
          setRedirectTo(location.pathname)
          navigate('/login')
        } else {
          console.log('checkAuth: valid')
          setIsTokenValid(true)
          if (!loginUser) {
            const { data: loginUser, success } = await getLoginUser()
            if (success) {
              setLoginUser(loginUser)
            }
          }
        }
      } finally {
        setIsLoading(false)
      }
    }

    if (!isLoading) checkAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginUser])

  if (!loginUser || !isTokenValid) {
    console.log('loading...')
    return <LoadingSpinner loading={isLoading} />
  }

  return <>{children}</>
}

export default LoginRequired
