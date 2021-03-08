import React from 'react'
import merge from 'lodash.merge'
import PropTypes from 'prop-types'
import { coinContext } from '../data/CoinContext'
import { Coin } from '../data/coin'

interface Props {
  coin?: Partial<Coin>
  isLoading?: boolean
  fetchCoin?: () => void
  pastSearches?: Array<{ term: string; timestamp: number }>
  children: React.ReactNode
}

const TestCoinContext: React.FC<Props> = (props) => {
  const value = {
    coin: merge({}, props.coin) as Coin,
    isLoading: props.isLoading || false,
    fetchCoin: props.fetchCoin || (() => undefined),
    pastSearches: props.pastSearches || [],
  }
  return <coinContext.Provider value={value}>{props.children}</coinContext.Provider>
}

TestCoinContext.propTypes = {
  children: PropTypes.node,
  coin: PropTypes.object,
  pastSearches: PropTypes.array,
  isLoading: PropTypes.bool,
  fetchCoin: PropTypes.func,
}

export default TestCoinContext
