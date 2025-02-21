import { css } from '@emotion/react'
import type { CustomCellRendererProps } from 'ag-grid-react'
import { Tag, type TagProps } from 'antd'

type TagColorType = TagProps['color']

interface TagCellRendererParams extends CustomCellRendererProps {
  color?: TagColorType
  bordered?: boolean
}

const TagCellRenderer = (params: TagCellRendererParams) => (
  <>
    {params.value && (
      <div css={styles.tagCellRendererContainer}>
        <Tag color={params.color} bordered={params.bordered}>
          {params.valueFormatted}
        </Tag>
      </div>
    )}
  </>
)

const styles = {
  tagCellRendererContainer: css`
    //
  `,
}

export default TagCellRenderer
