<template>
  <div class="home">
    <week-list></week-list>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import WeekList from '@/components/WeekList.vue'

export default defineComponent({
  name: 'Home',
  components: { WeekList }
})
</script>

<style scoped lang="scss">
</style>
