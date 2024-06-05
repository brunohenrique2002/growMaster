
<template>
  <div class="grow">
    <div class="grow__img">
      <img class="grow__logo" src="./assets/img/grow-master-logo.jpeg" alt="">
    </div>
    <Home />
  </div>
</template>
<script setup lang="ts">
import Home from '@/views/Home.vue'


</script>

<style lang="scss" scoped>
.grow {
  &__logo {
    width: 300px;
    border-radius: 10px;
  }

  @media (max-width: 600px) {
    &__logo {
      width: 300px;
      border-radius: 10px;
    }

    &__img {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
