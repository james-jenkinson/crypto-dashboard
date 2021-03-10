import React, { useContext } from 'react'
import Plot from 'react-plotly.js'
import { coinContext } from '../../data/CoinContext'

const MarketPlot: React.FC = () => {
  const { marketData, coin } = useContext(coinContext)

  if (!marketData || !coin) {
    return null
  }
  return (
    <div role="graphics-document">
      <Plot
        data={[
          {
            x: marketData?.timestamps,
            y: marketData?.prices,
            type: 'scatter',
            mode: 'lines+markers',
            marker: { color: 'red' },
          },
        ]}
        layout={{ width: 800, height: 600, title: `Changes in ${coin?.name} over last 7 days` }}
      />
    </div>
  )
}

export default MarketPlot
