import React from 'react';
import { NavLink } from 'react-router-dom';

export const Navbar = () => {
  return(
    <div className="container">
      <nav className="navbar">
        <NavLink 
          activeClassName="navbar__link--active" 
          to="/" className="navbar__link"
          exact
        >Конвертер</NavLink>
        <NavLink 
          activeClassName="navbar__link--active" 
          to="/pairs" 
          className="navbar__link"
        >Валютные пары</NavLink>
      </nav>
    </div>
  );
}