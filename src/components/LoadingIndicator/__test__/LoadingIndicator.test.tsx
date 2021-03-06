import React from 'react'
import { render, screen } from '@testing-library/react'
import LoadingSpinner from '..'

describe('LoadingIndicator', () => {
  it('should render loading when isLoading is true', () => {
    render(<LoadingSpinner isLoading={true} />)

    const loading = screen.getByLabelText('loading')

    expect(loading).toBeInTheDocument()
  })

  it('should not render loading when isLoading is false', () => {
    render(<LoadingSpinner isLoading={false} />)

    const loading = screen.queryByLabelText('loading')

    expect(loading).not.toBeInTheDocument()
  })
})
