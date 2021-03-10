import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { coinContext } from '../../data/CoinContext'
import { yupResolver } from '@hookform/resolvers/yup'
import { object, string } from 'yup'

const FetchCurrency: React.FC = () => {
  const { fetchCoin, fetchMarketData } = useContext(coinContext)
  const { handleSubmit, register, errors } = useForm({
    resolver: yupResolver(
      object({
        currency: string().required('please enter a coin identifier'),
      }),
    ),
  })
  const onSubmit = (payload: { currency: string }) => {
    fetchCoin(payload.currency)
    fetchMarketData(payload.currency)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} aria-label="fetch-currency">
      <label id="label-currency">
        Currency<span aria-hidden>*</span>
      </label>
      <input name="currency" aria-labelledby="label-currency" aria-required ref={register} />
      {errors.currency && <span role="alert">{errors.currency.message}</span>}
      <button type="submit">Submit</button>
    </form>
  )
}

export default FetchCurrency
