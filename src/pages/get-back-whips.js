import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import StarRatingComponent from 'react-star-rating-component';
import { graphql, Link } from 'gatsby';
import SEO from '../components/seo';

const GetBackWhips = data => {
  
  const [selectState, setSelectState] = useState({
    value: 'Choose Option',
    userSelection: false,
  });

  function handleChange(e) {
    e.persist()
    setSelectState(prevState => ({
      ...prevState,
      value: e.target.value, 
      userSelection: true,

    }));
  }

  
  return (
    <>
      <SEO 
        title={data.data.contentfulAccessory.name} 
        keywords={[`Clothing`, `${data.data.contentfulAccessory.name}`, `Jackets`, `Vests`]} 
        description={`Check out our ${data.data.contentfulAccessory.name} currently starting at $32.99`}
        location={data.location}
      />
      <div className="container details-page mb-5">
        <div className="product-details">
          <div className="Product-Screenshot">
            {data.data.contentfulAccessory.productMorePhotos === null ? <div className="no-image">No Image</div> :
              <Tabs>
                {data.data.contentfulAccessory.productMorePhotos.map(items => (
                  <TabPanel key={items.id}>
                    <Tab><img src={items.fixed.src} alt={items.id}/></Tab>
                  </TabPanel>
                ))}
                <TabList>
                  {data.data.contentfulAccessory.productMorePhotos.slice(0, 3).map(items => (
                    <Tab key={items.id}><img src={items.fixed.src} alt={items.id}/></Tab>
                  ))}
                </TabList>
              </Tabs>}
          </div>
          <div>
            <h2>{data.data.contentfulAccessory.name}</h2>
          </div>
          <StarRatingComponent
            name="rate1"
            starCount={5}
            value={data.data.contentfulAccessory.rating}
          />
          <div className="row buynowinner">
            <div className="col-sm-4 col-md-3">
              <span className="price">${data.data.contentfulAccessory.price}</span>
              <select value={selectState.value} style={{padding: '.3rem', borderRadius: '7px'}} onChange={handleChange} onBlur={handleChange} className="form-select form-select-lg mb-3 mt-3">
                {!selectState.userSelection && <option value="Choose Option">Choose Option</option> }
                {data.data.contentfulAccessory.variations.map((v, i) => (
                  <option key={i} value={v}>{v}</option>
                ))}
              </select>
            </div>

              
              <div className="col-sm-12 col-md-12 text-left">
                <div className="row container mb-3">
                <button
                  style={{opacity: !selectState.userSelection ? .5: 1}}
                  className="Product snipcart-add-item"
                  data-item-id={data.data.contentfulAccessory.slug}
                  data-item-image={data.data.contentfulAccessory.image === null ? "" : data.data.contentfulAccessory.image.fixed.src}
                  data-item-price={data.data.contentfulAccessory.price}
                  // data-item-custom1-name="Options"
                  // data-item-custom1-options={selectState.options}
                  data-item-name={data.data.contentfulAccessory.name}
                  data-item-url={data.data.contentfulAccessory.slug}
                  disabled={!selectState.userSelection}
                  >
                  <i className="fas fa-tags" />
                  Add to Cart
                </button> 
                </div>
                <div className="row container mt-3">
                  <Link
                  state={{ 
                    itemName: data.data.contentfulAccessory.name,
                    itemPrice: data.data.contentfulAccessory.price,
                    itemSize: selectState.value
                  }} className="btn btn-primary" to="/contact-us">Contact Us</Link>
                </div>
            </div>
             
          </div>
          <div
            dangerouslySetInnerHTML={{
              __html: data.data.contentfulAccessory.description.childMarkdownRemark.html
            }}
          />
        </div>
      </div>
    </>
  );
}

export default GetBackWhips;

export const query = graphql`
  query GetBackWhipsQuery {
    contentfulAccessory(category: {name: {eq: "Get Back Whips"}}) {
      id
      name
      slug
      discount
      price
      image {
        fixed(width: 1120, height: 500) {
        width
        height
        src
        srcSet
      }
    }
    variations
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
}`;