<template>
  <div class="login">
    <div class="login__img">
      <img class="login__logo" src="@/assets/img/grow-master-logo.jpeg" alt="Logo Grow">
    </div>
    <div class="login__form">
      <h1 class="login__welcome">Bem vindo</h1>
      <div class="login__input">
        <LInput type="text" text="Email" placeholder="Digite seu email" id="email" name="email" :value="email"/>
        <LInput type="password" text="Senha" placeholder="Digite sua senha" id="password" name="password" :value="password" />
      </div>
      <router-link to="/dashboard">
        <div class="login__button">
          <LButton text="Login" />
        </div>
      </router-link>
      <div class="login__forgot">
        <p>Esqueceu sua senha?</p>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import LInput from '@/components/atoms/LInput.vue';
import LButton from '@/components/atoms/LButton.vue'
import { RouterLink } from 'vue-router'
export default defineComponent({
  name: 'Login',
  setup() {
    const email = ref('');
    const password = ref('');
    return {email, password};
  },
  components: { LInput, LButton }
});
</script>
<style scoped lang="scss">
.login {


  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: normal;
  height: 100vh;

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
    
    &__form{
      width: 400px;
    }
  }
}
</style>