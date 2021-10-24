import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import StarRatingComponent from 'react-star-rating-component';
import { graphql, Link } from 'gatsby';
import SEO from '../components/seo';
import { processSizeAndPrice } from '../utils/process-size-and-price';

const ProductDetails = data => {
  const [selectState, setSelectState] = useState({
    value: 'Choose Size',
    userSelection: false,
  });

  function handleChange(e) {
    setSelectState({value: e.target.value, userSelection: true});
  }

  function handleFocus() {
    console.log('focus')         
  }

  function handleBlur() {
    console.log('blur')   
  }


  const { lookup, minPrice, maxPrice, sizes, prices, sizeAndPriceStr } = processSizeAndPrice(data.data.contentfulProduct.sizesAndPrices);
  
  return (
    <>
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
            <div className="col-sm-4 col-md-3">
              <span className="price">{selectState.userSelection ? `$${lookup[selectState.value]}` : <small style={{fontSize: '.8rem'}}>{`$${minPrice} - $${maxPrice}`}</small>}</span>
              <select value={selectState.value} style={{padding: '.3rem', borderRadius: '7px'}} onChange={handleChange} onBlur={handleChange} className="form-select form-select-lg mb-3 mt-3">
                {!selectState.userSelection && <option value="Choose Size">Choose Size</option> }
                {sizes.map((s, i) => (
                  <option onFocus={handleFocus} onBlur={handleBlur} key={i} value={s}>{selectState.value === s ? s : `${s} - $${prices[i]}`}</option>
                ))}
              </select>
            </div>

              
              <div className="col-sm-12 col-md-12 text-left">
                <div className="row container mb-3">
                <button
                  style={{opacity: !selectState.userSelection ? .5: 1}}
                  className="Product snipcart-add-item"
                  data-item-id={data.data.contentfulProduct.slug}
                  data-item-image={data.data.contentfulProduct.image === null ? "" : data.data.contentfulProduct.image.fixed.src}
                  data-item-price={selectState.userSelection ? `${lookup[selectState.value]}` : minPrice}
                  data-item-custom1-name="Size"
                  data-item-custom1-options={selectState.userSelection ? `${selectState.value + '|' + sizeAndPriceStr.split('|').filter(s => !s.includes(selectState.value)).join('|')}`: sizeAndPriceStr}
                  data-item-name={`${data.data.contentfulProduct.name} ${selectState.userSelection ? `- (Size ${selectState.value})` : ''}`}
                  data-item-url={data.data.contentfulProduct.slug}
                  disabled={!selectState.userSelection}
                  >
                  <i className="fas fa-tags" />
                  Add to Cart
                </button> 
                </div>
                <div className="row container mt-3">
                  <Link
                  state={{ 
                    itemName: data.data.contentfulProduct.name,
                    itemPrice: lookup[selectState.value],
                    itemSize: selectState.value
                  }} className="btn btn-primary" to="/contact-us">Contact Us</Link>
                </div>
            </div>
             
          </div>
          <div
            dangerouslySetInnerHTML={{
              __html: data.data.contentfulProduct.description.childMarkdownRemark.html
            }}
          />
        </div>
      </div>
    </>
  );
}

export default ProductDetails;

export const query = graphql`
  query ProductDetailsQuery($slug: String!) {
    contentfulProduct(slug: {eq: $slug }) {
      id
      name
      slug
      discount
      image {
        fixed(width: 1120, height: 500) {
        width
        height
        src
        srcSet
      }
    }
    sizesAndPrices
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