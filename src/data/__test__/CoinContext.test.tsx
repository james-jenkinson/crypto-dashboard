import React, { useContext, useEffect } from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import CoinContext, { coinContext } from '../CoinContext'
import coinGecko from '../../services/coinGecko'
import { searchTable } from '../searchHistory'

jest.mock('../../services/coinGecko')

describe('CoinContext', () => {
  beforeEach(async () => {
    // To ensure that the rendered search term
    // isn't left over from the previous test
    await searchTable.clear()
  })

  const ExampleConsumer: React.FC = () => {
    const { isLoading, coin, fetchCoin, fetchMarketData, pastSearches, marketData } = useContext(
      coinContext,
    )

    useEffect(() => {
      fetchCoin('test')
      fetchMarketData('test')
    }, [])

    return (
      <>
        <div>{isLoading ? 'LOADING' : 'NOT LOADING'}</div>
        <div>{coin?.name}</div>
        <div>{marketData?.prices[0]}</div>
        <div>{pastSearches[0]?.term}</div>
      </>
    )
  }

  it('should indicate loading status when fetched', async () => {
    const getCoin = coinGecko.getCoin as jest.Mock
    getCoin.mockImplementation(
      () =>
        new Promise((resolve) => {
          setTimeout(() => resolve('okay'), 1000)
        }),
    )

    render(
      <CoinContext>
        <ExampleConsumer />
      </CoinContext>,
    )

    const result = await screen.findByText('LOADING')
    expect(result).toBeInTheDocument()

    const notLoading = await screen.findByText('NOT LOADING', undefined, {
      timeout: 500,
      onTimeout: () => (null as unknown) as Error,
    })

    expect(notLoading).not.toBeInTheDocument()
  })

  it('should indicate not loading after data is fetched', async () => {
    const getCoin = coinGecko.getCoin as jest.Mock
    getCoin.mockResolvedValue('ok')

    render(
      <CoinContext>
        <ExampleConsumer />
      </CoinContext>,
    )
    // We need to wait for the search term to appear to ensure
    // we're not unmounting before the state has been updated
    await waitFor(() => screen.getByText('test'))

    const notLoading = await screen.findByText('NOT LOADING')

    expect(notLoading).toBeInTheDocument()
  })

  it('should contain coin data after being fetched', async () => {
    const getCoin = coinGecko.getCoin as jest.Mock
    const data = { name: 'coin-name' }
    getCoin.mockResolvedValue(data)

    render(
      <CoinContext>
        <ExampleConsumer />
      </CoinContext>,
    )
    // We need to wait for the search term to appear to ensure
    // we're not unmounting before the state has been updated
    await waitFor(() => screen.getByText('test'))

    const coinName = await screen.findByText('coin-name')

    expect(coinName).toBeInTheDocument()
  })

  it('should include market data after being fetched', async () => {
    const getCoin = coinGecko.getMarketData as jest.Mock
    const data = { prices: [[0, 999]] }
    getCoin.mockResolvedValue(data)

    render(
      <CoinContext>
        <ExampleConsumer />
      </CoinContext>,
    )
    // We need to wait for the search term to appear to ensure
    // we're not unmounting before the state has been updated
    await waitFor(() => screen.getByText('test'))

    const coinName = await screen.findByText('999')

    expect(coinName).toBeInTheDocument()
  })

  it('should include search in search history', async () => {
    render(
      <CoinContext>
        <ExampleConsumer />
      </CoinContext>,
    )

    const coinName = await screen.findByText('test')

    expect(coinName).toBeInTheDocument()
  })
})
