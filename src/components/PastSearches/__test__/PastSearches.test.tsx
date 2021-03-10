import React from 'react'
import { render, screen } from '@testing-library/react'
import TestCoinContext from '../../../testUtils/TestCoinContext'
import PastSearches from '..'

describe('PastSearches', () => {
  it('should show previous searrches', () => {
    render(
      <TestCoinContext
        pastSearches={[
          { term: 'search-1', timestamp: 0 },
          { term: 'search-2', timestamp: 1 },
        ]}
      >
        <PastSearches />
      </TestCoinContext>,
    )

    expect(screen.getByText('search-1')).toBeInTheDocument()
    expect(screen.getByText('search-2')).toBeInTheDocument()
  })

  it('should indicate when there are no past searches', () => {
    render(
      <TestCoinContext pastSearches={[]}>
        <PastSearches />
      </TestCoinContext>,
    )

    expect(screen.getByText('No searches yet')).toBeInTheDocument()
  })
})
