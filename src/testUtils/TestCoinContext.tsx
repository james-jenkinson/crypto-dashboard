import React from 'react'
import merge from 'lodash.merge'
import PropTypes from 'prop-types'
import { coinContext } from '../data/CoinContext'
import { Coin } from '../data/coin'

interface Props {
  coin?: Partial<Coin>
  coinId?: string
  isLoading?: boolean
  hasError?: boolean
  fetchCoin?: () => void
  fetchMarketData?: () => void
  pastSearches?: Array<{ term: string; timestamp: number }>
  children: React.ReactNode
}

const TestCoinContext: React.FC<Props> = (props) => {
  const value = {
    coin: merge({}, props.coin) as Coin,
    coinId: props.coinId || 'coin-id',
    marketData: undefined,
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
  pastSearches: PropTypes.array,
  isLoading: PropTypes.bool,
  hasError: PropTypes.bool,
  fetchCoin: PropTypes.func,
  fetchMarketData: PropTypes.func,
}

export default TestCoinContext
