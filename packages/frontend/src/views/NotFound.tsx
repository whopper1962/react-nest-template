import React from 'react'
import { Link } from 'react-router-dom'

export const NotFound: React.FC = () => {
  return (
    <div>
      <h2>Page not found</h2>
      <Link to={"/"}>Home</Link>
    </div>
  )
}
