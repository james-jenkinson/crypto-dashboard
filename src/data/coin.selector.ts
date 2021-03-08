import { useMemo } from 'react'
import { Coin } from './coin'
import { ReducerState as CoinReducerState } from './coin.reducer'

export const selectCoin = (state: CoinReducerState): Coin | undefined =>
  useMemo(() => {
    if (!state.coinData) {
      return undefined
    }
    const coinData = state.coinData
    return {
      name: coinData.name,
      image: coinData.image?.thumb,
      symbol: coinData.symbol,
      currentPriceUsd: `$${coinData.market_data?.current_price?.usd}`,
      marketCapRank: coinData.market_cap_rank,
      percentagePriceChange24h: coinData.price_change_percentage_24h,
    }
  }, [state.coinData])
