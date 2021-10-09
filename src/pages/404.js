import React from 'react';
import SEO from '../components/seo';
import { Link } from 'gatsby';

const NotFoundPage = () => (
  <>
    <SEO title="404: Not found" keywords={[`not found`, `404`, `page not available`]} />
    <div className="container not-found">
      <h1>NOT FOUND</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
      <Link style={{border: 'none', color: '#000', marginBottom: '5rem', display: 'block'}} to="/">Go Back Home</Link>
    </div>
  </>
)

export default NotFoundPage
