import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Navbar.css'; // Kita akan buat file CSS ini

const Navbar = ({ theme, toggleTheme }) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <NavLink to="/" className="navbar-logo">
          SEA Catering
        </NavLink>
        <div className="nav-menu">
          <NavLink to="/" className="nav-item" activeClassName="active">Home</NavLink>
          <NavLink to="/menu" className="nav-item" activeClassName="active">Menu</NavLink>
          <NavLink to="/subscription" className="nav-item" activeClassName="active">Subscription</NavLink>
          <NavLink to="/contact" className="nav-item" activeClassName="active">Contact Us</NavLink>
        </div>
        <button onClick={toggleTheme} className="btn outline-menu">
          {theme === 'light' ? 'Dark' : 'Light'} Mode
        </button>
      </div>
    </nav>
  );
};

export default Navbar;