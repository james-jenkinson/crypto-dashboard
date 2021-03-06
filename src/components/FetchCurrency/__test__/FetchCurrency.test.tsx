import React from 'react'
import { render, screen } from '@testing-library/react'
import FetchCurrency from '..'

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
})
