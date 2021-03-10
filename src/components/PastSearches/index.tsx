import React, { useContext } from 'react'
import { coinContext } from '../../data/CoinContext'

const PastSearches: React.FC = () => {
  const { pastSearches } = useContext(coinContext)

  return (
    <div>
      <h2>Past searches</h2>
      <ul>
        {pastSearches.map((search) => (
          <li key={search.term}>{search.term}</li>
        ))}
      </ul>
    </div>
  )
}

export default PastSearches
