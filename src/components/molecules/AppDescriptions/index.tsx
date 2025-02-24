import { Descriptions, type DescriptionsProps, theme } from 'antd'

interface AppDescriptionsProps extends DescriptionsProps {
  //
}

const AppDescriptions = (props: AppDescriptionsProps) => {
  const { token } = theme.useToken()
  const {
    styles = {
      label: { width: 240 },
    },
    bordered = true,
    ...restProps
  } = props

  return (
    <>
      <Descriptions
        rootClassName='app-descriptions'
        styles={styles}
        bordered={bordered}
        {...restProps}
      />
    </>
  )
}
AppDescriptions.displayName = 'AppDescriptions'

export default AppDescriptions
