import { useReducer } from 'react'
import { CoinResponse } from '../services/coin'
import { AsyncActionStatus } from './common'

export interface ReducerState {
  status: AsyncActionStatus
  coinData: CoinResponse | undefined
}

const initialState: ReducerState = {
  status: AsyncActionStatus.Initial,
  coinData: undefined,
}

type ReducerAction =
  | { type: 'FETCH_COIN_START'; payload: { coinId: string } }
  | { type: 'FETCH_COIN_SUCCESS'; payload: { coinId: string; data: CoinResponse } }
  | { type: 'FETCH_COIN_ERROR'; payload: { coinId: string; error: Error } }

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
    default:
      return state
  }
}

const coinReducer: Reducer<ReducerState, ReducerAction> = () => useReducer(reducer, initialState)

export default coinReducer
