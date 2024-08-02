import axios from 'axios'
import { useUserStore } from '@/store/StoreUser'
import { Login } from '@/types/Login'
import { Grow, ChangeGrow, GrowEdit } from '@/types/Grows'
import { plant, deletePlant } from '@/types/Plants'

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
    const response = await instance.post(`${API_BASE}/user`, data)

    const userStore = useUserStore()
    const { email, name, token } = response.data

    if (!token) {
      throw new Error('Erro ao fazer login')
    }

    userStore.setEmail(name)
    userStore.setName(email)
    userStore.setToken(token)

    return response
  } catch (error) {
    throw new Error('Erro ao fazer login')
  }
}
// Aréa Grows //
const addGrow = (data: Grow) => {
  const response = instance.post(`${API_BASE}/grows`, data)
  return response
}
const listGrow = () => {
  return instance.get(`${API_BASE}/grows`)
}
const deleteGrow = (data: ChangeGrow) => {
  const response = instance.post(`${API_BASE}/grows/delete`, data)
  return response
}
const editGrow = (data: GrowEdit) => {
  return instance.post(`${API_BASE}/grows/update`, data)
}

// Aréa Plantas //
const listPlant = () => {
  return instance.get(`${API_BASE}/plants`)
}
const addPlant = (data: plant) => {
  const response = instance.post(`${API_BASE}/plants`, data)
  return response
}

const deletePlant = (data: deletePlant) => {
  const response = instance.post(`${API_BASE}/plants/delete`, data)
  return response
}

const authService = {
  login,
  listPlant,
  listGrow,
  addGrow,
  deleteGrow,
  editGrow,
  deletePlant,
  addPlant
}

export default authService
