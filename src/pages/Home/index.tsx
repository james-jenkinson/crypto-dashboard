import React, { useContext } from 'react'
import CoinDetails from '../../components/CoinDetails'
import FetchCurrency from '../../components/FetchCurrency'
import LoadingSpinner from '../../components/LoadingIndicator'
import MarketPlot from '../../components/MarketPlot'
import PastSearches from '../../components/PastSearches'
import { coinContext } from '../../data/CoinContext'
import './home.css'

function Home(): JSX.Element {
  const { isLoading, coin } = useContext(coinContext)

  return (
    <div>
      <h1>Search for details for a coin</h1>
      <div className="home__fetch-currency-form">
        <FetchCurrency />
        <PastSearches />
      </div>
      {coin?.name && <h1>Details of {coin.name}</h1>}
      <div className="home__coin-details">
        <LoadingSpinner isLoading={isLoading} />
        <CoinDetails />
        <MarketPlot />
      </div>
    </div>
  )
}

export default Home
