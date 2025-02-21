import { css } from '@emotion/css'
import { Breadcrumb } from 'antd'
import type { ItemType } from 'antd/es/breadcrumb/Breadcrumb'
import { useEffect, useState } from 'react'
import { Link, matchPath, useLocation } from 'react-router'

import getRoutes from '@/services/getRoutes'

const AppBreadcrumb = () => {
  const location = useLocation()
  const [breadcrumbs, setBreadcrumbs] = useState<ItemType[]>([])

  useEffect(() => {
    const routes = getRoutes()
    const route = routes.find((r) => {
      if (r.path) {
        return matchPath(r.path, location.pathname)
      }
      return false
    })
    const tempBreadcrumbs = routes.filter((r) => {
      return r.path === '/' || (route && r.path === route.handle.parentPath)
    })

    if (route && !tempBreadcrumbs.some((b) => b.path === route.path)) {
      tempBreadcrumbs.push(route)
    }

    const building: ItemType[] = []
    const sliced = tempBreadcrumbs.slice(0, 3)
    for (let i = 0; i < sliced.length; i++) {
      const path = sliced[i].path
      const title = sliced[i].handle.title
      if (path === route?.path) {
        building.push({ title })
      } else {
        building.push({ title: <Link to={path as string}>{title}</Link> })
      }
    }
    setBreadcrumbs(building)
  }, [location.pathname])

  const styles = {
    breadcrumb: css`
      margin-bottom: 16px;

      a {
        text-decoration: underline;
      }
    `,
  }

  return <Breadcrumb items={breadcrumbs} css={styles.breadcrumb} />
}

export default AppBreadcrumb
