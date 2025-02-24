import { css } from '@emotion/react'
import { Button } from 'antd'
import React, { useCallback } from 'react'

interface PagingButtonProps {
  page: number
  currentPage: number
  goToPage: (page: number) => void
  disabled?: boolean
}

const PagingButton = React.memo((props: PagingButtonProps) => {
  const { page, currentPage, goToPage, disabled = false } = props

  const handleClick = useCallback(() => {
    goToPage(page)
  }, [goToPage, page])

  return (
    <Button
      css={currentPage === page ? styles.pageButtonActive : styles.pageButton}
      onClick={handleClick}
      disabled={disabled && currentPage !== page}
    >
      {page + 1}
    </Button>
  )
})

const styles = {
  pageButtonActive: css`
    color: black;
    font-weight: 700;
    border: none;
    background-color: transparent;
    box-shadow: none;
  `,

  pageButton: css`
    //
  `,
}

PagingButton.displayName = 'PagingButton'

export default PagingButton
