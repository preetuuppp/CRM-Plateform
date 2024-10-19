import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <>
        <nav className="bg-blue-600 text-white p-4">
          <ul className="flex justify-center space-x-8">
            <li><Link to="/" className="hover:underline">Add Contact</Link></li>
            <li><Link to="/contacts" className="hover:underline">Contacts</Link></li>
            <li><Link to="/companies" className="hover:underline">Companies</Link></li>
            <li><Link to="/tickets" className="hover:underline">Tickets</Link></li>

          </ul>
        </nav>
    </>
  )
}

export default Navbar