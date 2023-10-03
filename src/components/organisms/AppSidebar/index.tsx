import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { css } from '@emotion/react'
import { Layout, Menu } from 'antd'

import AppLogo from '@/components/molecules/AppLogo'
import { MenuItem } from '@/configs/menus'
import getMenus from '@/services/getMenus'
import getRoutes from '@/services/getRoutes'
import useSettingsStore from '@/stores/useSettingsStore'

import type { MenuProps } from 'antd'

const { Sider } = Layout

const AppSidebar = () => {
  const location = useLocation()
  const [sidebarItems, setSidebarItems] = useState<MenuItem[]>([])
  const {
    collapsed,
    openKeys,
    activeMenuKeys,
    setOpenKeys,
    setActiveMenuKeys,
  } = useSettingsStore((state) => state)

  const isSubMenuKey = (menus: MenuItem[], targetKey: string): boolean => {
    return menus.some((m) => {
      if (m.key === targetKey) {
        return true
      }
      if (m.children) {
        return isSubMenuKey(m.children, targetKey)
      }
      return false
    })
  }

  useEffect(() => {
    const menus = getMenus()
    setSidebarItems(menus)

    const routes = getRoutes()
    const route = routes.find((r) => r.path === location.pathname)
    if (route) {
      setOpenKeys([route.menuCode])

      if (isSubMenuKey(menus, route.path)) {
        setActiveMenuKeys([route.path])
      } else {
        setActiveMenuKeys([route.parentPath])
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  const onOpenChange: MenuProps['onOpenChange'] = (keys: string[]) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1)
    setOpenKeys(latestOpenKey ? [latestOpenKey] : [''])
  }

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      width={250}
      collapsedWidth={50}
      css={styles.sider}
      theme='light'
    >
      <AppLogo collapseLogo={true} />
      <div css={styles.menuContainer}>
        <Menu
          mode='inline'
          theme='light'
          style={{ border: 0 }}
          selectedKeys={activeMenuKeys}
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          items={sidebarItems}
        />
      </div>
    </Sider>
  )
}

const styles = {
  sider: css`
    border-right: 1px solid #d0d7de;
  `,

  menuContainer: css`
    height: calc(100vh - 50px);
  `,
}

export default AppSidebar
