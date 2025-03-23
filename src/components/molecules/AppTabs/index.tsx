import { Tabs } from 'antd'

type AppTabsProps = {} & React.ComponentProps<typeof Tabs>

const AppTabs = (props: AppTabsProps) => {
  const { ...restProps } = props
  return <Tabs {...restProps} />
}

export default AppTabs
