import AppModal from '@/components/molecules/AppModal'
import { getMaxZIndex } from '@/components/molecules/AppModal/utils'
import { Grid, type ModalProps } from 'antd'
import type React from 'react'
import { createContext, useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router'

type AppModalContextType = {
  openModal: (props: openModalProps) => void
}

const AppModalContext = createContext<AppModalContextType | undefined>(
  undefined,
)

interface openModalProps extends Omit<ModalProps, 'width'> {
  content?: React.ReactNode
  movable?: boolean
  width?: number
  height?: string | number
}

export const AppModalProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const location = useLocation()
  const screens = Grid.useBreakpoint()
  const [modals, setModals] = useState<
    (openModalProps & { id: string; zIndex: number })[]
  >([])

  const openModal = (props: openModalProps) => {
    const {
      centered = true,
      closable = true,
      mask = true,
      maskClosable = true,
      title = null,
      content,
      footer = null,
      movable = false,
      width = screens.lg ? 800 : 600,
      height,
      getContainer = false,
      zIndex: propZIndex,
      ...restProps
    } = props

    const id = `modal-${modals.length}`

    let zIndex = 1000
    if (propZIndex) {
      zIndex = propZIndex
    } else {
      const maxZIndex = getMaxZIndex({ min: 1000 })
      if (maxZIndex > 0) {
        zIndex = maxZIndex
      }
    }

    setModals([
      ...modals,
      {
        id,
        centered,
        closable,
        mask,
        maskClosable,
        title,
        content,
        footer,
        movable,
        width,
        height,
        getContainer,
        zIndex,
        ...restProps,
      },
    ])
  }

  const closeModal = (id: string) => {
    setModals((prevModals) => prevModals.filter((modal) => modal.id !== id))
  }

  useEffect(() => {
    setModals([])
  }, [location.pathname])

  useEffect(() => {
    let modalRoot = document.getElementById('modal-root')
    if (!modalRoot) {
      modalRoot = document.createElement('div')
      modalRoot.id = 'modal-root'
      document.body.appendChild(modalRoot)
    }
  }, [])

  return (
    <AppModalContext.Provider
      value={{
        openModal,
      }}
    >
      {children}
      {modals.map(
        (
          {
            id,
            title,
            width,
            movable,
            height,
            content,
            getContainer,
            zIndex,
            ...restProps
          },
          index,
        ) => (
          <AppModal
            key={id}
            title={title}
            width={width}
            movable={movable}
            height={height}
            {...restProps}
            open={true}
            onClose={() => closeModal(id)}
            onCancel={() => closeModal(id)}
            getContainer={getContainer}
            zIndex={zIndex + index}
            rootClassName='app-modal'
          >
            {content}
          </AppModal>
        ),
      )}
    </AppModalContext.Provider>
  )
}

export const useAppModal = (): AppModalContextType => {
  const context = useContext(AppModalContext)
  if (!context) {
    throw new Error('useAppModal must be used within a AppModalProvider')
  }
  return context
}
