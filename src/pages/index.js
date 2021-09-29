import React from "react";
import { Link } from "gatsby";
import Img from "gatsby-image";
import Layout from "../components/layout";
import SEO from "../components/seo";
import Banner from "../components/banner";
// import LatestBlogs from "../components/latestBlog"
import Countdown from "../components/countdown";
import StarRatingComponent from 'react-star-rating-component';
import { graphql } from "gatsby";

import { productFilter } from '../utils/product-filter';


// function ComingSoon() {
//   return (
//       <div style={{
//           display: 'flex', 
//           flexDirection: 'column', 
//           justifyContent: 'center', 
//           alignItems: 'center',
//           minHeight: '100vh'
//           }}>
//         <h1>COMING SOON</h1>
//         <p>This website is under construction.</p>
//       </div>
//   )
// }

// export default ComingSoon

class IndexPost extends React.Component {
  render() {
    const { data } = this.props;
    return (
      <React.Fragment>
        <div className="row product-main">
          {data.map(items => (
            <Link className="Catalogue__item col-sm-12 col-md-6 col-lg-4" to={`/${items.node.slug}`}>
            <div key={items.node.id}>
              <div className="details_List">
                {items.node.image === null ? <div className="no-image">No Image</div> : <Img sizes={items.node.image.fluid} />}

                <div className="details_inner">

                  <h2>
                    {items.node.name}
                  </h2>
                  <StarRatingComponent
                    name="rate1"
                    starCount={5}
                    value={items.node.rating}
                  />
                  <p>{items.node.description.childMarkdownRemark.excerpt}</p>
                  <div className="row">
                    <div className="col-sm-4 align-self-center">
                      <span className="price">${items.node.price}</span>
                    </div>
                    <div className="col-sm-8 text-right align-self-center">
                      {/* <a
                        href="#"
                        className="Product snipcart-add-item"
                        data-item-id={items.node.slug}
                        data-item-price={items.node.price}
                        data-item-image={items.node.image === null ? "" : items.node.image.fluid.src}
                        data-item-name={items.node.name}
                        data-item-url={`/`}
                      >
                        <i className="fas fa-shopping-bag" />Add to Cart
                    </a> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </Link>
          ))}
        </div>
      </React.Fragment>
    );
  }
}

const IndexPage = data => {
  const mens = productFilter(data.data.allContentfulProduct.edges, 'Mens');
  const ladies = productFilter(data.data.allContentfulProduct.edges, 'Ladies');
  console.log(mens, ladies);
  return (
    <Layout>
      <SEO title="Home" keywords={[`biker gear`, `vests`, `sewing`, `jackets`]} />
      <Banner BannerData={data.data.allContentfulHeaderBanner.edges} />
      <div className="container">
        <div className="text-center"><h2 className="with-underline">Best Sellers</h2></div>
      </div>
      {
        ladies.length > 0 &&
        <div className="container mt-5 mb-5">
          <div><h3>Ladies</h3></div>
          <IndexPost data={ladies}></IndexPost>
        </div>
      }
      {
        mens.length > 0 &&
        <div className="container mt-5 mb-5">
          <div><h3>Mens</h3></div>
          <IndexPost data={mens}></IndexPost>
        </div>
      }
      <Countdown data={data.data.contentfulDealCountDown} />
    </Layout>
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
          price
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
`