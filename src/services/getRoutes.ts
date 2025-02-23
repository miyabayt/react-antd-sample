import routes from '@/configs/routes'
import type { RouteObject } from 'react-router'

const flattenRoutes = (routes: RouteObject[]): RouteObject[] => {
  return routes.flatMap((route) => {
    if (route.children && route.children.length > 0) {
      return flattenRoutes(route.children)
    }

    if (
      route.path &&
      route.handle.title &&
      route.handle.parentPath &&
      route.handle.menuCode
    ) {
      return [route]
    }

    return []
  })
}

const getRoutes = (): RouteObject[] => {
  return flattenRoutes(routes)
}

export default getRoutes
