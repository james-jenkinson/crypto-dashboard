import React, { useContext } from 'react'
import FetchCurrency from '../../components/FetchCurrency'
import LoadingSpinner from '../../components/LoadingIndicator'
import { coinContext } from '../../data/CoinContext'

function Home(): JSX.Element {
  const { isLoading } = useContext(coinContext)

  return (
    <div>
      <FetchCurrency />
      <LoadingSpinner isLoading={isLoading} />
    </div>
  )
}

export default Home
