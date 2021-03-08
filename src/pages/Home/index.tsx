import React, { useContext } from 'react'
import CoinDetails from '../../components/CoinDetails'
import FetchCurrency from '../../components/FetchCurrency'
import LoadingSpinner from '../../components/LoadingIndicator'
import PastSearches from '../../components/PastSearches'
import { coinContext } from '../../data/CoinContext'

function Home(): JSX.Element {
  const { isLoading } = useContext(coinContext)

  return (
    <div>
      <FetchCurrency />
      <PastSearches />
      <LoadingSpinner isLoading={isLoading} />
      <CoinDetails />
    </div>
  )
}

export default Home
