import { css } from '@emotion/react'
import { Tag, type TagProps, theme } from 'antd'

type AppTagProps = TagProps & {
  round?: boolean
  size?: 'small' | 'middle' | 'large'
  checkable?: boolean
  checked?: boolean
  onChecked?: (checked: boolean) => void
  colorChecked?: string
}

const AppTag = (props: AppTagProps) => {
  const {
    round = false,
    size = 'middle',
    color,
    checkable = false,
    checked = false,
    onChecked,
    colorChecked = color,
    ...restProps
  } = props
  const { token } = theme.useToken()
  //const [checked, setChecked] = useState(false)

  let fontSize = token.fontSizeSM
  if (size === 'middle') {
    fontSize = token.fontSize
  } else if (size === 'large') {
    fontSize = token.fontSizeLG
  }

  let paddingV = 2 + (round ? 0 : 0)
  if (size === 'middle') {
    paddingV = paddingV + 2 + (round ? 1 : 0)
  } else if (size === 'large') {
    paddingV = paddingV + 4 + (round ? 2 : 0)
  }

  let paddingH = 2 + (round ? 0 : 0)
  if (size === 'middle') {
    paddingH = paddingH + 2 + (round ? 1 : 0)
  } else if (size === 'large') {
    paddingH = paddingH + 4 + (round ? 2 : 0)
  }

  let paddingInline = 7
  if (size === 'middle') {
    paddingInline = paddingInline + 3
  } else if (size === 'large') {
    paddingInline = paddingInline + 3
  }

  const handleClick = () => {
    if (onChecked) {
      onChecked(!checked)
    }
  }

  const styles = {
    squareTag: css`
      padding: ${paddingV}px ${paddingH}px;
      padding-inline: ${paddingInline}px;
      text-align: center;
      font-size: ${fontSize}px;
      ${checkable ? 'cursor: pointer;' : null}
    `,

    roundTag: css`
      padding: ${paddingV}px ${paddingH}px;
      padding-inline: ${paddingInline}px;
      border-radius: 20px;
      text-align: center;
      font-size: ${fontSize}px;
      ${checkable ? 'cursor: pointer;' : null}
    `,
  }

  return (
    <Tag
      css={round ? styles.roundTag : styles.squareTag}
      color={checkable && checked ? colorChecked : color}
      onClick={handleClick}
      {...restProps}
    />
  )
}

export default AppTag
