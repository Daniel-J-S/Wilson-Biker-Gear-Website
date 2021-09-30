import React, { Component } from "react";
import { Link } from "gatsby"

class Footer extends Component {
    render() {
        return (
            <footer className="site-footer">
                <div className="footer_inner">
                    <div className="container">
                        <div className="footer-widget footer-content">
                            <section id="nav_menu-8" className="widget widget_nav_menu">
                                <div className="menu-main-container">
                                    <ul id="menu-main" className="menu">
                                        <li><Link to="/about">About Us</Link></li>
                                        {/* <li><Link to="/blogs">Blogs</Link></li> */}
                                        <li><Link to="/store">Store</Link></li>
                                        <li><Link to="/contact-us">Contact</Link></li>
                                        {/* <li><Link to="/copyright">Copyright</Link></li> */}
                                    </ul>
                                </div>
                            </section>
                        </div>
                        <div className="footer-bottom social-right-menu mt-5">
                            <div className="site-info">
                                <address>
                                    3016 Alta Mere Dr<br />
                                    Fort Worth, TX 76116<br />
                                    <a href="tel:8173860631">(817) 386-0631</a>
                                </address>
                                <p className="mt-5 mb-3"><strong>Hours of Operation</strong></p>
                                <ul>
                                    <li>Tues - Sat: 9 AM - 5 PM</li>
                                    <li>Sun - Mon: CLOSED</li>
                                </ul>
                            </div>
                        </div>
                        <div className="footer-bottom social-right-menu mt-5">
                            <div className="site-info">
                               <small>©{new Date().getFullYear()} Wilson Biker Gear. All rights reserved.</small>
                            </div>
                            <div className="site-info">
                               <small>Created By <a href="https://danieljs.io" target="_blank" rel="noopener noreferrer">DanielJS</a></small>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        )
    }
}

export default Footer
