import { css } from '@emotion/react'
import { Flex, theme } from 'antd'
import { Link, type To } from 'react-router'

interface HorizontalListProps {
  title?: string
  justify?: React.CSSProperties['justifyContent']
  gap?: number
  bordered?: boolean
  padding?: number
  backgroundColor?: string
  items: (LabelLink | LabelValue)[]
}

interface LabelLink {
  label: string
  to: To
  text: string | number
}

interface LabelValue {
  label?: string
  value: React.ReactNode
  backgroundColor?: string
  padding?: number
}

const HorizontalList = (props: HorizontalListProps) => {
  const { token } = theme.useToken()
  const {
    title,
    items = [],
    justify = 'flex-start',
    gap = 16,
    bordered = false,
    padding,
    backgroundColor,
  } = props

  const styles = {
    horizontalListContainer: css`
      ${backgroundColor ? `background-color: ${backgroundColor};` : ''}
      ${bordered ? `border: 1px solid ${token.colorPrimary};` : ''}
      ${padding ? `padding: ${padding}px;` : ''}
      margin-bottom: 16px;

      a {
        text-decoration: underline;
      }
    `,

    header: css`
      font-weight: bold;
      color: ${token.colorPrimary};
    `,
  }

  return (
    <Flex
      wrap
      gap={gap}
      justify={justify}
      align='center'
      css={styles.horizontalListContainer}
    >
      {title && <div css={styles.header}>{title}</div>}
      {items.map((item, index) => {
        const key = `hl-${index}`
        const style = {
          ...('padding' in item ? { padding: item.padding } : {}),
          ...('backgroundColor' in item
            ? { backgroundColor: item.backgroundColor }
            : {}),
        }

        if ('to' in item) {
          return (
            <Flex key={key} wrap gap={10} align='center' style={style}>
              <span>{item.label}</span>
              <Link to={item.to}>{item.text}</Link>
            </Flex>
          )
        }
        if ('value' in item) {
          if (item.label) {
            return (
              <Flex key={key} wrap gap={10} align='center' style={style}>
                <strong>{item.label}</strong>
                <span>{item.value}</span>
              </Flex>
            )
          }

          return (
            <Flex key={key} wrap align='center' style={style}>
              <span>{item.value}</span>
            </Flex>
          )
        }
      })}
    </Flex>
  )
}

export default HorizontalList
