import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { coinContext } from '../../data/CoinContext'

const FetchCurrency: React.FC = () => {
  const { fetchCoin, fetchMarketData } = useContext(coinContext)
  const { handleSubmit, register } = useForm()
  const onSubmit = (payload: { currency: string }) => {
    fetchCoin(payload.currency)
    fetchMarketData(payload.currency)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} aria-label="fetch-currency">
      <label id="label-currency">Currency</label>
      <input name="currency" aria-labelledby="label-currency" ref={register} />
      <button type="submit">Submit</button>
    </form>
  )
}

export default FetchCurrency
