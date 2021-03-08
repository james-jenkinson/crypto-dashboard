import fetch from 'isomorphic-fetch'
import { CoinResponse } from './coin'

const coinGecko = {
  getCoin,
}

async function getCoin(coinId: string): Promise<CoinResponse> {
  const path = `https://api.coingecko.com/api/v3/coins/${coinId}?tickers=false&community_data=false&developer_data=false&sparkline=false`
  const result = await fetch(path)

  return result.json()
}

export default coinGecko
