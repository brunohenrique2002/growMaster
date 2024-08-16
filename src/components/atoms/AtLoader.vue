<template>
  <div class="background" :class="{ active: isLoaderActive }"></div>
  <div class="loader" v-show="isLoaderActive">
    <div class="loader__spinner"></div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AtLoader',
  components: {},
  props: {
    isLoaderActive: {
      type: Boolean,
      required: true
    }
  },
  setup() {
    return {}
  }
})
</script>
<style lang="scss" scoped>
.loader {
  position: absolute;
  top: 65%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;

  &__spinner {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background:
      radial-gradient(farthest-side, #3fbfa4 94%, #0000) top/9px 9px no-repeat,
      conic-gradient(#0000 30%, #3fbfa4);
    -webkit-mask: radial-gradient(farthest-side, #0000 calc(100% - 9px), #000 0);
    animation: spinner-c7wet2 1s infinite linear;
  }

  @keyframes spinner-c7wet2 {
    100% {
      transform: rotate(1turn);
    }
  }
}
.background {
  background-color: rgb(129 129 129 / 41%);
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 2;
  opacity: 0;
  transition: opacity 0.3s;
  pointer-events: none;

  &.active {
    opacity: 1;
    pointer-events: auto;
  }
}
</style>
