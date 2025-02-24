import jaJP from 'antd/locale/ja_JP'
import type { ValidateMessages } from 'rc-field-form/lib/interface'

export const validateMessages: ValidateMessages = {
  ...jaJP.Form?.defaultValidateMessages,
  types: {
    email: '有効なメールアドレスを入力してください',
  },
}
