import { useQuery, UseQueryOptions } from '@tanstack/react-query'

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
  return useQuery(queryKey, fetcher, { ...options })
}

export default useApiResource
