import React, { createContext, useCallback } from 'react'
import PropTypes from 'prop-types'
import coinGecko from '../services/coinGecko'

interface CoinContextData {
  fetchCoin: (coinId: string) => void
}

export const coinContext = createContext<CoinContextData>({
  fetchCoin: () => undefined,
})

const CoinContext: React.FC = (props) => {
  const fetchCoin = useCallback(async (coinId: string) => {
    const result = await coinGecko.getCoin(coinId)
    console.log('result', result)
  }, [])

  const value = {
    fetchCoin,
  }
  return <coinContext.Provider value={value}>{props.children}</coinContext.Provider>
}

CoinContext.propTypes = {
  children: PropTypes.node,
}

export default CoinContext
