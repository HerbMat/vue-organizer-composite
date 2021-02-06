import { Days } from '@/domain/domain/Days'
import { Module, ActionContext } from 'vuex'
import HourDescription from '@/domain/domain/HourDescription'
import WeekListState from '@/store/weeklist/WeekListState'
import { State } from '@/store'

export enum ActionTypes {
  SET_DESCRIPTION = 'WeekListState/setDescription',
  LOAD_INITIAL_STATE = 'WeekListState/loadInitialState'
}

export enum MutationTypes {
  SET_DESCRIPTION = 'WeekListState/setDescription',
  LOAD_INITIAL_STATE = 'WeekListState/loadInitialState'
}

interface WeekListModuleState {
  weekList: WeekListState;
}

interface WeekListDescriptionChangePayload {
  day: Days;
  startHour: number;
  description: string;
}

interface WeekListDescriptionPayload {
  description: string;
}

const initialWeekList = new WeekListState()

const weekListModule: Module<WeekListModuleState, State> = {
  state: {
    weekList: initialWeekList
  },
  mutations: {
    [MutationTypes.SET_DESCRIPTION] (state: WeekListModuleState, payload: WeekListDescriptionChangePayload): void {
      state.weekList.setDescription(payload.day, payload.startHour, payload.description)
    },
    [MutationTypes.LOAD_INITIAL_STATE] (state: WeekListModuleState): void {
      state.weekList.loadInitialState()
    }
  },
  actions: {
    [ActionTypes.SET_DESCRIPTION] (context: ActionContext<WeekListModuleState, State>, payload: WeekListDescriptionPayload) {
      context.commit(MutationTypes.SET_DESCRIPTION, { day: context.getters.getChosenDay(), startHour: context.getters.getChosenHour(), description: payload.description })
    },
    [ActionTypes.LOAD_INITIAL_STATE] (context: ActionContext<WeekListModuleState, State>): void {
      context.commit(MutationTypes.LOAD_INITIAL_STATE)
    }
  },
  modules: {
  },
  getters: {
    getDay: (state: WeekListModuleState) => (day: Days): HourDescription[] => state.weekList.dayList(day),
    getState: (state: WeekListModuleState) => (): Map<string, Array<HourDescription>> => state.weekList.weekList
  }
}

export default weekListModule
