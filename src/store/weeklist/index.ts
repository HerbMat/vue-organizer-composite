import { Days, getDays } from '@/domain/domain/Days'
import { Module, ActionContext } from 'vuex'
import HourDescription from '@/domain/domain/HourDescription'
import { State } from '@/store'
import WeekList from '@/components/WeekList.vue'
import getTimeFrame from '@/domain/domain/timeframe'
import { loadSaveData, save, SavedHourDescription } from '@/domain/database'

type WeekList = Map<string, Array<HourDescription>>

export enum ActionTypes {
  SET_DESCRIPTION = 'WeekListState/setDescription',
  LOAD_INITIAL_STATE = 'WeekListState/loadInitialState',
  SELECT_TIMEFRAME = 'WeekListState/selectTimeFrame'
}

export enum MutationTypes {
  SET_DESCRIPTION = 'WeekListState/setDescription',
  LOAD_INITIAL_STATE = 'WeekListState/loadInitialState',
  SELECT_TIMEFRAME = 'WeekListState/selectTimeFrame'
}

interface WeekListModuleState {
  weekList: WeekList;
}

interface WeekListPayload {
  day: Days;
  startHour: number;
}

interface WeekListDescriptionPayload {
  description: string;
}

function initialWeekList (): WeekList {
  const days = getDays()
  const weekList = new Map()
  days.forEach(day => weekList.set(day, getTimeFrame()))

  return weekList
}

const weekListModule: Module<WeekListModuleState, State> = {
  state: {
    weekList: initialWeekList()
  },
  mutations: {
    [MutationTypes.SET_DESCRIPTION] (state: WeekListModuleState, payload: WeekListDescriptionPayload): void {
      state.weekList.forEach(
        (hourDescriptions: HourDescription[], day: string) => {
          const hourElements = hourDescriptions
            .filter((hourElement: HourDescription) => hourElement.selected)
          if (hourElements.length > 0) {
            hourElements.forEach((hourElement: HourDescription) => {
              hourElement.description = payload.description
              hourElement.selected = false
            })
            const hoursDescriptionsToSave: Array<SavedHourDescription> = []
            hourDescriptions.forEach(value => hoursDescriptionsToSave.push({ startHour: value.startHour, endHour: value.endHour, description: value.description }))
            save(hoursDescriptionsToSave, day)
          }
        }
      )
    },
    [MutationTypes.SELECT_TIMEFRAME] (state: WeekListModuleState, payload: WeekListPayload): void {
      const hourDescriptions = state.weekList.get(payload.day)
      if (!Array.isArray(hourDescriptions)) {
        throw Error('Bad error')
      }
      const hourElement = hourDescriptions.find((hourElement: HourDescription) => hourElement.startHour === payload.startHour)
      if (hourElement !== undefined) {
        hourElement.selected = !hourElement.selected
      }
    },
    [MutationTypes.LOAD_INITIAL_STATE] (state: WeekListModuleState): void {
      const loadInitialStateFromDataBase = (key: string) => (result: SavedHourDescription[]) => {
        const hourDescriptions = state.weekList.get(key)
        if (!Array.isArray(hourDescriptions)) {
          throw Error('Bad error')
        }
        hourDescriptions.forEach((element, index) => { element.description = result[index].description })
      }
      const days = getDays()
      days.forEach(day => loadSaveData(day, loadInitialStateFromDataBase(day)))
    }
  },
  actions: {
    [ActionTypes.SET_DESCRIPTION] (context: ActionContext<WeekListModuleState, State>, payload: WeekListDescriptionPayload) {
      context.commit(MutationTypes.SET_DESCRIPTION, payload)
    },
    [ActionTypes.SELECT_TIMEFRAME] (context: ActionContext<WeekListModuleState, State>, payload: WeekListPayload) {
      context.commit(MutationTypes.SELECT_TIMEFRAME, { day: payload.day, startHour: payload.startHour })
    },
    [ActionTypes.LOAD_INITIAL_STATE] (context: ActionContext<WeekListModuleState, State>): void {
      context.commit(MutationTypes.LOAD_INITIAL_STATE)
    }
  },
  getters: {
    getDay: (state: WeekListModuleState) => (day: Days): HourDescription[] => {
      const hourDescriptions = state.weekList.get(day)
      if (!Array.isArray(hourDescriptions)) {
        throw Error('Bad error')
      }
      return hourDescriptions
    }
  }
}

export default weekListModule
