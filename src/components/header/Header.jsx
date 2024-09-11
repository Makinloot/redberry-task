import React from 'react'
import logo from '/logo.png'
import './Header.css'

const Header = () => {
  return (
    <header className='Header'>
        <div className="container">
            <div className="Header-wrapper">
                <img src={logo} alt='redberry logo' />
            </div>
        </div>
    </header>
  )
}

export default Header