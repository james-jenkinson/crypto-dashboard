import React, { useContext } from 'react'
import { coinContext } from '../../data/CoinContext'

const PastSearches: React.FC = () => {
  const { pastSearches } = useContext(coinContext)

  return (
    <ul>
      {pastSearches.map((search) => (
        <li key={search.term}>{search.term}</li>
      ))}
    </ul>
  )
}

export default PastSearches
