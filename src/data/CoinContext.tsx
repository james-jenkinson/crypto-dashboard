import React, { createContext, useCallback } from 'react'
import PropTypes from 'prop-types'
import coinGecko from '../services/coinGecko'
import coinReducer from './coin.reducer'
import { AsyncActionStatus } from './common'
import { Coin } from './coin'
import { selectCoin } from './coin.selector'

interface CoinContextData {
  fetchCoin: (coinId: string) => void
  isLoading: boolean
  coin: Coin | undefined
}

export const coinContext = createContext<CoinContextData>({
  fetchCoin: () => undefined,
  isLoading: false,
  coin: undefined,
})

const CoinContext: React.FC = (props) => {
  const [state, dispatch] = coinReducer()

  const fetchCoin = useCallback(async (coinId: string) => {
    dispatch({ type: 'FETCH_COIN_START', payload: { coinId } })
    try {
      const result = await coinGecko.getCoin(coinId)
      dispatch({ type: 'FETCH_COIN_SUCCESS', payload: { coinId, data: result } })
    } catch (error) {
      dispatch({ type: 'FETCH_COIN_ERROR', payload: { coinId, error } })
    }
  }, [])

  const coin = selectCoin(state)

  const value = {
    fetchCoin,
    isLoading: state.status === AsyncActionStatus.Loading,
    coin,
  }
  return <coinContext.Provider value={value}>{props.children}</coinContext.Provider>
}

CoinContext.propTypes = {
  children: PropTypes.node,
}

export default CoinContext
