import React from 'react'
import merge from 'lodash.merge'
import PropTypes from 'prop-types'
import { coinContext } from '../data/CoinContext'
import { Coin, MarketData } from '../data/coin'

interface Props {
  coin?: Partial<Coin>
  coinId?: string
  marketData?: Partial<MarketData>
  isLoading?: boolean
  hasError?: boolean
  fetchCoin?: () => void
  fetchMarketData?: () => void
  pastSearches?: Array<{ term: string; timestamp: number }>
  children: React.ReactNode
}

const TestCoinContext: React.FC<Props> = (props) => {
  const value = {
    coin: props.coin ? (merge({}, props.coin) as Coin) : undefined,
    coinId: props.coinId || 'coin-id',
    marketData: props.marketData ? (merge({}, props.marketData) as MarketData) : undefined,
    isLoading: props.isLoading || false,
    hasError: props.hasError || false,
    fetchCoin: props.fetchCoin || (() => undefined),
    fetchMarketData: props.fetchMarketData || (() => undefined),
    pastSearches: props.pastSearches || [],
  }
  return <coinContext.Provider value={value}>{props.children}</coinContext.Provider>
}

TestCoinContext.propTypes = {
  children: PropTypes.node,
  coin: PropTypes.object,
  coinId: PropTypes.string,
  marketData: PropTypes.object,
  pastSearches: PropTypes.array,
  isLoading: PropTypes.bool,
  hasError: PropTypes.bool,
  fetchCoin: PropTypes.func,
  fetchMarketData: PropTypes.func,
}

export default TestCoinContext
