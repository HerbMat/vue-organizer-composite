<template>
  <div class="modal">
    <div class="modal-content">
      <h1>Show modal</h1>
      <form class="modal-form">
        <label for="description">Description</label>
        <input type="text" id="description" v-model="description">
        <input type="submit" @click.prevent="setDescription" value="Add description"/>
        <input type="submit" @click.prevent="close" value="X"/>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from '@/store'
import { Days } from '@/domain/domain/Days'
import { ActionTypes } from '@/store/weeklist'

export default defineComponent({
  name: 'AddTask',
  setup (props, { emit }) {
    const store = useStore()
    const description = ref('')

    function setDescription () {
      store.dispatch(ActionTypes.SET_DESCRIPTION, { day: Days.MONDAY, startHour: 0, description: description.value })
      emit('hideModal')
      description.value = ''
    }

    function close () {
      emit('hideModal')
      description.value = ''
    }

    return {
      description,
      setDescription,
      close
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

.modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
  display: grid;
}

.modal-content {
  background: antiquewhite;
  display: block;
  border: 1px black solid;
  margin-left: auto;
  margin-right: auto;
  overflow: visible;
  z-index: 1;
  align-self: center;
  justify-self: center;
  justify-content: center;
  text-align: center;
  border-radius: 25px;
  padding: 25px;
}

.modal-form {
  display: grid;
  grid-auto-columns: 1fr;
  grid-row-gap: 0.5rem;
}
</style>
