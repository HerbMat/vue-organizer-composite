import { Days, getDays } from '@/domain/domain/Days'
import getTimeFrame from '@/domain/domain/Timeframe'
import HourDescription from '@/domain/domain/HourDescription'
import { loadSaveData, save } from '@/domain/database'

type WeekList = Map<string, Array<HourDescription>>

function loadInitialWeekListToState (weekListState: WeekListState): (weekList: WeekList[]) => void {
  return (weekLists: WeekList[]) => {
    if (weekLists.length > 0) {
      weekListState.updateState(weekLists[0])
      console.log('bbb  ' + weekListState.dayList(Days.MONDAY)[0].description)
    } else {
      console.log('fasdggg' + weekListState.dayList(Days.MONDAY)[0].description)
      save(weekListState.weekList)
    }
  }
}

function deepClone (obj: any) {
  if (!obj || obj === true) {
    return obj
  }
  const objType = typeof (obj)
  if (objType === 'number' || objType === 'string') {
    return obj
  }
  const result = Array.isArray(obj) ? [] : !obj.constructor ? {} : new obj.constructor()
  if (obj instanceof Map) {
    for (const key of obj.keys()) { result.set(key, deepClone(obj.get(key))) }
  }
  for (const key in obj) {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(key)) { result[key] = deepClone(obj[key]) }
  }
  return result
}

export default class WeekListState {
  private _weekList: WeekList
  set weekList (weekList: WeekList) {
    weekList.forEach((value, key) => this._weekList.set(key, value))
  }

  get weekList (): WeekList {
    return this._weekList
  }

  constructor () {
    const days = getDays()
    this._weekList = new Map()
    days.forEach(day => this._weekList.set(day, getTimeFrame()))
  }

  public setDescription (day: Days, startHour: number, description: string) {
    const hourElement = this.dayList(day).find((hourElement: HourDescription) => hourElement.startHour === startHour)
    if (hourElement !== undefined) {
      hourElement.description = description
      save(deepClone(this._weekList))
    }
  }

  public dayList (day: Days): HourDescription[] {
    const hourDescriptions = this._weekList.get(day)
    if (!Array.isArray(hourDescriptions)) {
      throw Error('Bad error')
    }
    return hourDescriptions
  }

  public loadInitialState () {
    loadSaveData(loadInitialWeekListToState(this))
  }

  public updateState (weekList: WeekList) {
    weekList.forEach((dayList: Array<HourDescription>, day: string) => {
      dayList.forEach((hourDescription: HourDescription) => {
        const dayEnum: Days = day as Days
        if (hourDescription.description) {
          this.setDescription(dayEnum, hourDescription.startHour, hourDescription.description)
        }
      })
    })
    console.log('test passed ' + this._weekList.get(Days.MONDAY)?.[0].description)
  }
}
