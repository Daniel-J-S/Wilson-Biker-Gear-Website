import React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import SEO from '../components/seo';
import Banner from '../components/banner';
import Countdown from '../components/countdown';
import StarRatingComponent from 'react-star-rating-component';
import { graphql } from 'gatsby';
import { productFilter } from '../utils/product-filter';
import { formatPrice } from '../utils/format-price';



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

function IndexPost ({ data }) {

    return (
      <React.Fragment>
        <div className="row product-main">
          {data.map(items => (
            <Link key={items.node.id} className="Catalogue__item col-sm-12 col-md-6 col-lg-4" to={`${items.node.slug}`}>
            <div>
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
                    <div className="col-sm-7 align-self-center">
                      {formatPrice(items.node)}
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
              <h3>Ladies</h3>
            </Link>
          </div>
          <IndexPost data={ladies}></IndexPost>
        </div>
      }
      {
        mens.length > 0 &&
        <div className="container mt-5 mb-5">
          <div>
            <Link className="text-dark" to="/mens">
              <h3>Mens</h3>
            </Link>
          </div>
          <IndexPost data={mens}></IndexPost>
        </div>
      }
      <Countdown data={data.data.contentfulDealCountDown} />
    </>
  );
}

// export default ComingSoon

// function IndexPost ({ data }) {
//     return (
//       <React.Fragment>
//         <div className="row product-main">
//           {data.map(items => (
//             <Link key={items.node.id} className="Catalogue__item col-sm-12 col-md-6 col-lg-4" to={`${items.node.slug}`}>
//             <div>
//               <div className="details_List">
//                 {items.node.image === null ? <div className="no-image">No Image</div> : <Img sizes={items.node.image.fluid} />}
//                  <div className="details_inner">
//                   <h2>
//                     {items.node.name}
//                   </h2>
//                   <StarRatingComponent
//                     name="rate1"
//                     starCount={5}
//                     value={items.node.rating}
//                   />
//                   <p>{items.node.description.childMarkdownRemark.excerpt}</p>
//                   <div className="row">
//                     <div className="col-sm-7 align-self-center">
//                       {formatPrice(items.node)}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             </Link>
//           ))}
//         </div>
//       </React.Fragment>
//     );
// }

// const IndexPage = data => {
//   const mens = productFilter(data.data.allContentfulProduct.edges, 'Mens');
//   const ladies = productFilter(data.data.allContentfulProduct.edges, 'Ladies');
//   return (
//     <Layout>
//       <SEO title="Home" keywords={[`biker gear`, `vests`, `sewing`, `jackets`]} />
//       <Banner BannerData={data.data.allContentfulHeaderBanner.edges} />
//       <div className="container">
//         <div className="text-center"><h2 className="with-underline">Best Sellers</h2></div>
//       </div>
//       {
//         ladies.length > 0 &&
//         <div className="container mt-5 mb-5">
//           <div>
//             <Link className="text-dark" to="/ladies">
//               <h3>Ladies</h3>
//             </Link>
//           </div>
//           <IndexPost data={ladies}></IndexPost>
//         </div>
//       }
//       {
//         mens.length > 0 &&
//         <div className="container mt-5 mb-5">
//           <div>
//             <Link className="text-dark" to="/mens">
//               <h3>Mens</h3>
//             </Link>
//           </div>
//           <IndexPost data={mens}></IndexPost>
//         </div>
//       }
//       <Countdown data={data.data.contentfulDealCountDown} />
//     </Layout>
//   );
// }

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
`;
