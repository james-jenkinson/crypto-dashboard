import { useReducer } from 'react'
import { CoinResponse, MarketDataResponse } from '../services/coin'
import { AsyncActionStatus } from './common'
import { Search } from './searchHistory'

export interface ReducerState {
  status: AsyncActionStatus
  coinData: CoinResponse | undefined
  searchHistory: Search[]
  marketData: MarketDataResponse | undefined
}

const initialState: ReducerState = {
  status: AsyncActionStatus.Initial,
  coinData: undefined,
  marketData: undefined,
  searchHistory: [],
}

type ReducerAction =
  | { type: 'FETCH_COIN_START'; payload: { coinId: string } }
  | { type: 'FETCH_COIN_SUCCESS'; payload: { coinId: string; data: CoinResponse } }
  | { type: 'FETCH_COIN_ERROR'; payload: { coinId: string; error: Error } }
  | { type: 'UPDATE_SEARCH_HISTORY'; payload: { data: Search[] } }
  | { type: 'FETCH_MARKET_DATA_SUCCESS'; payload: { data: MarketDataResponse } }

const reducer = (state: ReducerState, action: ReducerAction): ReducerState => {
  switch (action.type) {
    case 'FETCH_COIN_START':
      return {
        ...state,
        status: AsyncActionStatus.Loading,
        coinData: undefined,
      }
    case 'FETCH_COIN_SUCCESS':
      return {
        ...state,
        status: AsyncActionStatus.Ready,
        coinData: action.payload.data,
      }
    case 'FETCH_COIN_ERROR':
      return {
        ...state,
        status: AsyncActionStatus.Error,
      }
    case 'UPDATE_SEARCH_HISTORY':
      return {
        ...state,
        searchHistory: action.payload.data,
      }
    case 'FETCH_MARKET_DATA_SUCCESS':
      return {
        ...state,
        marketData: action.payload.data,
      }
    default:
      return state
  }
}

const coinReducer: Reducer<ReducerState, ReducerAction> = () => useReducer(reducer, initialState)

export default coinReducer
