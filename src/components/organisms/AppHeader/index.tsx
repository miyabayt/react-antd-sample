import React, { createElement } from 'react'
import { css, ClassNames } from '@emotion/react'
import { Col, Layout, Row } from 'antd'
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from 'react-icons/ai'

import { shallow } from 'zustand/shallow'
import AppLogo from '@/components/molecules/AppLogo'
import UserProfile from '@/components/molecules/UserProfile'
import useSettingsStore from '@/stores/useSettingsStore'

const { Header } = Layout

interface AppHeaderProps {
  showTrigger?: boolean // 折りたたみアイコン表示有無（サイドバーが無い場合はfalseにする）
  showUserProfile?: boolean
  showAppLogo?: boolean
}

const AppHeader = ({
  showTrigger = true,
  showUserProfile = true,
  showAppLogo = false,
}: AppHeaderProps) => {
  const { collapsed, setCollapsed } = useSettingsStore(
    (state) => ({
      collapsed: state.collapsed,
      setCollapsed: state.setCollapsed,
    }),
    shallow,
  )

  const handleClick = () => {
    setCollapsed(!collapsed)
  }

  return (
    <Header css={styles.header}>
      <Row align='middle'>
        {showAppLogo && (
          <Col>
            <AppLogo />
          </Col>
        )}
        <ClassNames>
          {({ css }) => (
            <Col flex='100px'>
              {showTrigger &&
                createElement(
                  collapsed ? AiOutlineMenuUnfold : AiOutlineMenuFold,
                  {
                    className: css(styles.trigger),
                    onClick: handleClick,
                  },
                )}
            </Col>
          )}
        </ClassNames>
        <Col flex='auto' />
        <Col>{showUserProfile && <UserProfile />}</Col>
      </Row>
    </Header>
  )
}

const styles = {
  header: css`
    padding: 0 16px;
    height: 50px;
    background-color: #fff;
    line-height: 50px;
    border-bottom: 1px solid #d0d7de;
  `,

  trigger: css`
    font-size: 16px;
    cursor: pointer;
    transition: color 0.3s;
  `,
}

export default AppHeader
