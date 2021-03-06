import React from 'react'
import { render, screen } from '@testing-library/react'
import Home from '..'
import { coinContext } from '../../../data/CoinContext'

describe('Home', () => {
  it('should show loading indicator when loading', () => {
    render(
      <coinContext.Provider value={{ isLoading: true, fetchCoin: () => undefined }}>
        <Home />
      </coinContext.Provider>,
    )

    const loading = screen.getByLabelText('loading')

    expect(loading).toBeInTheDocument()
  })

  it('should not show loading indicator when not loading', () => {
    render(
      <coinContext.Provider value={{ isLoading: false, fetchCoin: () => undefined }}>
        <Home />
      </coinContext.Provider>,
    )

    const loading = screen.queryByLabelText('loading')

    expect(loading).not.toBeInTheDocument()
  })
})
