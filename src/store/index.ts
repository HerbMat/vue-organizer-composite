import { createStore, useStore as baseUseStore } from 'vuex'
import weekListStateModule from '@/store/weeklist'
import timeframeModule from '@/store/timeframe'

export interface State {
  counter: number;
}

export default createStore<State>({
  state: {
    counter: 0
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    weekListStateModule,
    timeframeModule
  }
})

export function useStore () {
  return baseUseStore()
}
