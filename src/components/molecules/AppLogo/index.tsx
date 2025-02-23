import useSettingsStore from '@/stores/useSettingsStore'
import { css } from '@emotion/react'
import { useNavigate } from 'react-router'

interface AppLogoProps {
  collapseLogo?: boolean // サイドバーが無い場合はfalseにする
}

const AppLogo = ({ collapseLogo = false }: AppLogoProps) => {
  const navigate = useNavigate()
  const sidebarCollapsed = useSettingsStore((state) => state.sidebarCollapsed)

  const handleClick = () => {
    navigate('/')
  }

  return (
    <div css={styles.logo} onClick={handleClick} onKeyUp={handleClick}>
      <strong>
        {collapseLogo && sidebarCollapsed ? <>SA</> : <>Sample Admin</>}
      </strong>
    </div>
  )
}

const styles = {
  logo: css`
    font-size: 1rem;
    height: 50px;
    line-height: 50px;
    text-align: center;
    cursor: pointer;
  `,
}

export default AppLogo
