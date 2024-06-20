import axios, { AxiosInstance } from 'axios'

const baseURL: string = process.env.NEXT_PUBLIC_BASE_URL as string

export const instance: AxiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})
