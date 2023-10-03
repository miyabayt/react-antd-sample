import routes, { RouteConfig } from '@/configs/routes'

interface Route {
  path: string
  title: string
  parentPath: string
  menuCode: string
}

const flattenRoutes = (routes: RouteConfig[]): Route[] => {
  return routes.reduce<Route[]>((flatten, route) => {
    if (route.children && route.children.length > 0) {
      flatten = flatten.concat(flattenRoutes(route.children))
    } else if (
      route.path &&
      route.title &&
      route.parentPath &&
      route.menuCode
    ) {
      flatten.push({
        path: route.path,
        title: route.title,
        parentPath: route.parentPath,
        menuCode: route.menuCode,
      })
    }
    return flatten
  }, [])
}

const getRoutes = (): Route[] => {
  return flattenRoutes(routes)
}

export default getRoutes
