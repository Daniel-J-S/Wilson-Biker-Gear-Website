import React from 'react';
import SEO from '../components/seo';
import { graphql } from 'gatsby';

function StorePolicy({
        data: {
            terms
        },
        location
    }) {
        return ( 
            <>
            <SEO 
                title="Store Policy" 
                keywords={[`returns`, `store policies`, `terms of service`, `biker gear`, `vests`]} 
                description="40 years experience in leather goods, sewing and passing on the best prices to customers. Looking for Biker Gear, accessories or just need your patches sewn on? We specialize in exceptional quality and precision to ensure they are done right the first time."
                location={location}
            />
            <div className="store-Policies">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="container">
                                <h1 className="text-center mt-5 mb-5">{terms.name}</h1>
                                <div
                                    dangerouslySetInnerHTML={{
                                    __html: terms.body.childMarkdownRemark.html
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
query StorePolicyQuery {
    terms: contentfulPageInfoSection(name: {eq: "TERMS OF SERVICE"}) {
      body {
        childMarkdownRemark {
          html
        }
      }
      name
    }
}`;

export default StorePolicy;