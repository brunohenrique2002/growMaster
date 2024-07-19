import axios from 'axios'
import { useUserStore } from '@/store/StoreUser'
import { Login } from '@/types/Login'
import { dataGrows, deleteGrow } from '@/types/Grows'

const API_BASE = 'https://mysterious-eyrie-69850-35adda475f99.herokuapp.com/api'

const instance = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json'
  }
})

instance.interceptors.request.use(
  (config) => {
    const userStore = useUserStore()
    if (userStore.token) {
      config.headers.Authorization = `Bearer ${userStore.token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

const login = async (data: Login) => {
  try {
    const response = await axios.post(`${API_BASE}/user`, data)

    const userStore = useUserStore()

    const { email, name, token } = response.data

    userStore.setEmail(name)
    userStore.setName(email)
    userStore.setToken(token)

    return response
  } catch (error) {
    throw new Error('Erro ao fazer login')
  }
}
const addGrow = (data: dataGrows) => {
  const response = instance.post(`${API_BASE}/grows`, data)
  return response
}
const deleteGrow = (data: deleteGrow) => {
  const response = instance.post(`${API_BASE}/grows/delete`, data)
  return response
}
const listPlant = () => {
  return instance.get(`${API_BASE}/plants`)
}
const listGrow = () => {
  return instance.get(`${API_BASE}/grows`)
}

const authService = {
  login,
  listPlant,
  listGrow,
  addGrow,
  deleteGrow
}

export default authService
