import React from 'react'
import './initial-loading.css'

interface InitialLoadingProps {
  isVisible: boolean
}

export const InitialLoading: React.FC<InitialLoadingProps> = ({
  isVisible,
}) => {
  if (!isVisible) return null

  return (
    <div id="initial-loading">
      <div className="spinner"></div>
    </div>
  )
}
