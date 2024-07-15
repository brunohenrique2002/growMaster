import axios from 'axios'
import { useUserStore } from '@/store/StoreUser'
import { Login } from '@/types/Login'

const LOGIN_APP = 'https://growmaster.free.beeceptor.com'
const PLANT_LIST = 'https://growmaster.free.beeceptor.com'

const instance = axios.create({
  baseURL: LOGIN_APP,
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
    const response = await axios.post(`${LOGIN_APP}/login`, data)

    const { token, name, email } = response.data.data

    const userStore = useUserStore()

    userStore.setToken(token)
    userStore.setName(name)
    userStore.setEmail(email)

    return response
  } catch (error) {
    throw new Error('Erro ao fazer login')
  }
}
const listPlant = () => {
  return instance.get(`${PLANT_LIST}/plants`)
}

const authService = {
  login,
  listPlant
}

export default authService
