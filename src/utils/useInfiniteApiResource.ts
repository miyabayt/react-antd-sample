import {
  type UseInfiniteQueryOptions,
  keepPreviousData,
  useInfiniteQuery,
} from '@tanstack/react-query'
import { useNavigate } from 'react-router'

type ApiResponse = {
  page: number // ページ番号
  totalPages: number // 総ページ数
}

const useApiResource = <
  TQueryKey extends [string, (Record<string, unknown> | string)?],
  TQueryFnData extends ApiResponse,
  TError,
  TData = TQueryFnData,
>(
  queryKey: TQueryKey,
  fetcher: (pageParam: number) => Promise<TQueryFnData>,
  options?: Omit<
    UseInfiniteQueryOptions<
      TQueryFnData,
      TError,
      TData,
      TQueryFnData,
      TQueryKey,
      number
    >,
    'queryKey' | 'queryFn'
  >,
) => {
  const navigate = useNavigate()
  const wrappedFetcher = async ({ pageParam }: { pageParam: number }) => {
    return await fetcher(pageParam).catch((e) => {
      if (e.response?.status === 401) {
        navigate('/login')
      }
      return Promise.reject(e)
    })
  }
  return useInfiniteQuery({
    queryKey,
    queryFn: wrappedFetcher,
    ...options,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined
    },
    placeholderData: keepPreviousData, // ちらつきを抑えるために前回のデータを保持する
    refetchOnWindowFocus: false, // ウィンドウが再フォーカスされたときに再フェッチしない
  })
}

export default useApiResource
