import { lazy } from 'react'
import DefaultLayout from '@/components/templates/DefaultLayout'

const TopPage = lazy(() => import('@/pages/index'))
const HolidayEditPage = lazy(() => import('@/pages/system/holidays/edit/[id]'))
const HolidaySearchPage = lazy(() => import('@/pages/system/holidays/index'))
const HolidayNewPage = lazy(() => import('@/pages/system/holidays/new'))
const HolidayDetailPage = lazy(
  () => import('@/pages/system/holidays/show/[id]'),
)
const StaffEditPage = lazy(() => import('@/pages/system/staffs/edit/[id]'))
const StaffSearchPage = lazy(() => import('@/pages/system/staffs/index'))
const StaffNewPage = lazy(() => import('@/pages/system/staffs/new'))
const StaffDetailPage = lazy(() => import('@/pages/system/staffs/show/[id]'))
const UserEditPage = lazy(() => import('@/pages/user/users/edit/[id]'))
const UserSearchPage = lazy(() => import('@/pages/user/users/index'))
const UserNewPage = lazy(() => import('@/pages/user/users/new'))
const UserDetailPage = lazy(() => import('@/pages/user/users/show/[id]'))

export interface RouteConfig {
  path?: string
  title?: string
  parentPath?: string
  menuCode?: string
  element: React.ReactNode
  children?: RouteConfig[]
}

const routes = [
  {
    element: <DefaultLayout />,
    children: [
      {
        path: '/',
        title: 'トップ',
        parentPath: '/',
        menuCode: 'top',
        element: <TopPage />,
      },
      {
        path: '/user/users',
        title: '顧客マスタ検索',
        parentPath: '/',
        menuCode: 'user-menu',
        element: <UserSearchPage />,
      },
      {
        path: '/user/users/show/:id',
        title: '顧客マスタ詳細',
        parentPath: '/user/users',
        menuCode: 'user-menu',
        element: <UserDetailPage />,
      },
      {
        path: '/user/users/edit/:id',
        title: '顧客マスタ編集',
        parentPath: '/user/users',
        menuCode: 'user-menu',
        element: <UserEditPage />,
      },
      {
        path: '/user/users/new',
        title: '顧客マスタ登録',
        parentPath: '/user/users',
        menuCode: 'user-menu',
        element: <UserNewPage />,
      },
      {
        path: '/system/staffs',
        title: '担当者マスタ検索',
        parentPath: '/system/staffs',
        menuCode: 'system-menu',
        element: <StaffSearchPage />,
      },
      {
        path: '/system/staffs/show/:id',
        title: '担当者マスタ詳細',
        parentPath: '/system/staffs',
        menuCode: 'system-menu',
        element: <StaffDetailPage />,
      },
      {
        path: '/system/staffs/edit/:id',
        title: '担当者マスタ編集',
        parentPath: '/system/staffs',
        menuCode: 'system-menu',
        element: <StaffEditPage />,
      },
      {
        path: '/system/staffs/new',
        title: '担当者マスタ登録',
        parentPath: '/system/staffs',
        menuCode: 'system-menu',
        element: <StaffNewPage />,
      },
      {
        path: '/system/holidays',
        title: '祝日マスタ検索',
        parentPath: '/',
        menuCode: 'system-menu',
        element: <HolidaySearchPage />,
      },
      {
        path: '/system/holidays/show/:id',
        title: '祝日マスタ詳細',
        parentPath: '/system/holidays',
        menuCode: 'system-menu',
        element: <HolidayDetailPage />,
      },
      {
        path: '/system/holidays/edit/:id',
        title: '祝日マスタ編集',
        parentPath: '/system/holidays',
        menuCode: 'system-menu',
        element: <HolidayEditPage />,
      },
      {
        path: '/system/holidays/new',
        title: '祝日マスタ登録',
        parentPath: '/system/holidays',
        menuCode: 'system-menu',
        element: <HolidayNewPage />,
      },
      // {
      //   path: '/system/roles',
      //   title: 'ロールマスタ検索',
      //   parentPath: '/',
      //   menuCode: 'system-menu',
      // },
      // {
      //   path: '/system/roles/show/:id',
      //   title: 'ロールマスタ詳細',
      //   parentPath: '/system/roles',
      //   menuCode: 'system-menu',
      // },
      // {
      //   path: '/system/roles/edit/:id',
      //   title: 'ロールマスタ編集',
      //   parentPath: '/system/roles',
      //   menuCode: 'system-menu',
      // },
      // {
      //   path: '/system/roles/new',
      //   title: 'ロールマスタ登録',
      //   parentPath: '/system/roles',
      //   menuCode: 'system-menu',
      // },
      // {
      //   path: '/system/codes',
      //   title: 'コードマスタ検索',
      //   parentPath: '/',
      //   menuCode: 'system-menu',
      // },
      // {
      //   path: '/system/codes/show/:id',
      //   title: 'コードマスタ詳細',
      //   parentPath: '/system/codes',
      //   menuCode: 'system-menu',
      // },
      // {
      //   path: '/system/codes/edit/:id',
      //   title: 'コードマスタ編集',
      //   parentPath: '/system/codes',
      //   menuCode: 'system-menu',
      // },
      // {
      //   path: '/system/codes/new',
      //   title: 'コードマスタ登録',
      //   parentPath: '/system/codes',
      //   menuCode: 'system-menu',
      // },
    ],
  },
]

export default routes
