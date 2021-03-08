import React, { useContext } from 'react'
import { coinContext } from '../../data/CoinContext'

const CoinDetails: React.FC = () => {
  const { coin } = useContext(coinContext)
  if (!coin) {
    return null
  }

  return (
    <>
      <img alt={`Logo for ${coin.name}`} src={coin.image}></img>
      <table>
        <caption>Details for {coin.name}</caption>
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
            <td>{coin.currentPriceUsd}</td>
          </tr>
          <tr>
            <th>Symbol</th>
            <td>{coin.symbol}</td>
          </tr>
          <tr>
            <th>Price change over last 24 hours</th>
            <td>{coin.percentagePriceChange24h}</td>
          </tr>
        </tbody>
      </table>
    </>
  )
}

export default CoinDetails
