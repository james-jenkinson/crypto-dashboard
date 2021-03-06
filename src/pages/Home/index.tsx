import React, { useContext } from 'react'
import FetchCurrency from '../../components/FetchCurrency'
import { coinContext } from '../../data/CoinContext'

function Home(): JSX.Element {
  const { isLoading } = useContext(coinContext)

  return (
    <div>
      <FetchCurrency />
      {isLoading && <span aria-label="loading">Loading</span>}
    </div>
  )
}

export default Home
