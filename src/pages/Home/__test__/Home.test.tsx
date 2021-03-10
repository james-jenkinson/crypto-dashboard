import React from 'react'
import { render, screen } from '@testing-library/react'
import Home from '..'
import TestCoinContext from '../../../testUtils/TestCoinContext'

describe('Home', () => {
  it('should show loading indicator when loading', () => {
    render(
      <TestCoinContext isLoading>
        <Home />
      </TestCoinContext>,
    )

    const loading = screen.getByLabelText('loading')

    expect(loading).toBeInTheDocument()
  })

  it('should not show loading indicator when not loading', () => {
    render(
      <TestCoinContext isLoading={false}>
        <Home />
      </TestCoinContext>,
    )

    const loading = screen.queryByLabelText('loading')

    expect(loading).not.toBeInTheDocument()
  })

  it('should show heading when coin details were fetched', () => {
    render(
      <TestCoinContext coin={{ name: 'test-coin' }}>
        <Home />
      </TestCoinContext>,
    )

    const headingList = screen.getAllByRole('heading', { name: 'coin-details-heading' })

    const coinDetailsHeading = headingList.find(
      (heading) => heading.textContent === 'Details of test-coin',
    )
    expect(coinDetailsHeading).toBeInTheDocument()
  })
})
