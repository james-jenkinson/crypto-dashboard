import React from 'react'
import PropTypes from 'prop-types'
import './loadingIndicator.css'

interface Props {
  isLoading: boolean
}

const LoadingSpinner: React.FC<Props> = (props) => {
  return <>{props.isLoading && <div className="loading-indicator" aria-label="loading"></div>}</>
}

LoadingSpinner.propTypes = {
  isLoading: PropTypes.bool.isRequired,
}

export default LoadingSpinner
