import React, { useContext, useEffect } from 'react'
import { render, screen } from '@testing-library/react'
import CoinContext, { coinContext } from '../CoinContext'
import coinGecko from '../../services/coinGecko'

jest.mock('../../services/coinGecko')

describe('CoinContext', () => {
  const ExampleConsumer: React.FC = () => {
    const { isLoading, fetchCoin } = useContext(coinContext)
    useEffect(() => {
      fetchCoin('test')
    }, [])

    return <div>{isLoading ? 'LOADING' : 'NOT LOADING'}</div>
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

  it('should indicated not loading after data is fetched', async () => {
    const getCoin = coinGecko.getCoin as jest.Mock
    getCoin.mockResolvedValue('ok')

    render(
      <CoinContext>
        <ExampleConsumer />
      </CoinContext>,
    )

    const notLoading = await screen.findByText('NOT LOADING')

    expect(notLoading).toBeInTheDocument()
  })
})
