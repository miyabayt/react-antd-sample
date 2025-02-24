import AppBadge from '@/components/atoms/AppBadge'
import AppButton from '@/components/atoms/AppButton'
import LoginRequired from '@/components/atoms/LoginRequired'
import AppCalendar from '@/components/molecules/AppCalendar'
import AppCard from '@/components/molecules/AppCard'
import { toDayjs } from '@/utils/dayjs'
import { Avatar, Flex, Space } from 'antd'

const TopPage = () => {
  const holidays = toDayjs([
    '2025-01-01',
    '2025-01-02',
    '2025-01-03',
    '2025-02-10',
    '2025-02-24',
  ])

  return (
    <LoginRequired>
      <Flex gap={16} wrap>
        <Flex gap={16} flex={1} vertical>
          <AppCard title='AppButton' style={{ minWidth: 600 }}>
            <Flex gap='large' wrap>
              <AppButton type='primary'>Primary Button</AppButton>
              <AppButton type='secondary'>Secondary Button</AppButton>
              <AppButton type='dashed'>Dashed Button</AppButton>
              <AppButton type='text'>Text Button</AppButton>
              <AppButton type='link'>Link Button</AppButton>
            </Flex>
          </AppCard>
        </Flex>
        <Flex gap={16} flex={1} vertical>
          <AppCard title='AppBadge' style={{ minWidth: 600 }}>
            <Flex gap={16} vertical>
              <Flex gap='large' wrap>
                <AppBadge count={9}>
                  <Avatar shape='square' size='large' />
                </AppBadge>
                <AppBadge count={99}>
                  <Avatar shape='square' size='large' />
                </AppBadge>
                <AppBadge count={9999}>
                  <Avatar shape='square' size='large' />
                </AppBadge>
              </Flex>
              <Flex gap={16} vertical>
                <Space>
                  <AppBadge status='success' />
                  <AppBadge status='error' />
                  <AppBadge status='default' />
                  <AppBadge status='processing' />
                  <AppBadge status='warning' />
                </Space>
                <Space direction='vertical'>
                  <AppBadge status='success' text='Success' />
                  <AppBadge status='error' text='Error' />
                  <AppBadge status='default' text='Default' />
                  <AppBadge status='processing' text='Processing' />
                  <AppBadge status='warning' text='Warning' />
                </Space>
                <Space size='large' direction='vertical'>
                  <AppBadge text='Hippies' ribbon>
                    <AppCard title='Pushes open the window' size='small'>
                      and raises the spyglass.
                    </AppCard>
                  </AppBadge>
                  <AppBadge
                    text='Hippies'
                    color='green'
                    textColor='black'
                    ribbon
                  >
                    <AppCard title='Pushes open the window' size='small'>
                      and raises the spyglass.
                    </AppCard>
                  </AppBadge>
                </Space>
              </Flex>
            </Flex>
          </AppCard>
        </Flex>
        <Flex gap={16} flex={1} vertical>
          <AppCard title='AppCalendar'>
            <AppCalendar
              holidays={holidays}
              events={'https://fullcalendar.io/api/demo-feeds/events.json'}
              selectable
              selectMirror
            />
          </AppCard>
        </Flex>
      </Flex>
    </LoginRequired>
  )
}

export default TopPage
