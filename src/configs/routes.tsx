import DefaultLayout from '@/components/templates/DefaultLayout'
import { lazy } from 'react'

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
  handle?: {
    title?: string
    parentPath?: string
    menuCode?: string
  }
  element: React.ReactNode
  children?: RouteConfig[]
}

const routes = [
  {
    element: <DefaultLayout />,
    children: [
      {
        path: '/',
        element: <TopPage />,
        handle: { title: 'トップ', parentPath: '/', menuCode: 'top' },
      },
      {
        path: '/user/users',
        element: <UserSearchPage />,
        handle: {
          title: '顧客マスタ検索',
          parentPath: '/',
          menuCode: 'user-menu',
        },
      },
      {
        path: '/user/users/show/:id',
        element: <UserDetailPage />,
        handle: {
          title: '顧客マスタ詳細',
          parentPath: '/user/users',
          menuCode: 'user-menu',
        },
      },
      {
        path: '/user/users/edit/:id',
        element: <UserEditPage />,
        handle: {
          title: '顧客マスタ編集',
          parentPath: '/user/users',
          menuCode: 'user-menu',
        },
      },
      {
        path: '/user/users/new',
        element: <UserNewPage />,
        handle: {
          title: '顧客マスタ登録',
          parentPath: '/user/users',
          menuCode: 'user-menu',
        },
      },
      {
        path: '/system/staffs',
        element: <StaffSearchPage />,
        handle: {
          title: '担当者マスタ検索',
          parentPath: '/',
          menuCode: 'system-menu',
        },
      },
      {
        path: '/system/staffs/show/:id',
        element: <StaffDetailPage />,
        handle: {
          title: '担当者マスタ詳細',
          parentPath: '/system/staffs',
          menuCode: 'system-menu',
        },
      },
      {
        path: '/system/staffs/edit/:id',
        element: <StaffEditPage />,
        handle: {
          title: '担当者マスタ編集',
          parentPath: '/system/staffs',
          menuCode: 'system-menu',
        },
      },
      {
        path: '/system/staffs/new',
        element: <StaffNewPage />,
        handle: {
          title: '担当者マスタ登録',
          parentPath: '/system/staffs',
          menuCode: 'system-menu',
        },
      },
      {
        path: '/system/holidays',
        element: <HolidaySearchPage />,
        handle: {
          title: '祝日マスタ検索',
          parentPath: '/',
          menuCode: 'system-menu',
        },
      },
      {
        path: '/system/holidays/show/:id',
        element: <HolidayDetailPage />,
        handle: {
          title: '祝日マスタ詳細',
          parentPath: '/system/holidays',
          menuCode: 'system-menu',
        },
      },
      {
        path: '/system/holidays/edit/:id',
        element: <HolidayEditPage />,
        handle: {
          title: '祝日マスタ編集',
          parentPath: '/system/holidays',
          menuCode: 'system-menu',
        },
      },
      {
        path: '/system/holidays/new',
        element: <HolidayNewPage />,
        handle: {
          title: '祝日マスタ登録',
          parentPath: '/system/holidays',
          menuCode: 'system-menu',
        },
      },
      {
        path: '/system/roles',
        element: null,
        handle: {
          title: 'ロールマスタ検索',
          parentPath: '/',
          menuCode: 'system-menu',
        },
      },
      {
        path: '/system/roles/show/:id',
        element: null,
        handle: {
          title: 'ロールマスタ詳細',
          parentPath: '/system/roles',
          menuCode: 'system-menu',
        },
      },
      {
        path: '/system/roles/edit/:id',
        element: null,
        handle: {
          title: 'ロールマスタ編集',
          parentPath: '/system/roles',
          menuCode: 'system-menu',
        },
      },
      {
        path: '/system/roles/new',
        element: null,
        handle: {
          title: 'ロールマスタ登録',
          parentPath: '/system/roles',
          menuCode: 'system-menu',
        },
      },
      {
        path: '/system/codes',
        element: null,
        handle: {
          title: 'コードマスタ検索',
          parentPath: '/',
          menuCode: 'system-menu',
        },
      },
      {
        path: '/system/codes/show/:id',
        element: null,
        handle: {
          title: 'コードマスタ詳細',
          parentPath: '/system/codes',
          menuCode: 'system-menu',
        },
      },
      {
        path: '/system/codes/edit/:id',
        element: null,
        handle: {
          title: 'コードマスタ編集',
          parentPath: '/system/codes',
          menuCode: 'system-menu',
        },
      },
      {
        path: '/system/codes/new',
        element: null,
        handle: {
          title: 'コードマスタ登録',
          parentPath: '/system/codes',
          menuCode: 'system-menu',
        },
      },
    ],
  },
]

export default routes
