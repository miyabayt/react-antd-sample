import { Buffer } from 'buffer'

export const isTokenExpired = (accessToken: string | undefined): boolean => {
  if (!accessToken) {
    return false
  }
  const expires = decodeJwt(accessToken).exp
  return expires * 1000 < Date.now()
}

const decodeJwt = (accessToken: string) => {
  const base64Url = accessToken.split('.')[1]
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  const decoded = Buffer.from(base64, 'base64').toString()
  return JSON.parse(decoded)
}
