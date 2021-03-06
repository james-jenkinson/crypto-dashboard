import fetch from 'isomorphic-fetch'
import { Coin } from './coin'

const coinGecko = {
  getCoin,
}

async function getCoin(coinId: string): Promise<Coin> {
  const path = `https://api.coingecko.com/api/v3/coins/${coinId}`
  const result = await fetch(path)

  return result.json()
}

export default coinGecko
