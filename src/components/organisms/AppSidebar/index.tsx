import { css } from '@emotion/react'
import { Layout, Menu } from 'antd'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router'

import AppLogo from '@/components/molecules/AppLogo'
import type { MenuItem } from '@/configs/menus'
import getMenus from '@/services/getMenus'
import getRoutes from '@/services/getRoutes'
import useSettingsStore from '@/stores/useSettingsStore'

import type { MenuProps } from 'antd'
import _ from 'lodash'
import { useShallow } from 'zustand/shallow'

const AppSidebar = () => {
  const location = useLocation()
  const [defaultOpenKeys, setDefaultOpenKeys] = useState<string[]>([])
  const [sidebarItems, setSidebarItems] = useState<MenuItem[]>([])
  const {
    sidebarCollapsed,
    menuOpenKeys,
    activeMenuKeys,
    setMenuOpenKeys,
    setActiveMenuKeys,
    setSidebarCollapsed,
  } = useSettingsStore(useShallow((state) => state))

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
    setDefaultOpenKeys(menus.map((m) => m.key))

    const routes = getRoutes()
    const route = routes.find((r) => r.path === location.pathname)
    if (route?.path) {
      setMenuOpenKeys(_.uniq([route.handle.menuCode, ...menuOpenKeys]))

      if (isSubMenuKey(menus, route.path)) {
        setActiveMenuKeys([route.path])
      } else {
        setActiveMenuKeys([route.handle.parentPath])
      }
    }
  }, [location.pathname])

  const onOpenChange: MenuProps['onOpenChange'] = (keys: string[]) => {
    // const latestOpenKey = keys.find((key) => menuOpenKeys.indexOf(key) === -1)
    // setMenuOpenKeys(latestOpenKey ? [latestOpenKey] : ['']) // ひとつだけ開く
    setMenuOpenKeys(keys)
  }

  return (
    <Layout.Sider
      trigger={null}
      collapsible
      collapsed={sidebarCollapsed}
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
          openKeys={menuOpenKeys}
          onOpenChange={onOpenChange}
          items={sidebarItems}
        />
      </div>
    </Layout.Sider>
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
