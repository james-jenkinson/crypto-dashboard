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
  hasError: boolean
  coinId: string | undefined
  pastSearches: Array<{ term: string; timestamp: number }>
  coin: Coin | undefined
  marketData: MarketData | undefined
}

export const coinContext = createContext<CoinContextData>({
  fetchCoin: () => undefined,
  fetchMarketData: () => undefined,
  isLoading: false,
  hasError: false,
  coinId: undefined,
  pastSearches: [],
  coin: undefined,
  marketData: undefined,
})

const CoinContext: React.FC = (props) => {
  const [state, dispatch] = coinReducer()

  useEffect(() => {
    getPastSearches().then((searches) => {
      if (searches.length) {
        dispatch({ type: 'UPDATE_SEARCH_HISTORY', payload: { data: searches } })
      }
    })
  }, [])

  const fetchCoin = useCallback(
    async (coinId: string) => {
      if (state.coinId === coinId && state.coinData) {
        return
      }
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
    },
    [state.coinId, state.coinData],
  )

  const fetchMarketData = useCallback(
    async (coinId: string) => {
      if (state.coinId === coinId && state.marketData) {
        return
      }
      try {
        const result = await coinGecko.getMarketData(coinId)
        dispatch({ type: 'FETCH_MARKET_DATA_SUCCESS', payload: { data: result } })
      } catch (error) {
        console.error(error)
      }
    },
    [state.coinId, state.marketData],
  )

  const coin = selectCoin(state)
  const marketData = selectMarketData(state)

  const value = {
    fetchCoin,
    fetchMarketData,
    isLoading: state.status === AsyncActionStatus.Loading,
    hasError: state.status === AsyncActionStatus.Error,
    pastSearches: state.searchHistory,
    coin,
    coinId: state.coinId,
    marketData,
  }
  return <coinContext.Provider value={value}>{props.children}</coinContext.Provider>
}

CoinContext.propTypes = {
  children: PropTypes.node,
}

export default CoinContext
