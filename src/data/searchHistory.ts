import Dexie from 'dexie'

export interface Search {
  term: string
  timestamp: number
}
const db = new Dexie('CoinDashboardDatabase')

db.version(1).stores({
  previousSearches: '++_id, &term, timestamp',
})

export const searchTable = db.table<Search>('previousSearches')

export const saveSearchTerm = async (term: string): Promise<void> => {
  const query = searchTable.where({ term })
  if ((await query.count()) > 0) {
    await query.modify({ timestamp: Date.now() })
  } else {
    searchTable.add({ term, timestamp: Date.now() })
  }
}

export const getPastSearches = (): Promise<Search[]> => {
  return searchTable.orderBy('timestamp').reverse().toArray()
}
