import PropTypes from 'prop-types';
import React from 'react';
import ResponsiveNav from './nav';



const Header = () => (
    <ResponsiveNav />
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
