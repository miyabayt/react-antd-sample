import crypto from 'crypto-js'
import { StateStorage } from 'zustand/middleware'

import { SECRET_KEY } from '@/configs/app'

// SessionStorageを難読化する
const encryptedSessionStorage: StateStorage = {
  getItem: (name: string): string | null => {
    const encrypted = sessionStorage.getItem(name)
    if (encrypted) {
      const decrypted = crypto.AES.decrypt(encrypted, SECRET_KEY)
      return decrypted.toString()
    }
    return null
  },
  setItem: (name: string, value: string): void => {
    const encrypted = crypto.AES.encrypt(value, SECRET_KEY)
    sessionStorage.setItem(name, encrypted.toString())
  },
  removeItem: (name: string): void => {
    sessionStorage.removeItem(name)
  },
}

export default encryptedSessionStorage
