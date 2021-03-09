export interface Coin {
  name: string
  image: string
  symbol: string
  marketCapRank: number
  currentPriceUsd: string
  percentagePriceChange24h: number
  positiveChange: boolean
}

export interface MarketData {
  timestamps: Date[]
  prices: number[]
}
