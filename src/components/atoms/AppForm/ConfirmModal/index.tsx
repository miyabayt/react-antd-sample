import { Flex } from 'antd'
import type { HookAPI } from 'antd/es/modal/useModal'
import Spacer from '../../Spacer'

// DS-COM-015
// TODO: 画面標準設計書と見た目が異なる
export const openConfirmModal = ({
  modal,
  onOk,
  onCancel,
}: { modal: HookAPI; onOk: () => void; onCancel: () => void }) => {
  modal.confirm({
    icon: <></>,
    centered: true,
    autoFocusButton: 'cancel',
    title: <div style={{ textAlign: 'center' }}>未保存確認</div>,
    content: (
      <div style={{ textAlign: 'center' }}>
        <Spacer py={10}>
          入力された内容は保存されません。
          <br />
          本画面を閉じますか。
        </Spacer>
      </div>
    ),
    width: 300,
    okText: '保存せずに閉じる',
    okButtonProps: { danger: true },
    cancelText: 'キャンセル',
    cancelButtonProps: { style: { marginInlineStart: 0 } },
    onOk,
    onCancel,
    footer: (_, { OkBtn, CancelBtn }) => (
      <>
        <Flex wrap gap='small' vertical>
          <OkBtn />
          <CancelBtn />
        </Flex>
      </>
    ),
  })
}
