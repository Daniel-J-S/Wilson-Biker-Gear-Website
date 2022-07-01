import React from 'react';
import { Link, navigate } from 'gatsby';
import { isBrowser } from '../utils/isBrowser';
import tiktokLogo from '../static/tiktok-brands.svg';

const PublishButton = ({ handleClick }) => {
    return (
        <button onClick={handleClick} style={{
            backgroundColor: '#000',
            color: '#fff',
            border: 'none',
            margin: '2rem 0',
            fontFamily: 'Helvetica',
            borderBottom: '2px solid dodgerblue',
        }}>
            Publish This Version
        </button>
    )
}

function Footer () {
    const handleClick = async () => {
        if (!isBrowser) return;
        const proceed = window.confirm(`🚨 Please confirm that you are ready to publish the current changes`);
        if(proceed) {
            const url = 'https://api.netlify.com/build_hooks/61563cb76500392b3573d5ba';
            await fetch(url, { method: 'POST'});
            window.alert(`
            🚧 Changes are currently being migrated to production.
            Please allow 3-5 mins for changes to reflect 🚧
            `);
            navigate('/');
        }
    }
    return (
        <footer className="site-footer">
            <div className="footer_inner">
                <div className="container">
                    <div className="footer-widget footer-content">
                        <section id="nav_menu-8" className="widget widget_nav_menu">
                            <div className="menu-main-container">
                                <ul id="menu-main" className="menu">
                                    <li><Link to="/about">About</Link></li>
                                    <li><Link to="/store">Store</Link></li>
                                    <li><Link to="/terms-of-service">Terms of Service</Link></li>
                                    <li><Link to="/contact-us">Contact</Link></li>
                                    <li><Link className="snipcart-customer-signin" to="/#/signin?returnUrl=%2Fdashboard">My Account</Link></li>
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
                                            <img className="tiktok" src={tiktokLogo} alt="tiktok" />
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
                                    <li className="blink">Temporarily Closed July 1 - 18th</li>
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
                        <div className="site-info">
                            <PublishButton handleClick={handleClick} />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
