import {
  type UseQueryOptions,
  keepPreviousData,
  useQuery,
} from '@tanstack/react-query'
import { useNavigate } from 'react-router'

const useApiResource = <
  TQueryKey extends [string, (Record<string, unknown> | string)?],
  TQueryFnData,
  TError,
  TData = TQueryFnData,
>(
  queryKey: TQueryKey,
  fetcher: () => Promise<TQueryFnData>,
  options?: Omit<
    UseQueryOptions<unknown, TError, TData, TQueryKey>,
    'queryKey' | 'queryFn'
  >,
) => {
  const navigate = useNavigate()
  const wrappedFetcher = async () => {
    return await fetcher().catch((e) => {
      if (e.response?.status === 401 || e.status === 401) {
        navigate('/login')
      }
      return Promise.reject(e)
    })
  }

  return useQuery({
    queryKey,
    queryFn: wrappedFetcher,
    ...options,
    placeholderData: keepPreviousData, // ちらつきを抑えるために前回のデータを保持する
    refetchOnWindowFocus: false, // ウィンドウが再フォーカスされたときに再フェッチしない
  })
}

export default useApiResource
