import dayjs from '@/utils/dayjs'
import type { Meta, StoryObj } from '@storybook/react'
import AppDatePicker from './'

const meta: Meta<typeof AppDatePicker> = {
  title: 'Components / Atoms / AppDatePicker',
  component: AppDatePicker,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof AppDatePicker>

export const DateSelect: Story = {
  args: {
    picker: 'date',
  },
}

export const WeekSelect: Story = {
  args: {
    picker: 'week',
  },
}

export const MonthSelect: Story = {
  args: {
    picker: 'month',
  },
}

export const QuarterSelect: Story = {
  args: {
    picker: 'quarter',
  },
}

export const YearSelect: Story = {
  args: {
    picker: 'year',
  },
}

export const Holiday: Story = {
  args: {
    holidays: [dayjs().add(1, 'day')], // 当日
  },
}
