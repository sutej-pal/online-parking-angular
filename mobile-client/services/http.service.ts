import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const baseApiUrl: string =
  process.env.EXPO_PUBLIC_API_BASE_URL || 'http://localhost:3105/api/'

class HttpService {
  private readonly client: AxiosInstance

  constructor() {
    this.client = axios.create({
      baseURL: baseApiUrl,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
    })

    // Request interceptor to add auth token
    this.client.interceptors.request.use(
      async (config: any) => {
        const token = await AsyncStorage.getItem('token')
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error: unknown) => {
        return Promise.reject(error)
      }
    )

    // Response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error: any) => {
        if (error.response?.status === 422) {
          const errorData = error.response.data
          if (typeof errorData.data === 'object') {
            console.error(errorData.message)
          } else if (typeof errorData.data === 'string') {
            console.error(errorData.data)
          }
        } else if (error.response?.data?.message) {
          console.error(error.response.data.message)
        } else {
          console.error('Network Error')
        }
        return Promise.reject(error)
      }
    )
  }

  async executeRequest(
    url: string,
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    body?: unknown,
    config?: AxiosRequestConfig
  ) {
    const response = await this.client.request({
      url,
      method,
      data: body,
      ...config,
    })
    return response
  }

  get(url: string, config?: AxiosRequestConfig) {
    return this.client.get(url, config)
  }

  post(url: string, data?: unknown, config?: AxiosRequestConfig) {
    return this.client.post(url, data, config)
  }

  put(url: string, data?: unknown, config?: AxiosRequestConfig) {
    return this.client.put(url, data, config)
  }

  patch(url: string, data?: unknown, config?: AxiosRequestConfig) {
    return this.client.patch(url, data, config)
  }

  delete(url: string, config?: AxiosRequestConfig) {
    return this.client.delete(url, config)
  }
}

export const httpService = new HttpService()
export default httpService

