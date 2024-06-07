<template>
  <div class="login">
    <div class="login__img">
      <img class="login__logo" src="@/assets/img/grow-master-logo.jpeg" alt="">
    </div>
    <div class="login__form">
      <h1 class="login__welcome">Bem vindo</h1>
      <div class="login__input">
        <Input type="text" text="Email" placeholder="Digite seu email" id="email" name="email" />
        <Input type="password" text="Senha" placeholder="Digite sua senha" id="password" name="password" />
      </div>
      <div class="login__button">
        <LButton text="Login" />
      </div>

    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import Input from '@/components/atoms/Input.vue';
import LButton from '@/components/atoms/LButton.vue'


export default defineComponent({
  name: 'Login',
  setup() {
    return {};
  },
  components: { Input, LButton }
});
</script>
<style scoped lang="scss">
.login {
  @media (max-width: 600px) {
    &__button {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 1em;
    }

    &__welcome {
      font-size: 1.8em;
      color: #474747;
    }

    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100vh;

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
      background-color: rgba(136, 249, 178, 0.4196078431);
      border: 1px solid #3dcf67;
      padding: 3em 1em;
      border-radius: 1em;
      min-height: 391px;
    }
  }
}
</style>