import { getMaxZIndex } from '@/components/molecules/AppModal/utils'
import { Global } from '@emotion/react'
import type { ModalProps } from 'antd'
import { Grid, Modal } from 'antd'
import { useState } from 'react'
import ReactDOM from 'react-dom'
import Draggable from 'react-draggable'
import modalStyles from './styles'

export interface AppModalProps extends ModalProps {
  movable?: boolean
}

const AppModal = (props: AppModalProps) => {
  const screens = Grid.useBreakpoint()
  const {
    centered = true,
    closable = true,
    mask = true,
    maskClosable = true,
    title = null,
    footer = null,
    movable = false,
    width = screens.lg ? 800 : 600,
    height,
    zIndex: propZIndex = 1000,
    wrapClassName = 'app-modal',
    getContainer = false,
    ...restProps
  } = props

  const styles = modalStyles(height)
  const [zIndex, setZIndex] = useState(propZIndex)

  const handleMouseDown = () => {
    // 最前面に表示する
    const maxZIndex = getMaxZIndex({ min: 1000 })
    setZIndex(maxZIndex + 1)
  }

  return (
    <>
      {ReactDOM.createPortal(
        <Modal
          centered={centered}
          closable={closable}
          mask={mask && !movable}
          maskClosable={maskClosable && !movable}
          title={<div css={styles.modalTitle}>{title}</div>}
          getContainer={getContainer}
          footer={footer}
          width={width}
          zIndex={zIndex}
          wrapClassName='app-modal'
          modalRender={(modal) => (
            <>
              {movable ? (
                <>
                  <Global styles={styles.global} />
                  <Draggable onMouseDown={handleMouseDown}>{modal}</Draggable>
                </>
              ) : (
                <>{modal}</>
              )}
            </>
          )}
          {...restProps}
        />,
        document.getElementById('modal-root') as HTMLDivElement,
      )}
    </>
  )
}

export default AppModal
