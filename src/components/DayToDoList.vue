<template>
  <div>
    <h2>{{ day }}</h2>
    <ul class="day-list">
      <li v-for="hourDesc in dayList" :key="hourDesc.startHour">
        <span @click="showModal">
          {{ formatHour(hourDesc.startHour) }} - {{ formatHour(hourDesc.endHour) }} {{ hourDesc.description }}
        </span>
        <label>
          <input type="checkbox" :checked="hourDesc.selected" @change="selectElement(hourDesc.startHour)"/>
        </label>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { useStore } from '@/store'
import { formatHour } from '@/domain/util/dateFormatter'
import { ActionTypes } from '@/store/weeklist'

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
    const dayList = reactive(store.getters.getDay(props.day))
    function showModal () {
      emit('showModal')
    }

    function selectElement (hour: number) {
      store.dispatch(ActionTypes.SELECT_TIMEFRAME, {
        day: props.day,
        startHour: hour
      })
      console.log('Selected' + hour + props.day)
    }

    return {
      dayList,
      showModal,
      formatHour,
      selectElement
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
