export interface CoinResponse {
  id: string
  symbol: string
  name: string
  image: {
    thumb: string
  }
  market_cap_rank: number
  market_data: {
    current_price: {
      usd: number
    }
    price_change_percentage_24h: number
  }
}

type Timestamp = number
type Price = number
export interface MarketDataResponse {
  prices: [Timestamp, Price][]
}
