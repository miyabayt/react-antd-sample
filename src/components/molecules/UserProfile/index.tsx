import { ClassNames, css } from '@emotion/react'
import { Avatar, Button, Dropdown, Menu, Space, Switch } from 'antd'
import { useState } from 'react'
import { AiOutlineDown, AiOutlineUser } from 'react-icons/ai'
import { useLocation, useNavigate } from 'react-router'

import logout from '@/services/auth/logout'
import useAuthStore from '@/stores/useAuthStore'

import type { MenuProps } from 'antd'
import { useShallow } from 'zustand/shallow'

const UserProfile = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { loginUser } = useAuthStore(useShallow((state) => state))

  // TODO
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const handleLogout = async () => {
    const { status } = await logout()

    if (status < 500) {
      navigate('/login')
      return
    }

    // TODO: toast?
  }

  const items: MenuProps['items'] = [
    {
      key: 'profile',
      label: `${loginUser?.firstName} さん`,
    },
    {
      key: '2',
      type: 'divider',
    },
    {
      key: 'darkMode',
      label: (
        <Space size='large'>
          ダークモード
          <Switch size='small' onClick={(_checked, e) => e.stopPropagation()} />
        </Space>
      ),
    },
    {
      key: '4',
      type: 'divider',
    },
    {
      key: 'logout',
      label: 'ログアウト',
      onClick: async () => {
        await handleLogout()
        setDropdownOpen(false)
      },
    },
  ]

  const dropdownRender = () => (
    <Menu items={items} onMouseDown={(e) => e.stopPropagation()} />
  )

  return (
    <ClassNames>
      {({ css }) => (
        <Dropdown
          overlayClassName={css(styles.dropdownMenu)}
          dropdownRender={dropdownRender}
          placement='bottomRight'
          trigger={['click']}
        >
          <Button
            type='link'
            onClick={(e) => e.preventDefault()}
            onKeyUp={(e) => e.preventDefault()}
            style={{ padding: 0 }}
          >
            <Space>
              <Avatar css={styles.avatar} icon={<AiOutlineUser />} />
              {`${loginUser?.lastName} ${loginUser?.firstName}`}
              <AiOutlineDown />
            </Space>
          </Button>
        </Dropdown>
      )}
    </ClassNames>
  )
}

const styles = {
  avatar: css`
    padding-top: 2px;
    margin-top: -5px;
    cursor: pointer;
  `,

  dropdownMenu: css`
    width: 180px;
  `,
}

export default UserProfile
