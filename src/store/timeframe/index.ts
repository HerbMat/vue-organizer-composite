import { Days } from '@/domain/domain/Days'
import { ActionContext, Module } from 'vuex'
import { State } from '@/store'

export interface TimeframeState {
  chosenDay: Days;
  chosenHour: number;
}

interface PayloadTimeframe {
  day: Days;
  startHour: number;
  description: string;
}

export enum ActionTypes {
  SET_TIMEFRAME = 'TimeframeState/setTimeframe'
}

export enum MutationTypes {
  SET_TIMEFRAME = 'TimeframeState/setTimeframe'
}

const timeframeModule: Module<TimeframeState, State> = {
  state: {
    chosenDay: Days.MONDAY,
    chosenHour: 0
  },
  mutations: {
    [MutationTypes.SET_TIMEFRAME] (state: TimeframeState, payload: PayloadTimeframe): void {
      state.chosenDay = payload.day
      state.chosenHour = payload.startHour
    }
  },
  actions: {
    [ActionTypes.SET_TIMEFRAME] (context: ActionContext<TimeframeState, State>, payload: PayloadTimeframe): void {
      context.commit(MutationTypes.SET_TIMEFRAME, payload)
    }
  },
  modules: {
  },
  getters: {
    getChosenHour: (state: TimeframeState) => () => state.chosenHour,
    getChosenDay: (state: TimeframeState) => () => state.chosenDay
  }
}

export default timeframeModule
