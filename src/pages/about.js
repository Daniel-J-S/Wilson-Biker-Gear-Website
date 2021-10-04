import React from 'react';
import SEO from '../components/seo';
import logo from '../images/the-wilsons.jpeg';
import { graphql } from 'gatsby';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

function About({ data }) {

        return ( 
        <>
            <SEO title="About" keywords={[`about us`, `our story`, `leather goods`, `biker gear`, `vests`]} />
            <div className="site-About">
            <div className="container">
            <div className="row">
                <div className="col-sm-12">
                    <div className="row">
                        <div className="col-sm-2 col-md-4 mb-3 mt-5">
                            <img src={logo} alt="Jeff and Rose Wilson" />
                        </div>
                    </div>
                    <h1>{data.contentfulAboutUsPage.title}</h1>
                    {documentToReactComponents(data.contentfulAboutUsPage.body.json)}
                    </div>
                </div>
            </div> 
        </div> 
        </>
    );
}

export const query = graphql`
query AboutPageQuery {
    contentfulAboutUsPage(title: {eq: "About Us"}) {
      body {
        json
      }
      title
    }
  }
`;
export default About;
