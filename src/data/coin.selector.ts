import { useMemo } from 'react'
import { CoinResponse } from '../services/coin'
import { Coin } from './coin'
import { ReducerState as CoinReducerState } from './coin.reducer'

export const coinSelector = (coinData: CoinResponse): Coin => {
  return {
    name: coinData.name,
    image: coinData.image?.thumb,
    symbol: coinData.symbol,
    currentPriceUsd: `$${coinData.market_data?.current_price?.usd}`,
    marketCapRank: coinData.market_cap_rank,
    percentagePriceChange24h: coinData.market_data?.price_change_percentage_24h,
    positiveChange: coinData.market_data?.price_change_percentage_24h >= 0,
  }
}

export const selectCoin = (state: CoinReducerState): Coin | undefined =>
  useMemo(() => {
    if (!state.coinData) {
      return undefined
    }
    return coinSelector(state.coinData)
  }, [state.coinData])
