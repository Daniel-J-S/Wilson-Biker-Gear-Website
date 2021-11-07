import React from 'react';
import SEO from '../components/seo';
import logo from '../images/the-wilsons.jpeg';
import { graphql } from 'gatsby';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

function About({ data, location }) {
        return ( 
            <>
            <SEO 
                title="About" 
                keywords={[`about us`, `our story`, `leather goods`, `biker gear`, `vests`]} 
                description="40 years experience in leather goods, sewing and passing on the best prices to customers. Looking for Biker Gear, accessories or just need your patches sewn on? We specialize in exceptional quality and precision to ensure they are done right the first time."
                location={location}
            />
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
