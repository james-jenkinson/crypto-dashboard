import fetch from 'isomorphic-fetch'
import { CoinResponse, MarketDataResponse } from './coin'

const coinGecko = {
  getCoin,
  getMarketData,
}

async function getCoin(coinId: string): Promise<CoinResponse> {
  const path = `https://api.coingecko.com/api/v3/coins/${coinId}?tickers=false&community_data=false&developer_data=false&sparkline=false`
  const result = await fetch(path)

  if (result.status >= 400) {
    throw new Error(await result.text())
  }

  return result.json()
}

async function getMarketData(coinId: string): Promise<MarketDataResponse> {
  const path = `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=7`
  const result = await fetch(path)

  if (result.status >= 400) {
    throw new Error(await result.text())
  }

  return result.json()
}

export default coinGecko
