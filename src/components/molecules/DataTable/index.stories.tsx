import type { Meta, StoryObj } from '@storybook/react'
import DataTable from './'

const meta: Meta<typeof DataTable> = {
  title: 'Components / Molecules / DataTable',
  component: DataTable,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof DataTable>

export const NoData: Story = {
  args: {
    rowData: [],
  },
}

export const Basic: Story = {
  args: {
    isLoading: false,
    columnDefs: [
      { field: 'make' },
      { field: 'model' },
      { field: 'price' },
      { field: 'electric' },
    ],
    totalCount: 3,
    rowData: [
      { make: 'Tesla', model: 'Model Y', price: 64950, electric: true },
      { make: 'Ford', model: 'F-Series', price: 33850, electric: false },
      { make: 'Toyota', model: 'Corolla', price: 29600, electric: false },
    ],
    headerSlot: <></>,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '100%', height: '100%' }}>
        <Story />
      </div>
    ),
  ],
}
