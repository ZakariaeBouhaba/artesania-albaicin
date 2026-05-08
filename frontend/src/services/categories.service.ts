import { api } from './api'
import { ApiResponse, Category } from '../types/api.types'

export const categoriesService = {
  list: () =>
    api.get<ApiResponse<Category[]>>('/categories').then(r => r.data),
}
