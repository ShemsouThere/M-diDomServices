// eslint-disable-next-line no-unused-vars
import React from 'react';
import { MdOutlineManageAccounts } from "react-icons/md";
import { HiSearch } from "react-icons/hi";
import { FaUnlock } from "react-icons/fa6";
import './Navbar.css';

const Navbar = () => {
  const handleIconClick = () => {
    // Add functionality for when the icon is clicked
    console.log('Icon clicked!');
    // Add your desired action here
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <span>MediDomServices</span>
      </div>
      <ul className="navbar-nav">
        <li className="nav-item">
          <a href="/" className="nav-link">Home</a>
        </li>
        <li className="nav-item">
          <a href="/" className="nav-link">Services</a>
        </li>
        <li className="nav-item">
          <a href="/" className="nav-link">Rendez-vous</a>
        </li>
      </ul>
      <ul className='navbar-icons'>
      <li className='nav-icons'>
          <a href="/link-to-icon" className="icon-link" onClick={handleIconClick}>
          <HiSearch size={28}/>
          </a>
        </li>
        <li className='nav-icons'>
          <a href="/link-to-icon" className="icon-link" onClick={handleIconClick}>
          <FaUnlock size={20} />
          </a>
        </li>
        <li className='nav-icons'>
          <a href="/link-to-icon" className="icon-link" onClick={handleIconClick}>
            <MdOutlineManageAccounts size={30} />
          </a>
        </li>

      </ul>
    </nav>
  );
};

export default Navbar;
