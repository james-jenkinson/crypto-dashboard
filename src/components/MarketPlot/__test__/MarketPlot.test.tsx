import React from 'react'
import { render, screen } from '@testing-library/react'
import TestCoinContext from '../../../testUtils/TestCoinContext'
import MarketPlot from '..'

describe('MarketPlot', () => {
  it('should show plot when market data and coin data are present', () => {
    render(
      <TestCoinContext marketData={{ prices: [], timestamps: [] }} coin={{ name: 'coin' }}>
        <MarketPlot />
      </TestCoinContext>,
    )

    const plot = screen.getByRole('graphics-document')

    expect(plot).toBeInTheDocument()
  })

  it('should hide plot when market data not available', () => {
    render(
      <TestCoinContext coin={{ name: 'coin' }}>
        <MarketPlot />
      </TestCoinContext>,
    )

    const plot = screen.queryByRole('graphics-document')

    expect(plot).not.toBeInTheDocument()
  })

  it('should hide plot when coin data not available', () => {
    render(
      <TestCoinContext marketData={{ prices: [], timestamps: [] }}>
        <MarketPlot />
      </TestCoinContext>,
    )

    const plot = screen.queryByRole('graphics-document')

    expect(plot).not.toBeInTheDocument()
  })
})
