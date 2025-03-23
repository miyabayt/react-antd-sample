import { Segmented } from 'antd'

type AppSegmentedProps = {} & React.ComponentProps<typeof Segmented>

const AppSegmented = (props: AppSegmentedProps) => {
  const { ...restProps } = props
  return <Segmented {...restProps} />
}

export default AppSegmented
