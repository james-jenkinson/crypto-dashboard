import React from 'react'
import { render, screen, within } from '@testing-library/react'
import { Coin } from '../../../data/coin'
import { coinContext } from '../../../data/CoinContext'
import CoinDetails from '..'

describe('CoinDetails', () => {
  const contextValue = {
    isLoading: false,
    fetchCoin: () => undefined,
    coin: {
      currentPriceUsd: 'price-usd',
      image: 'image-path',
      marketCapRank: 99,
      percentagePriceChange24h: 77,
      name: 'coin-name',
      symbol: 'coin-symbol',
    } as Coin,
  }
  const testRender = () =>
    render(
      <coinContext.Provider value={contextValue}>
        <CoinDetails />
      </coinContext.Provider>,
    )

  it('should display logo', () => {
    testRender()

    const image = screen.getByRole('img', { name: 'Logo for coin-name' }) as HTMLImageElement

    expect(image).toBeInTheDocument()
    expect(image.src).toBe('http://localhost/image-path')
  })

  it('should show marketcap rank', () => {
    testRender()

    const row = screen.getByText('Marketcap rank').closest('tr') as HTMLElement

    const withinRow = within(row)
    expect(withinRow.getByText('99')).toBeInTheDocument()
  })

  it('should show name', () => {
    testRender()

    const row = screen.getByText('Name').closest('tr') as HTMLElement

    const withinRow = within(row)
    expect(withinRow.getByText('coin-name')).toBeInTheDocument()
  })

  it('should show current USD price', () => {
    testRender()

    const row = screen.getByText('Price (USD)').closest('tr') as HTMLElement

    const withinRow = within(row)
    expect(withinRow.getByText('price-usd')).toBeInTheDocument()
  })

  it('should show symbol', () => {
    testRender()

    const row = screen.getByText('Symbol').closest('tr') as HTMLElement

    const withinRow = within(row)
    expect(withinRow.getByText('coin-symbol')).toBeInTheDocument()
  })

  it('should show 24 hour percentual price change', () => {
    testRender()

    const row = screen.getByText('Price change over last 24 hours').closest('tr') as HTMLElement

    const withinRow = within(row)
    expect(withinRow.getByText('77')).toBeInTheDocument()
  })
})
