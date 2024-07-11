import axios from 'axios';
import { Login } from '@/types/Login';
import {useUserStore}  from '@/store/StoreToken'

const LOGIN_APP = 'https://growmaster.free.beeceptor.com';
const PLANT_LIST = 'https://my-json-server.typicode.com/vinimw/rest-demo';

const login = async (data: Login) => {
  try {
    const response = await axios.post(`${LOGIN_APP}/login`, data);
    const { token, name, email } = response.data.data;

    const userStore = useUserStore();
    userStore.setToken(token);
    userStore.setName(name);
    userStore.setEmail(email);

    
    localStorage.setItem('token', token);

    return response; 
  } catch (error) {
    throw new Error('Erro ao fazer login');
  }

};
const ListPlant = () => {
  return axios.get(`${PLANT_LIST}/plants/`);
};

const authService = {
  login,
  ListPlant,
};

export default authService;
