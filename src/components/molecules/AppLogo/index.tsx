import { useNavigate } from 'react-router-dom'
import { css } from '@emotion/react'
import { shallow } from 'zustand/shallow'
import useSettingsStore from '@/stores/useSettingsStore'

interface AppLogoProps {
  collapseLogo?: boolean // サイドバーが無い場合はfalseにする
}

const AppLogo = ({ collapseLogo = false }: AppLogoProps) => {
  const navigate = useNavigate()
  const { collapsed } = useSettingsStore(
    (state) => ({ collapsed: state.collapsed }),
    shallow,
  )

  const handleClick = () => {
    navigate('/')
  }

  return (
    <div css={styles.logo} onClick={handleClick}>
      <strong>{collapseLogo && collapsed ? <>SA</> : <>Sample Admin</>}</strong>
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
