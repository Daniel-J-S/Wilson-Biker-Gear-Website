import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import { CSSTransition } from 'react-transition-group';

import logo from '../images/logo.png';



const ResponsiveNav = () => {

  
  const [isNavVisible, setNavVisibility] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(true);


  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 1065px)');
    mediaQuery.addEventListener('change', handleMediaQueryChange);
    handleMediaQueryChange(mediaQuery);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
    
  }, []);


  const handleMediaQueryChange = mediaQuery => {
    if (mediaQuery.matches) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
  };

  const toggleNav = () => {
    setNavVisibility(!isNavVisible);
  };
  

  const links = (
      <>
        <Link onClick={toggleNav} className="nav-link" to="/">Home</Link>
        <Link onClick={toggleNav} className="nav-link" to="/store">Store</Link>
        <Link onClick={toggleNav} className="nav-link" to="/about">About Us</Link>
        <Link onClick={toggleNav} className="nav-link" to="/contact-us">Contact Us</Link>
      </>
  );

  return (
    <div className="nav-wrapper">
      <Link to="/">
        <img className="logo" src={logo} alt="logo" />
      </Link>
      <CSSTransition
        in={isSmallScreen && isNavVisible}
        timeout={350}
        classNames="navAnimation"
        unmountOnExit
      >
        <nav className="nav">
            { links }
        </nav>
      </CSSTransition>
      {
        !isSmallScreen &&
        <nav className="nav">
          { links }
        </nav>
      }
      <div className="header-cart">
        <Link className="Header__summary snipcart-summary snipcart-checkout" to="#">
          <div className="snipcart-items-count" />
          <i className="fas fa-sm fa-shopping-bag" />
        </Link>
      </div>
      <button onClick={toggleNav} className="burger">
        <div className={isNavVisible ? 'burger-animate': 'fixed'} />
        <div className={isNavVisible ? 'burger-animate': 'fixed'} />
        <div className={isNavVisible ? 'burger-animate': 'fixed'} />
      </button>
    </div>
  );
};

export default ResponsiveNav;
