import { Global, css } from '@emotion/react'
import { Badge } from 'antd'
import type { BadgeProps as AntdBadgeProps } from 'antd/lib/badge'
import type React from 'react'
import { forwardRef } from 'react'

const backgroundColorMap: Record<string, string> = {
  badge: '#DC362E',
  required: '#B3261E',
  add: '#21428B',
  delete: '#F4A700',
  notice: '#B95E00',
  question: 'white',
  answer: 'white',
  warning: '#F9DEDC',
}

const textColorMap: Record<string, string> = {
  badge: 'white',
  required: 'white',
  add: 'white',
  delete: 'white',
  notice: 'white',
  question: '#197A4B',
  answer: '#B3261E',
  warning: '#B3261E',
}

const defaultText: Record<string, string | null> = {
  badge: null,
  required: '必須',
  add: '追加',
  delete: '削除',
  notice: '通知',
  question: '質問',
  answer: '回答',
}

interface ExtendedBadgeProps extends Omit<AntdBadgeProps, 'type' | 'text'> {
  category?:
    | 'badge'
    | 'required'
    | 'add'
    | 'delete'
    | 'notice'
    | 'question'
    | 'answer'
    | 'warning'
    | 'unknown'
  shape?: 'default' | 'circle' | 'round'
  disabled?: boolean
  text?: string
  textColor?: string
}

const AppBadge = forwardRef<HTMLSpanElement, ExtendedBadgeProps>(
  (
    {
      category = 'unknown',
      shape = 'default',
      disabled = false,
      style,
      text,
      count,
      children,
      color,
      ...restProps
    },
    ref,
  ) => {
    const computedStyle: React.CSSProperties =
      shape === 'default'
        ? {
            borderRadius: 4,
            paddingTop: 0.5,
            marginLeft: 6,
          }
        : {
            borderRadius: 20,
            paddingTop: 6,
            marginLeft: 6,
            textAlign: 'center',
            height: 35,
            width: ['notice', 'question', 'answer'].includes(category)
              ? 120
              : undefined,
          }

    // 背景色に基づいてボーダースタイルを設定
    const backgroundColor = disabled
      ? '#BDBDBD'
      : color || backgroundColorMap[category]
    const textColor = textColorMap[category]
    const borderStyle =
      backgroundColor === 'white' ? { border: `1px solid ${textColor}` } : {}

    const mergedStyle: React.CSSProperties = {
      ...computedStyle,
      ...style,
      ...borderStyle,
      backgroundColor,
      color: textColor,
    }

    // テキストを設定
    let labelText = text
    if (defaultText[category] && count) {
      labelText = `${defaultText[category]} (${count})`
    } else {
      labelText = text || defaultText[category] || ''
    }

    // グローバルスタイルを定義
    const GlobalStyles = (
      <Global
        styles={css`
          .app-label.no-corner .ant-ribbon-corner {
            display: none;
          }
          .app-label .ant-ribbon-text {
            color: ${restProps.textColor || textColorMap[category]} !important;
          }
        `}
      />
    )

    if (category === 'badge') {
      return (
        <Badge
          {...restProps}
          className='app-label'
          style={mergedStyle}
          count={count}
          showZero
        />
      )
    }

    return (
      <>
        {GlobalStyles}
        <Badge.Ribbon
          {...restProps}
          className='app-label no-corner'
          style={mergedStyle}
          text={<span style={{ color: textColor }}>{labelText}</span>}
          color={backgroundColor}
        >
          {children}
        </Badge.Ribbon>
      </>
    )
  },
)

AppBadge.displayName = 'AppBadge'

export default AppBadge
