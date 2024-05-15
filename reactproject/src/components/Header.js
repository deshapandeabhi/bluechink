// Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/bluechinklogo.jpeg'; 
import person from '../assets/sampleperson.jpeg'
import homeimage from '../assets/homeicon.png';
import './Header.css'; // Import the CSS file

const Header = () => {
  return (
    <div className="header-container"> {/* Use className to apply styles */}
      <div style={{marginLeft : '2%'}}> 
      <img src={logo} alt='Logo' height='80' width='100' />
      </div>
      <div style={{marginRight : '2%'}}>
      <img src={homeimage} height='50' width='50' />
      </div>
    </div>
  );
}

export default Header;
