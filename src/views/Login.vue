<template>
  <div class="login">
    <div class="login__img">
      <img class="login__logo" src="@/assets/img/grow-master-logo.jpeg" alt="Logo Grow" />
    </div>
    <div class="login__form">
      <h1 class="login__welcome">Bem vindo</h1>
      <div class="login__input">
        <form @submit.prevent="SendLogin">
          <AtInput
            type="email"
            text="Email"
            placeholder="Digite seu email"
            id="email"
            name="email"
            v-model="email"
            @blur="checksEmail"
          />
          <AtInput
            type="password"
            text="Senha"
            placeholder="Digite sua senha"
            id="password"
            name="password"
            v-model="password"
            @blur="checksPassword"
          />
          <div class="login__button">
            <AtButton text="Login" :disabled="isDisabled" />
          </div>
          <div class="login__message-error">
            <p>{{ messageError }}</p>
          </div>
        </form>
      </div>
      <div class="login__forgot">
        <p>Esqueceu sua senha?</p>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import AtInput from '@/components/atoms/AtInput.vue'
import AtButton from '@/components/atoms/AtButton.vue'
import { useRouter } from 'vue-router'
import authService from '@/services/ApiService'
import { useUserStore } from '@/store/StoreUser'
export default defineComponent({
  name: 'Login',
  components: { AtInput, AtButton },
  setup() {
    const email = ref('')
    const password = ref('')
    const router = useRouter()
    const messageError = ref('')
    const isDisabled = ref(true)
    const userLogin = useUserStore()

    const validateForm = () => {
      if (email.value.length > 0 && email.value.length < 5) {
        messageError.value = 'O email deve ter mais de 5 caracteres'
      }
      isDisabled.value = !!messageError.value
    }
    const checksEmail = () => {
      messageError.value = !email.value ? 'Por favor, preencha o email' : ''
      validateForm()
    }
    const checksPassword = () => {
      messageError.value = !password.value ? 'Por favor, preencha a senha' : ''
      validateForm()
    }

    const SendLogin = async () => {
      if (!email.value || !password.value) {
        messageError.value = 'Por favor, preencha todos os campos.'
        validateForm()
        return
      }
      const data = {
        login: email.value,
        password: password.value
      }
      try {
        const response = await authService.login(data)
        router.push('/dashboard')
      } catch (error) {
        messageError.value = 'Email ou senha incorretos'
        console.error('Erro ao fazer login:', error)
      }
    }

    return {
      email,
      password,
      userLogin,
      SendLogin,
      checksEmail,
      checksPassword,
      messageError,
      isDisabled
    }
  }
})
</script>
<style scoped lang="scss">
.login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: normal;
  height: 100vh;
  &__message-error {
    margin-top: 8px;
    color: var(--color-error);
    p {
      font-size: 1.2rem;
    }
  }
  &__forgot {
    display: flex;
    justify-content: flex-end;
    margin-top: 1.6em;
    color: var(--color-primary);
  }

  &__button {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1em;
  }

  &__welcome {
    font-size: 1.8em;
    color: var(--color-primary);
  }

  &__logo {
    width: 300px;
    border-radius: 10px;
  }

  &__img {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 2em;
  }

  &__form {
    background-color: var(--color-secundary);
    border: 1px solid var(--color-primary);
    padding: 3em 1em;
    border-radius: 1em;
    min-height: 310px;
    margin: 1.6em;
    width: auto;
  }

  @media (min-width: 600px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;

    &__form {
      width: 400px;
    }
  }
}
</style>
