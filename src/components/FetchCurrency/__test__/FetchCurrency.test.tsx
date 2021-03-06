import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FetchCurrency from '..'
import { coinContext } from '../../../data/CoinContext'

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
      <coinContext.Provider value={{ fetchCoin, isLoading: false }}>
        <FetchCurrency />
      </coinContext.Provider>,
    )

    const input = screen.getByRole('textbox', { name: 'Currency' })
    const form = screen.getByRole('form')

    userEvent.type(input, 'my-coin')
    fireEvent.submit(form)

    await waitFor(() => expect(fetchCoin).toBeCalledWith('my-coin'))
  })
})
