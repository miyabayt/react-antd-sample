import { useIsFetching } from '@tanstack/react-query'
import nprogress from 'nprogress'
import { useEffect } from 'react'

import 'nprogress/nprogress.css'

nprogress.configure({ showSpinner: false }) // 右上に表示されるスピナーを非表示にする

const NProgressIndicator = () => {
  const isFetching = useIsFetching()

  useEffect(() => {
    if (isFetching) {
      nprogress.start()
    } else {
      nprogress.done()
    }
  }, [isFetching])

  return null
}

export default NProgressIndicator
