import TopPage from '@/pages/index'
import HolidayEditPage from '@/pages/system/holidays/edit/[id]'
import HolidaySearchPage from '@/pages/system/holidays/index'
import HolidayNewPage from '@/pages/system/holidays/new'
import HolidayDetailPage from '@/pages/system/holidays/show/[id]'
import StaffEditPage from '@/pages/system/staffs/edit/[id]'
import StaffSearchPage from '@/pages/system/staffs/index'
import StaffNewPage from '@/pages/system/staffs/new'
import StaffDetailPage from '@/pages/system/staffs/show/[id]'
import UserEditPage from '@/pages/user/users/edit/[id]'
import UserSearchPage from '@/pages/user/users/index'
import UserNewPage from '@/pages/user/users/new'
import UserDetailPage from '@/pages/user/users/show/[id]'

const routes = [
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
]

export default routes
