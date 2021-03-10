import React, { useContext } from 'react'
import CoinDetails from '../../components/CoinDetails'
import FetchCurrency from '../../components/FetchCurrency'
import LoadingSpinner from '../../components/LoadingIndicator'
import MarketPlot from '../../components/MarketPlot'
import PastSearches from '../../components/PastSearches'
import { coinContext } from '../../data/CoinContext'
import './home.css'

function Home(): JSX.Element {
  const { isLoading } = useContext(coinContext)

  return (
    <div className="home">
      <div className="home__fetch-currency-form">
        <FetchCurrency />
        <PastSearches />
      </div>
      <div className="home__coin-details">
        <LoadingSpinner isLoading={isLoading} />
        <CoinDetails />
        <MarketPlot />
      </div>
    </div>
  )
}

export default Home
