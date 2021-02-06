import HourDescription from '@/domain/domain/HourDescription'

const WEEK_LIST_STORE_OBJECT_NAME = 'weeklist'
const DATABASE_NAME = 'organizer'

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
    alert('error opening database ' + event.target.errorCode)
  }
}

type WeekList = Map<string, Array<HourDescription>>

function saveOperation (weekList: WeekList) {
  return (db: IDBDatabase) => {
    const weekListStore = db.transaction([WEEK_LIST_STORE_OBJECT_NAME], 'readwrite').objectStore(WEEK_LIST_STORE_OBJECT_NAME)
    weekListStore.put(weekList, 1)
  }
}

export function save (weekList: WeekList) {
  performOperation(saveOperation(weekList))
}

function loadOperation (operation: (result: Array<WeekList>) => void) {
  return (db: IDBDatabase) => {
    const weekListStore = db.transaction([WEEK_LIST_STORE_OBJECT_NAME], 'readonly').objectStore(WEEK_LIST_STORE_OBJECT_NAME)
    const request = weekListStore.getAll()
    request.onsuccess = () => {
      operation(request.result)
    }
    request.onerror = (event: any) => {
      alert('error loading ' + event.target.errorCode)
    }
  }
}

export function loadSaveData (operation: (result: Array<WeekList>) => void): void {
  performOperation(loadOperation(operation))
}
