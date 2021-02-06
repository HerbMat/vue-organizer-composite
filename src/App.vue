<template>
  <div id="app">
    <Header></Header>
    <main>
      <router-view/>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Header from '@/components/Header.vue'

export default defineComponent({
  name: 'App',
  components: { Header }
})
</script>

<style lang="scss">
body {
  margin: 0;
}

body > * {
  overflow: auto;
}

#app {
  display: grid;
  grid-template:
      [row1-start] "header header" 6rem [row1-end]
      [row2-start] "sidebar content" 1fr [row2-end]
    / 6rem 1fr;
  height: 100vh;
  width: 100vw;
}

.row {
  width: 100%;
}

#app > main {
  grid-area: sidebar / sidebar / content / content;
  text-align: center;
  padding: 1rem
}
</style>
