import React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import SEO from '../components/seo';
import Banner from '../components/banner';
import StarRatingComponent from 'react-star-rating-component';
import { graphql } from 'gatsby';
import { productFilter } from '../utils/product-filter';
import { processSizeAndPrice } from '../utils/process-size-and-price';


function IndexPost ({ data, linkData }) {

    return (
      <React.Fragment>
        <div className="row product-main">
          {data.slice(0, 6).map(items => {
            const { minPrice, maxPrice } = processSizeAndPrice(items.node.sizesAndPrices);
            return (
            <Link key={items.node.id} className="Catalogue__item col-sm-12 col-md-6 col-lg-4" to={`${items.node.slug}`}>
            <div>
              <div className="details_List">
                {items.node.image === null ? <div className="no-image">No Image</div> : <Img fluid={items.node.image.fluid} />}
                <div className="details_inner">
                    {
                      items.node.name.length >= 30 
                      ? <h2>{items.node.name.split(' ').slice(0, 4).join(' ')}...</h2> 
                      : <h2>{items.node.name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h2>
                    }
                  <StarRatingComponent
                    name="rate1"
                    starCount={5}
                    value={items.node.rating}
                  />
                  <p>{items.node.description.childMarkdownRemark.excerpt.substr(0, 50)}...</p>
                  <div className="row">
                    <div className="col-sm-7 align-self-center">
                      <small>{`$${minPrice} - $${maxPrice}`}</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </Link>
        )})}
        </div>
        <Link className="text-dark" to={`/${linkData}`}>See More <i className="fa fa-arrow-right"></i></Link>
      </React.Fragment>
    );
}

const IndexPage = data => {
  const mens = productFilter(data.data.allContentfulProduct.edges, 'Mens');
  const ladies = productFilter(data.data.allContentfulProduct.edges, 'Ladies');
  return (
    <>
      <SEO 
        title="Home" 
        keywords={[`biker gear`, `vests`, `sewing`, `jackets`]}
        meta={[{description: `40 years experience in leather goods, sewing and passing on the best prices to customers. Looking for Biker Gear, accessories or just need your patches sewn on? We specialize in exceptional quality and precision to ensure they are done right the first time.`}]} 
      />
      <Banner BannerData={data.data.allContentfulHeaderBanner.edges} />
      <div className="container">
        <div className="text-center"><h2 className="with-underline">Best Sellers</h2></div>
      </div>
      {
        ladies.length > 0 &&
        <div className="container mt-5 mb-5">
          <div>
            <Link className="text-dark" to="/ladies">
              <h3 className="text-center text-md-left">Ladies</h3>
            </Link>
          </div>
          <IndexPost linkData="ladies" data={ladies}></IndexPost>
        </div>
      }
      {
        mens.length > 0 &&
        <div className="container mt-5 mb-5">
          <div>
            <Link className="text-dark" to="/mens">
              <h3 className="text-center text-md-left">Mens</h3>
            </Link>
          </div>
          <IndexPost linkData="mens" data={mens}></IndexPost>
        </div>
      }
    </>
  );
}

export default IndexPage;

export const query = graphql`
  query AboutQuery {
    allContentfulProduct(limit: 6,sort:{fields:createdAt,order: DESC}){
      edges{
        node{
          id
          name
          slug
          rating
          discount
          category {
            name
          }
          image {
            fluid(maxWidth: 1000) {
              base64
              aspectRatio
              src
              srcSet
              srcWebp
              srcSetWebp
              sizes
            }
          }
          sizesAndPrices
          description {
            childMarkdownRemark {
              excerpt(pruneLength: 140)
            }
          }
        }
      }
    }
    allContentfulHeaderBanner {
      edges {
        node {
          title
          subHeading
          image {
            fluid(maxWidth: 1800) {
              base64
              aspectRatio
              src
              srcSet
              srcWebp
              srcSetWebp
              sizes
            }
          }
        }
      }
    }
    contentfulDealCountDown {
      title
      featureImage {
        fluid(maxWidth: 1800) {
          base64
          aspectRatio
          src
          srcSet
          srcWebp
          srcSetWebp
          sizes
        }
      }
      date(formatString: "D MMMM, YYYY")
    }
    allContentfulBlogs(limit: 3,sort:{fields:createdAt,order: DESC}) {
      edges {
        node {
          id
          title
          slug
          featureImage {
            fluid(maxWidth: 1120) {
              base64
              aspectRatio
              src
              srcSet
              srcWebp
              srcSetWebp
              sizes
            }
          }
        }
      }
    }
  }
`;
