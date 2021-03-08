import React, { useContext } from 'react'
import FetchCurrency from '../../components/FetchCurrency'
import LoadingSpinner from '../../components/LoadingIndicator'
import { coinContext } from '../../data/CoinContext'

function Home(): JSX.Element {
  const { isLoading, coin } = useContext(coinContext)

  return (
    <div>
      <FetchCurrency />
      <LoadingSpinner isLoading={isLoading} />
      <div>{coin?.name}</div>
      <img src={coin?.image} />
      <div>{coin?.currentPriceUsd}</div>
    </div>
  )
}

export default Home
