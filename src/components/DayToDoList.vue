<template>
  <div>
    <h2>{{ day }}</h2>
    <ul class="day-list">
      <li v-for="hourDesc in dayList" :key="hourDesc.startHour" @click="showModal(hourDesc.startHour)">
        {{ formatHour(hourDesc.startHour) }} - {{ formatHour(hourDesc.endHour) }} {{ hourDesc.description }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { useStore } from '@/store'
import { formatHour } from '@/domain/util/dateFormatter'
import { ActionTypes } from '@/store/timeframe'
import { ActionTypes as WeekActionTypes } from '@/store/weeklist'

export default defineComponent({
  name: 'DayToDoList',
  props: {
    day: {
      type: String,
      required: true
    }
  },
  setup (props, { emit }) {
    const store = useStore()
    store.dispatch(WeekActionTypes.LOAD_INITIAL_STATE)
    const dayList = reactive(store.getters.getDay(props.day))
    function showModal (hour: number) {
      store.dispatch(ActionTypes.SET_TIMEFRAME, {
        day: props.day,
        startHour: hour
      })
      emit('showModal')
    }

    return {
      dayList,
      showModal,
      formatHour
    }
  }
})
</script>

<style lang="scss" scoped>
.day-list {
  padding: 0;
  list-style-type: none;

  li {
    border: 1px solid black;
  }
}
</style>
