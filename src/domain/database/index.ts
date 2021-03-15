import HourDescription from '@/domain/domain/HourDescription'
import { Days } from '@/domain/domain/Days'

const WEEK_LIST_STORE_OBJECT_NAME = 'weeklist'
const DATABASE_NAME = 'organizer'

export type SavedHourDescription = Omit<HourDescription, 'selected'>

function onUpgradeNeeded (event: any) {
  const db = event.target.result
  db.createObjectStore('weeklist')
}

function performOperationOnSuccess (operation: (db: IDBDatabase) => void) {
  return (event: any) => {
    const db = event.target.result
    operation(db)
  }
}

function performOperation (operation: (db: IDBDatabase) => void) {
  const dbReq: IDBOpenDBRequest = window.indexedDB.open(DATABASE_NAME)
  dbReq.onupgradeneeded = onUpgradeNeeded
  dbReq.onsuccess = performOperationOnSuccess(operation)
  dbReq.onerror = (event: any) => {
    console.log('error opening database ' + event.target.errorCode)
  }
}

function saveOperation (dayHours: SavedHourDescription[], key: string) {
  return (db: IDBDatabase) => {
    const weekListStore = db.transaction([WEEK_LIST_STORE_OBJECT_NAME], 'readwrite').objectStore(WEEK_LIST_STORE_OBJECT_NAME)
    weekListStore.put(dayHours, key)
  }
}

export function save (dayHours: SavedHourDescription[], key: string) {
  performOperation(saveOperation(dayHours, key))
}

function loadOperation (key: string, operation: (result: SavedHourDescription[]) => void) {
  return (db: IDBDatabase) => {
    const weekListStore = db.transaction([WEEK_LIST_STORE_OBJECT_NAME], 'readonly').objectStore(WEEK_LIST_STORE_OBJECT_NAME)
    const request = weekListStore.get(key)
    request.onsuccess = () => {
      const result = request.result
      if (result !== undefined) {
        operation(request.result)
      }
    }
    request.onerror = (event: any) => {
      alert('error loading ' + event.target.errorCode)
    }
  }
}

export function loadSaveData (key: string, operation: (result: SavedHourDescription[]) => void): void {
  performOperation(loadOperation(key, operation))
}
