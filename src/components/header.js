import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import logo from "../images/logo.png"



const Header = ({ siteTitle }) => (
  <header className="site-header">
    <div className="container">
      <div className="row">
        <div className="col-sm-12 col-md-4 align-self-center">
          <Link className="header-logo" to="/"><img src={logo} alt="logo" style={{height: 75, width: 75}}></img></Link>
        </div>
        <div className="col-sm-12 col-md-8 align-self-center">
          <nav>
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              {/* <li className="nav-item">
                <Link className="nav-link" to="/blogs">Blogs</Link>
              </li> */}
              <li className="nav-item">
                <Link className="nav-link" to="/store">Store</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">About Us</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact-us">Contact</Link>
              </li>
            </ul>
             <div className="header-cart">
              <Link className="Header__summary snipcart-summary snipcart-checkout" to="#">
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'dodgerblue', padding: '.8rem', fontWeight: 600, height: '1rem', width: '1rem', fontSize: '1.1rem', fontFamily: 'Helvetica', borderRadius: '50%'}} class="snipcart-items-count"></div>
                <i className="fas fa-sm fa-shopping-bag" />
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </div>

  </header >
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
