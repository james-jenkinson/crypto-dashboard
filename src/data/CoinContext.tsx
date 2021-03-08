import React, { createContext, useCallback } from 'react'
import PropTypes from 'prop-types'
import coinGecko from '../services/coinGecko'
import coinReducer from './coin.reducer'
import { AsyncActionStatus } from './common'
import { Coin } from './coin'
import { selectCoin } from './coin.selector'
import { pastSearches } from './pastSearches'

interface CoinContextData {
  fetchCoin: (coinId: string) => void
  isLoading: boolean
  pastSearches: Array<{ term: string; timestamp: number }>
  coin: Coin | undefined
}

export const coinContext = createContext<CoinContextData>({
  fetchCoin: () => undefined,
  isLoading: false,
  pastSearches: [],
  coin: undefined,
})

const CoinContext: React.FC = (props) => {
  const [state, dispatch] = coinReducer()

  const fetchCoin = useCallback(async (coinId: string) => {
    dispatch({ type: 'FETCH_COIN_START', payload: { coinId } })
    try {
      const result = await coinGecko.getCoin(coinId)
      pastSearches.push({ term: coinId, timestamp: Date.now() })
      dispatch({ type: 'FETCH_COIN_SUCCESS', payload: { coinId, data: result } })
    } catch (error) {
      dispatch({ type: 'FETCH_COIN_ERROR', payload: { coinId, error } })
    }
  }, [])

  const coin = selectCoin(state)

  const value = {
    fetchCoin,
    isLoading: state.status === AsyncActionStatus.Loading,
    pastSearches,
    coin,
  }
  return <coinContext.Provider value={value}>{props.children}</coinContext.Provider>
}

CoinContext.propTypes = {
  children: PropTypes.node,
}

export default CoinContext
