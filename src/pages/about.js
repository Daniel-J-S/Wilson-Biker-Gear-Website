import React from 'react';
import SEO from '../components/seo';
import { graphql } from 'gatsby';

function About({
        data: {
            aboutUs
        },
        location
    }) {
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
                            <div className="container">
                                <h1 className="text-center mt-5 mb-5">{aboutUs.name}</h1>
                                <div
                                    dangerouslySetInnerHTML={{
                                    __html: aboutUs.body.childMarkdownRemark.html
                                    }}
                                />
                            </div> 
                        </div>
                    </div>
                </div> 
            </div> 
        </>
    );
}

export const query = graphql`
query AboutPageQuery {
    aboutUs: contentfulPageInfoSection(name: {eq: "About Us"}) {
      body {
        childMarkdownRemark {
          html
        }
      }
      name
    }
}`;

export default About;

