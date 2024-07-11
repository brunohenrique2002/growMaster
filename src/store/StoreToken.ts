import { defineStore } from 'pinia';

interface UserState {
  token: string | null;
  name: string | null;
  email: string | null;
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    token: null,
    name: null,
    email: null,
  }),
  actions: {
    setToken(token: string) {
      this.token = token;
    },
    setName(name: string) {
      this.name = name;
    },
    setEmail(email: string) {
      this.email = email;
    },
    clear() {
      this.token = null;
      this.name = null;
      this.email = null;
    },
  },
});
