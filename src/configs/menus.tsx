import { ReactElement } from 'react'
import { AiOutlineSetting, AiOutlineUser, AiOutlineHome } from 'react-icons/ai'
import { Link } from 'react-router-dom'

export type MenuItem = {
  key: string
  label: ReactElement | string
  icon?: ReactElement
  children?: MenuItem[]
}

const menus: MenuItem[] = [
  {
    key: '/',
    label: <Link to='/'>トップ</Link>,
    icon: <AiOutlineHome />,
  },
  {
    key: 'user-menu',
    label: '顧客管理',
    icon: <AiOutlineUser />,
    children: [
      {
        key: '/user/users',
        label: <Link to='/user/users'>顧客マスタ</Link>,
      },
    ],
  },
  {
    key: 'system-menu',
    label: 'システム設定',
    icon: <AiOutlineSetting />,
    children: [
      {
        key: '/system/staffs',
        label: <Link to='/system/staffs'>担当者マスタ</Link>,
      },
      {
        key: '/system/holidays',
        label: <Link to='/system/holidays'>祝日マスタ</Link>,
      },
    ],
  },
]

export default menus
