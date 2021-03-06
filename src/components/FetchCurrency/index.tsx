import React from 'react'

const FetchCurrency: React.FC = () => {
  const onSubmit: React.FormEventHandler = (e) => {
    e.preventDefault()
    console.log(e)
  }

  return (
    <form onSubmit={onSubmit}>
      <label id="label-currency">Currency</label>
      <input aria-labelledby="label-currency" />
      <button type="submit">Submit</button>
    </form>
  )
}

export default FetchCurrency
