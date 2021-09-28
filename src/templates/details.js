import React, { useState } from "react"
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import StarRatingComponent from 'react-star-rating-component';
import { graphql, Link } from "gatsby";
import Layout from "../components/layout"
import SEO from "../components/seo"

const ProductDetails = data => {
  const [selectState, setSelectState] = useState({
    value: "Small"
  });

  function handleChange(e) {
    setSelectState({value: e.target.value});
  }

  return (
    <Layout>
      <SEO title={data.data.contentfulProduct.name} keywords={[`gatsby`, `application`, `react`]} />
      <div className="container details-page">
        <div className="product-details">
          <div className="Product-Screenshot">
            {data.data.contentfulProduct.productMorePhotos === null ? <div className="no-image">No Image</div> :
              <Tabs>
                {data.data.contentfulProduct.productMorePhotos.map(items => (
                  <TabPanel key={items.id}>
                    <Tab><img src={items.fixed.src} alt={items.id}/></Tab>
                  </TabPanel>
                ))}
                <TabList>
                  {data.data.contentfulProduct.productMorePhotos.map(items => (
                    <Tab key={items.id}><img src={items.fixed.src} alt={items.id}/></Tab>
                  ))}
                </TabList>
              </Tabs>}
          </div>
          <div>
            <h2>{data.data.contentfulProduct.name}</h2>
          </div>
          <StarRatingComponent
            name="rate1"
            starCount={5}
            value={data.data.contentfulProduct.rating}
          />
          <div className="row buynowinner">
            <div className="col-sm-2">
              <span className="price">Price: ${data.data.contentfulProduct.price}</span>
              <select value={selectState.value} onChange={handleChange} onBlur={handleChange} className="form-select form-select-lg mb-3 mt-3">
                {data.data.contentfulProduct.sizes.map((s, i) => (
                  <option key={i} value={s.size}>{s.size}</option>
                ))}
              </select>
            </div>
            <div className="col-sm-10 text-left">
              {/* <a
                href="#"
                className="Product snipcart-add-item"
                data-item-id={data.data.contentfulProduct.slug}
                data-item-price={data.data.contentfulProduct.price}
                data-item-image={data.data.contentfulProduct.image === null ? "" : data.data.contentfulProduct.image.fixed.src}
                data-item-name={data.data.contentfulProduct.name}
                data-item-url={`/`}
              >
                <i className="fas fa-tags" />
                Buy Now
              </a> */}
              <Link state={{ 
                itemName: data.data.contentfulProduct.name,
                itemPrice: data.data.contentfulProduct.price
              }} className="btn btn-primary" to="/contact-us">Contact Us</Link>
            </div>
          </div>
          <div
            dangerouslySetInnerHTML={{
              __html: data.data.contentfulProduct.description.childMarkdownRemark.html
            }}
          />
        </div>
      </div>
    </Layout>
  );
}

export default ProductDetails

export const query = graphql`
  query ProductDetailsQuery($slug: String!) {
    contentfulProduct(slug: {eq: $slug }) {
      id
      name
      slug
      sizes {
        size
      }
      image {
        fixed(width: 1120, height: 500) {
        width
        height
        src
        srcSet
      }
    }
    price
      description {
      childMarkdownRemark {
        html
      }
    }
    productMorePhotos {
      id
      fixed(width: 1120, height: 600){
        src
      }
    }
    rating
  }
}
`