import React, { createContext, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import coinGecko from '../services/coinGecko'
import coinReducer from './coin.reducer'
import { AsyncActionStatus } from './common'
import { Coin, MarketData } from './coin'
import { selectCoin, selectMarketData } from './coin.selector'
import { getPastSearches, saveSearchTerm } from './searchHistory'

interface CoinContextData {
  fetchCoin: (coinId: string) => void
  fetchMarketData: (coinId: string) => void
  isLoading: boolean
  pastSearches: Array<{ term: string; timestamp: number }>
  coin: Coin | undefined
  marketData: MarketData | undefined
}

export const coinContext = createContext<CoinContextData>({
  fetchCoin: () => undefined,
  fetchMarketData: () => undefined,
  isLoading: false,
  pastSearches: [],
  coin: undefined,
  marketData: undefined,
})

const CoinContext: React.FC = (props) => {
  const [state, dispatch] = coinReducer()

  useEffect(() => {
    getPastSearches().then((searches) =>
      dispatch({ type: 'UPDATE_SEARCH_HISTORY', payload: { data: searches } }),
    )
  }, [])

  const fetchCoin = useCallback(async (coinId: string) => {
    dispatch({ type: 'FETCH_COIN_START', payload: { coinId } })
    try {
      const result = await coinGecko.getCoin(coinId)
      saveSearchTerm(coinId).then(async () => {
        const searches = await getPastSearches()
        dispatch({ type: 'UPDATE_SEARCH_HISTORY', payload: { data: searches } })
      })
      dispatch({ type: 'FETCH_COIN_SUCCESS', payload: { coinId, data: result } })
    } catch (error) {
      dispatch({ type: 'FETCH_COIN_ERROR', payload: { coinId, error } })
    }
  }, [])

  const fetchMarketData = useCallback(async (coinId: string) => {
    const result = await coinGecko.getMarketData(coinId)
    dispatch({ type: 'FETCH_MARKET_DATA_SUCCESS', payload: { data: result } })
  }, [])

  const coin = selectCoin(state)
  const marketData = selectMarketData(state)

  const value = {
    fetchCoin,
    fetchMarketData,
    isLoading: state.status === AsyncActionStatus.Loading,
    pastSearches: state.searchHistory,
    coin,
    marketData,
  }
  return <coinContext.Provider value={value}>{props.children}</coinContext.Provider>
}

CoinContext.propTypes = {
  children: PropTypes.node,
}

export default CoinContext
