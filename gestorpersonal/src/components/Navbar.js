import { Link } from 'react-router-dom'
import { useEffect } from 'react'

function Navbar() {

  return (
    <nav>
      <ul>
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    </nav>
  )
}

export default Navbar