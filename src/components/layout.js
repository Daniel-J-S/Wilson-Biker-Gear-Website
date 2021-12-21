import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import { isBrowser } from '../utils/isBrowser';
import Header from './header';
import Footer from './footer';


const Layout = ({ children }) => { 
  if(typeof window !== 'undefined') {
    window.alert(`
    🚨 Please Be Advised:
    This is a test site and is only used
    for staging future changes before adding
    them to production.🚧
    `)
  }
  return (
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          site {
            siteMetadata {
              title
            }
          }
        }
      `}
      render={data => (
        <>
          <Header siteTitle={data.site.siteMetadata.title} />
          <div className="main-container">
            <main>{children}</main>
          </div>
          <Footer />
        </>
      )}
    />
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
