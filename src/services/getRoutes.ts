import routes from '@/configs/routes'

interface Route {
  path: string
  title: string
  parentPath: string
  menuCode: string
}

const getRoutes = (): Route[] => {
  return routes
}

export default getRoutes
