import { useNavigate } from 'react-router-dom'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

const useApiResource = <
  TQueryKey extends [string, (Record<string, unknown> | string)?, number?],
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
      if (e.response?.status === 401) {
        navigate('/login')
      }
      return Promise.reject(e)
    })
  }
  return useQuery(queryKey, wrappedFetcher, { ...options })
}

export default useApiResource
