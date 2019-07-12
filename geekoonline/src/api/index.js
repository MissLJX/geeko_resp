import axios from 'axios'
const instance = axios.create({
  baseURL: '/api',
  timeout: 50000,
  headers: {
  }
})


export const personal = (params) => instance.post('/personal',
  params,
  {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }
)