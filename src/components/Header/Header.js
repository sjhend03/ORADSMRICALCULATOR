import React from 'react'
import { NavLink } from 'react-router-dom';
import logo from '../../images/ORADS_FINAL LOGO.png';

function Header() {
    return (
        <div>
            <div className='calculator-header' id='top'>
                <h1>O-RADS MRI</h1>
                <h3>Improving ovarian lesion characterization to facilitate optimal patient management</h3>
                <img className='orads-logo' alt='logo' src={logo} />
            </div>
            <nav className='orads-buttons'>
                <NavLink to='/' className='nav-button'>Calculator</NavLink>
                <NavLink to='/quick-guide' className='nav-button'>Calculator Quick Guide</NavLink>
                <NavLink to='/authors' className='nav-button'>Authors</NavLink>
                <NavLink to='/technical-requirements' className='nav-button'>Technical Requirements</NavLink>
                <NavLink to='/research' className='nav-button'>Research</NavLink>
            </nav>
        </div>
    )
}

export default Header