import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { API_BASE_URL } from './constants'

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

type ResponseError = { success: boolean; message: string }

type ResponseSuccess<T> = { success: boolean; message: string; data: T }

type GetPlanResponse = ResponseSuccess<{
  _id: string
  userAddress: string
  plan: 'daily' | 'weekly'
  amount: number
  targetAmount: number
  totalInvested: number
  planCreated: string
  lastPaid: string | null
  payments: string[]
  createdAt: string
  updatedAt: string
}>

type CreatePlanRequest = {
  wallet: string
  planType: 'daily' | 'weekly'
  amount: number // max 2 decimal places
  target: number // max 4 decimal places
}

type CreatePlanResponse = GetPlanResponse

type BtcPriceResponse = ResponseSuccess<{ convertedPrice: number }>

const api = {
  // Plan
  getPlan: (wallet: string) =>
    apiClient
      .get('/plan/getUser', { params: { wallet } })
      ?.then((res) => res.data),
  createPlan: (data: CreatePlanRequest) =>
    apiClient.post('/plan/createPlan', data).then((res) => res.data),

  // Misc
  btcPrice: () =>
    apiClient.get('/misc/btcExchangeRate').then((res) => res.data),
}

export const useGetPlan = (
  wallet: string,
  options?: Omit<
    UseQueryOptions<GetPlanResponse, AxiosError<ResponseError>>,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery<GetPlanResponse, AxiosError<ResponseError>>({
    queryKey: ['plan', wallet],
    queryFn: () => api.getPlan(wallet),
    ...options,
  })
}

export const useCreatePlan = (
  options?: UseMutationOptions<
    CreatePlanResponse,
    AxiosError<ResponseError>,
    CreatePlanRequest
  >
) => {
  return useMutation<
    CreatePlanResponse,
    AxiosError<ResponseError>,
    CreatePlanRequest
  >({ mutationFn: (data) => api.createPlan(data), ...options })
}

export const useBtcPrice = (
  options?: Omit<
    UseQueryOptions<BtcPriceResponse, AxiosError<ResponseError>>,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery<BtcPriceResponse, AxiosError<ResponseError>>({
    queryKey: ['btcPrice'],
    queryFn: () => api.btcPrice(),
    ...options,
  })
}
