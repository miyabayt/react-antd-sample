import { createAccessToken } from '../utils.js'

export default [
  {
    path: '/api/auth/login',
    method: 'post',
    handler: (req, res) => {
      const { username, password } = req.body

      if (username === 'test@example.com' && password === 'passw0rd') {
        const accessToken = createAccessToken({ expiresIn: '5m' })
        const refreshToken = createAccessToken()

        res.cookie('refresh_token', refreshToken, {
          httpOnly: true,
          secure: false, // HTTPSが必須の場合はtrue
        })

        return res.json({
          data: {
            accessToken: accessToken,
          },
          success: true,
          message: '正常終了',
        })
      }
      return res.status(401).json({
        success: false,
        message: 'Invalid ID or password',
      })
    },
  },
  {
    path: '/api/auth/refresh',
    method: 'post',
    handler: (req, res) => {
      const accessToken = createAccessToken({ expiresIn: '5m' })
      const refreshToken = createAccessToken()

      res.cookie('refresh_token', refreshToken, {
        httpOnly: true,
        secure: false, // HTTPSが必須の場合はtrue
      })

      return res.json({
        data: {
          accessToken: accessToken,
        },
        success: true,
        message: '正常終了',
      })
    },
  },
  {
    path: '/api/auth/me',
    method: 'get',
    handler: (req, res) => {
      return res.json({
        data: {
          createdAt: '2024-08-07T23:37:37',
          updatedAt: '2024-08-07T23:37:37',
          version: 1,
          id: 1,
          firstName: '太郎',
          lastName: '山田',
          email: 'test@example.com',
          tel: '09011112222',
          tokenExpiresAt: null,
        },
        success: true,
        message: '正常終了',
      })
    },
  },
]
