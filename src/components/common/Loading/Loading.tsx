import React from 'react'
import './Loading.scss'

interface LoadingProps {
  size?: 'small' | 'medium' | 'large'
  text?: string
  className?: string
}

const Loading: React.FC<LoadingProps> = ({ 
  size = 'medium', 
  text = 'Loading...', 
  className = '' 
}) => {
  return (
    <div className={`loading ${className}`}>
      <div className={`loading__spinner loading__spinner--${size}`}>
        <div className="loading__spinner-inner"></div>
      </div>
      {text && <p className="loading__text">{text}</p>}
    </div>
  )
}

export default Loading