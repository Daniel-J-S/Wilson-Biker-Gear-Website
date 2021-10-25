import React, { Component } from 'react';
import { Link } from 'gatsby';

import tiktokLogo from '../static/tiktok-brands.svg';

class Footer extends Component {
    render() {
        return (
            <footer className="site-footer mt-5">
                <div className="mt-5">
                    <iframe title="location" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d596.1481999845672!2d-97.44205310714966!3d32.72965858821473!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864e0d60633303a1%3A0x9c8648782889ba25!2sWilson%20Biker%20Gear!5e0!3m2!1sen!2sus!4v1635114299251!5m2!1sen!2sus" width="100%" height="375" style={{borderTop: '1px solid #808080', borderBottom: 0, borderLeft: 0, borderRight: 0}} loading="lazy" />
                </div>
                <div className="footer_inner">
                    <div className="container">
                        <div className="footer-widget footer-content">
                            <section id="nav_menu-8" className="widget widget_nav_menu">
                                <div className="menu-main-container">
                                    <ul id="menu-main" className="menu">
                                        <li><Link to="/about">About</Link></li>
                                        <li><Link to="/store">Store</Link></li>
                                        <li><Link to="/contact-us">Contact</Link></li>
                                    </ul>
                                </div>
                            </section>
                        </div>
                        <div className="footer-bottom social-right-menu mt-3">
                            <div className="site-info">
                                <ul className="social-links">
                                    <li>
                                        <a className="social-icon" href="https://www.facebook.com/JDUBORIGINAL/" target="_blank" rel="noopener noreferrer">
                                            <i className="fab fa-2x fa-facebook" />
                                        </a>
                                    </li>
                                    <li>
                                        <a className="social-icon" href="https://www.tiktok.com/@wilsonbikergear" target="_blank" rel="noopener noreferrer">                                            
                                            <img className="tiktok" src={tiktokLogo} alt="tic toc" />
                                        </a>
                                    </li>
                                </ul>
                                <address className="mt-3">
                                    <a href="https://g.page/wilson-biker-gear?share" target="_blank" rel="noopener noreferrer">
                                    3016 Alta Mere Dr<br />
                                    Fort Worth, TX 76116<br />
                                    </a>
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
                               <small>Custom Built By <a href="https://danieljs.io" target="_blank" rel="noopener noreferrer">DanielJS</a></small>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        )
    }
}

export default Footer
