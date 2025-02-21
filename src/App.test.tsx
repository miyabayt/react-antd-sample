import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'

import App from './App'

test('renders Footer', () => {
  const queryClient = new QueryClient()
  render(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>,
  )
  const footerElement = screen.getByText(
    /Copyright © Sample Admin. All rights reserved/i,
  )
  expect(footerElement).toBeInTheDocument()
})
