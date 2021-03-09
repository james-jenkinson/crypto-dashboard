import React, { useContext } from 'react'
import { coinContext } from '../../data/CoinContext'
import './coinDetails.css'

const CoinDetails: React.FC = () => {
  const { coin } = useContext(coinContext)
  if (!coin) {
    return null
  }

  const priceIndicatorClassName = coin.positiveChange
    ? 'coin-details__price-indicator--positive'
    : 'coin-details__price-indicator--negative'

  return (
    <>
      <table>
        <caption>
          Details for {coin.name}
          <img alt={`Logo for ${coin.name}`} src={coin.image}></img>
        </caption>
        <tbody>
          <tr>
            <th>Marketcap rank</th>
            <td>{coin.marketCapRank}</td>
          </tr>
          <tr>
            <th>Name</th>
            <td>{coin.name}</td>
          </tr>
          <tr>
            <th>Price (USD)</th>
            <td className={priceIndicatorClassName}>{coin.currentPriceUsd}</td>
          </tr>
          <tr>
            <th>Symbol</th>
            <td>{coin.symbol}</td>
          </tr>
          <tr>
            <th>Price change over last 24 hours</th>
            <td className={priceIndicatorClassName}>{coin.percentagePriceChange24h}</td>
          </tr>
        </tbody>
      </table>
    </>
  )
}

export default CoinDetails
