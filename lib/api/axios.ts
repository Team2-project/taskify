import axios, { AxiosInstance } from "axios";

const baseURL: string = process.env.NEXT_PUBLIC_BASE_URL as string;

export const instance: AxiosInstance = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
