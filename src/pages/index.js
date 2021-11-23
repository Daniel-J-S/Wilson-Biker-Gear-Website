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
          {data.map(items => {
            const {4: minPrice, 3: maxPrice }  = processSizeAndPrice(items.node.sizesAndPrices);
            return (
            <Link key={items.node.id} className="Catalogue__item col-sm-12 col-md-6 col-lg-4" to={`${items.node.slug}`}>
            <div>
              <div className="details_List">
                {items.node.image === null ? <div className="no-image">No Image</div> : <Img fluid={items.node.image.fluid} />}
                <div className="details_inner">
                    {
                      items.node.name.length >= 30 
                      ? <h2>{items.node.name.split(' ').slice(0, 4).join(' ')}...</h2> 
                      : <h2>{items.node.name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h2>
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
function AccessoryPost ({ data, linkData }) {
    
    const reformattedData = [
      {
        id: 1,
        name: 'White and Green w/ 14 Ball',
        image: data[0].node.productMorePhotos[3],
        rating: data[0].node.rating,
        price: 32.99,
        excerpt: data[0].node.description.childMarkdownRemark.excerpt,
        slug: data[0].node.slug
      },
      {
        id: 2,
        name: 'Black and Red w/ 8 Ball',
        image: data[0].node.productMorePhotos[4],
        rating: data[0].node.rating,
        price: 32.99,
        excerpt: data[0].node.description.childMarkdownRemark.excerpt,
        slug: data[0].node.slug
      },
      {
        id: 3,
        name: 'White and Blue w/ 10 Ball',
        image: data[0].node.productMorePhotos[5],
        rating: data[0].node.rating,
        price: 32.99,
        excerpt: data[0].node.description.childMarkdownRemark.excerpt,
        slug: data[0].node.slug
      },
    ];
    
    return (
      <React.Fragment>
        <div className="row product-main">
          {reformattedData.map(({id, name, image, rating, price, excerpt, slug}) => {
            return (
            <Link key={id} className="Catalogue__item col-sm-12 col-md-6 col-lg-4" to={`${slug}`}>
            <div>
              <div className="details_List">
                {image === null ? <div className="no-image">No Image</div> : <Img fluid={image.fluid} />}
                <div className="details_inner">
                <h2>{name}</h2>
                  <StarRatingComponent
                    name="rate1"
                    starCount={5}
                    value={rating}
                  />
                  <p>{excerpt.substr(0, 50)}...</p>
                  <div className="row">
                    <div className="col-sm-7 align-self-center">
                      <small>${price}</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </Link>
        )})}
        </div>
       <Link className="text-dark mb-5" to={`/${linkData}`}>See More <i className="fa fa-arrow-right"></i></Link>
      </React.Fragment>
    );
}

const IndexPage = data => {
  const mens = productFilter(data.data.allContentfulClothing.edges, 'Mens');
  const ladies = productFilter(data.data.allContentfulClothing.edges, 'Ladies');
  const whips = productFilter(data.data.allContentfulAccessory.edges, 'Get Back Whips');

  return (
    <>
      <SEO 
        title="Home" 
        keywords={[`biker gear`, `vests`, `sewing`, `jackets`]}
        description="40 years experience in leather goods, sewing and passing on the best prices to customers. Looking for Biker Gear, accessories or just need your patches sewn on? We specialize in exceptional quality and precision to ensure they are done right the first time."
        location={data.location}
      />
      <Banner BannerData={data.data.allContentfulHeaderBanner.edges} />
      <div className="container">
        <div className="text-center"><h2 className="main-title with-underline">Best Sellers</h2></div>
      </div>
      {
        ladies.length > 0 &&
        <div className="container mt-5 mb-5">
          <div>
            <Link className="text-dark" to="/ladies">
              <h3 className="text-center text-md-left">Ladies Apparel</h3>
            </Link>
          </div>
          <IndexPost linkData="ladies" data={ladies}></IndexPost>
        </div>
      }
      <div style={{margin: '7rem 0'}} />
      {
        whips.length > 0 &&
        <div className="container mt-5 mb-5">
          <div>
            <Link className="text-dark" to="/get-back-whips">
              <h3 className="text-center text-md-left">"Get Back" Whips</h3>
            </Link>
          </div>
          <AccessoryPost linkData="get-back-whips" data={whips}></AccessoryPost>
        </div>
      }
      <div style={{margin: '7rem 0'}} />
      {
        mens.length > 0 &&
        <div className="container mt-5 mb-5">
          <div>
            <Link className="text-dark" to="/mens">
              <h3 className="text-center text-md-left">Mens Apparel</h3>
            </Link>
          </div>
          <IndexPost linkData="mens" data={mens}></IndexPost>
        </div>
      }
      <div style={{margin: '7rem 0'}} />
      <div className="mt-5" style={{backgroundColor: 'black'}}>
        <iframe title="location" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d519.1963103009764!2d-97.44133079496027!3d32.72965701376882!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x9c8648782889ba25!2sWilson%20Biker%20Gear!5e0!3m2!1sen!2sus!4v1635121261650!5m2!1sen!2sus" width="100%" height="375" style={{ padding: 0, margin: 0, borderTop: '1px solid #808080', border: 0}} loading="lazy" />
      </div>
    </>
  );
}

export default IndexPage;

export const query = graphql`
  query AboutQuery {
    allContentfulClothing(sort:{fields:createdAt, order: DESC}){
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
          productMorePhotos {
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
    allContentfulAccessory(sort:{fields:createdAt, order: DESC}){
      edges{
        node{
          id
          name
          slug
          rating
          price
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
          productMorePhotos {
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
          variations
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
