import React from 'react';
import { NavLink } from 'react-router-dom';

export const Navbar = () => {
  return(
    <nav>
      <div>
        <NavLink to="/">Конвертер</NavLink>
        <NavLink to="/pairs">Все пары</NavLink>
      </div>
    </nav>
  );
}