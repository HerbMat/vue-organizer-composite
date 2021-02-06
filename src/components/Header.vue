<template>
  <div id="nav">
    <router-link :to="{ name: 'Home'}">Home</router-link>
    <router-link :to="{ name: 'About'}">About</router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Header'
})
</script>

<style lang="scss" scoped>
#nav {
  background-image: linear-gradient(to bottom, cornflowerblue , blue);;
  padding-left: 3rem;
  padding-top: 1rem;
  grid-area: header;
  display: grid;
  grid-template-columns: repeat(7, 3rem);
  grid-template-rows: auto;
  clip-path: polygon(0 0, 100% 0, 100% 50%, 0 80%);

  a {
    color: white;
    font-weight: 600;
    text-decoration: none;
  }
}
</style>
