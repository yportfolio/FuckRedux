import React from 'react'
import { Link } from 'react-router-dom'

export const Navbar = () => {
  return (
    <nav>
      <section>
        <h1>Fuck Redux</h1>

        <div className="navContent">
          <div className="navLinks">
            <Link to="/">posts</Link>
          </div>
        </div>
      </section>
    </nav>
  )
}
