<template>
  <div class="home">
    <h1>Week List</h1>
    <div class="month-list">
      <day-to-do-list v-for="day in days" :day="day" :key="day" v-on:showModal="showModal"></day-to-do-list>
    </div>
    <teleport to="body">
      <add-task v-show="isModalShown" v-on:hideModal="hideModal"></add-task>
    </teleport>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import DayToDoList from '@/components/DayToDoList.vue'
import { getDays } from '@/domain/domain/Days'
import AddTask from '@/components/AddTask.vue'

export default defineComponent({
  name: 'WeekList',
  components: { DayToDoList, AddTask },
  data: () => {
    return {
      isAddTaskShown: false
    }
  },
  setup (props) {
    const days = getDays()
    const isModalShown = ref(false)
    function hideModal () {
      isModalShown.value = false
    }
    function showModal () {
      isModalShown.value = true
    }
    return {
      days,
      isModalShown,
      hideModal,
      showModal
    }
  }
})
</script>

<style scoped lang="scss">
.month-list {
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(7, minmax(10rem, 1fr));
  grid-template-rows: 1fr;

  div {
    border: 1px black solid;
  }
}
</style>
