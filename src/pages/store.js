import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"
import SEO from "../components/seo"
import StarRatingComponent from 'react-star-rating-component';
import { graphql } from "gatsby";

class IndexPost extends React.Component {
    state = {
      NoOfPost: 6
};
 

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    var lastScrollY = window.pageYOffset + 1100;

    if (lastScrollY > window.outerHeight) {
      var count = this.state.NoOfPost + 3;
      this.setState({
        NoOfPost: count
      });
    }
  };

  render() {

    const { data } = this.props;
    const { NoOfPost } = this.state;

    return (
      <React.Fragment>
        <div className="row product-main" onScroll={this.onScrollEvent}>
          {data.data.allContentfulProduct.edges.slice(0, NoOfPost).map(items => (
            <Link key={items.node.id} className="Catalogue__item col-sm-12 col-md-6 col-lg-4"  to={`${items.node.slug}`}>
            <div>
              <div className="details_List">
                {items.node.image === null ? <div className="no-image">No Image</div> : <Img sizes={items.node.image.fixed} />}

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
                        data-item-image={items.node.image === null ? "" : items.node.image.fixed.src}
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

const IndexPage = data => (

  <Layout>
    <SEO title="Store" keywords={[`current inventory`, `jackets`, `vests`, `sewing`]} />
    <div className="container store-page">
      <IndexPost data={data}></IndexPost>
    </div>
  </Layout>
)

export default IndexPage

export const query = graphql`
  query StoreQuery {
    allContentfulProduct{
      edges{
        node{
          id
          name
          slug
          rating
          image {
            fixed(width: 1000, height: 500) {
              width
              height
              src
              srcSet
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
  }
`