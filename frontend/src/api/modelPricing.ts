import { apiClient } from './client'

export interface UserModelPricing {
  model: string
  found: boolean
  input_price: number | null
  output_price: number | null
  cache_write_price: number | null
  cache_read_price: number | null
  image_output_price: number | null
}

export async function getModelPricing(models: string[]): Promise<Record<string, UserModelPricing>> {
  const { data } = await apiClient.get<UserModelPricing[]>('/models/pricing', {
    params: { models: models.join(',') },
  })
  return Object.fromEntries(data.map((item) => [item.model, item]))
}

export default { getModelPricing }
