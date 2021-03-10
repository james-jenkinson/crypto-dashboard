import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FetchCurrency from '..'
import TestCoinContext from '../../../testUtils/TestCoinContext'

describe('FetchCurrency', () => {
  it('should contain text input', () => {
    render(<FetchCurrency />)

    const input = screen.getByRole('textbox')

    expect(input).toBeInTheDocument()
  })

  it('should contain submit button', () => {
    render(<FetchCurrency />)

    const submit = screen.getByRole('button', { name: 'Submit' })

    expect(submit).toBeInTheDocument()
  })

  it('should fetch coin data on submission', async () => {
    const fetchCoin = jest.fn()
    render(
      <TestCoinContext fetchCoin={fetchCoin}>
        <FetchCurrency />
      </TestCoinContext>,
    )

    const input = screen.getByRole('textbox', { name: 'Currency' })
    const form = screen.getByRole('form')

    userEvent.type(input, 'my-coin')
    fireEvent.submit(form)

    await waitFor(() => expect(fetchCoin).toBeCalledWith('my-coin'))
  })

  it('should fetch market data on submission', async () => {
    const fetchMarketData = jest.fn()
    render(
      <TestCoinContext fetchMarketData={fetchMarketData}>
        <FetchCurrency />
      </TestCoinContext>,
    )

    const input = screen.getByRole('textbox', { name: 'Currency' })
    const form = screen.getByRole('form')

    userEvent.type(input, 'my-coin')
    fireEvent.submit(form)

    await waitFor(() => expect(fetchMarketData).toBeCalledWith('my-coin'))
  })

  it('should show an error when no text was entered', async () => {
    render(
      <TestCoinContext>
        <FetchCurrency />
      </TestCoinContext>,
    )

    const form = screen.getByRole('form')

    fireEvent.submit(form)

    const error = await screen.findByRole('alert', { name: 'currency-error' })
    const input = screen.getByRole('textbox', { name: 'Currency' })

    expect(error.textContent).toBe('please enter a coin identifier')
    expect(input).toHaveClass('form-input__input--error')
  })

  it('should indicate when an error ocurred in fetching coin data', () => {
    render(
      <TestCoinContext hasError coinId={'coin-id'}>
        <FetchCurrency />
      </TestCoinContext>,
    )

    const error = screen.getByRole('alert', { name: 'api-error' })

    expect(error.textContent).toBe('Unable to find details for coin-id')
  })
})
