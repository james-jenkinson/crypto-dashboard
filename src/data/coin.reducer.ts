import { useReducer } from 'react'
import { Coin } from '../services/coin'
import { AsyncActionStatus } from './common'

interface ReducerState {
  status: AsyncActionStatus
}

const initialState: ReducerState = {
  status: AsyncActionStatus.Initial,
}

type ReducerAction =
  | { type: 'FETCH_COIN_START'; payload: { coinId: string } }
  | { type: 'FETCH_COIN_SUCCESS'; payload: { coinId: string; data: Coin } }
  | { type: 'FETCH_COIN_ERROR'; payload: { coinId: string; error: Error } }

const reducer = (state: ReducerState, action: ReducerAction): ReducerState => {
  switch (action.type) {
    case 'FETCH_COIN_START':
      return {
        ...state,
        status: AsyncActionStatus.Loading,
      }
    case 'FETCH_COIN_SUCCESS':
      return {
        ...state,
        status: AsyncActionStatus.Ready,
      }
    case 'FETCH_COIN_ERROR':
      return {
        ...state,
        status: AsyncActionStatus.Error,
      }
  }
  return state
}

const coinReducer: Reducer<ReducerState, ReducerAction> = () => useReducer(reducer, initialState)

export default coinReducer
