import { CoinResponse } from '../../services/coin'
import { Coin } from '../coin'
import { coinSelector } from '../coin.selector'

describe('Coin selector', () => {
  describe('selectCoin', () => {
    it('should correctly map the data', () => {
      const coin = coinSelector({
        id: 'id',
        image: {
          thumb: 'image',
        },
        market_cap_rank: 99,
        market_data: {
          current_price: {
            usd: 777,
          },
          price_change_percentage_24h: 888,
        },
        name: 'name',
        symbol: 'symbol',
      })

      expect(coin).toMatchObject({
        name: 'name',
        currentPriceUsd: '$777',
        image: 'image',
        marketCapRank: 99,
        percentagePriceChange24h: 888,
        positiveChange: true,
        symbol: 'symbol',
      } as Coin)
    })
  })

  it('should indicate when positive change', () => {
    const coin = coinSelector({
      market_data: {
        price_change_percentage_24h: 1,
      },
    } as CoinResponse)

    expect(coin.positiveChange).toBe(true)
  })

  it('should indicate when negative change', () => {
    const coin = coinSelector({
      market_data: {
        price_change_percentage_24h: -1,
      },
    } as CoinResponse)

    expect(coin.positiveChange).toBe(false)
  })
})
