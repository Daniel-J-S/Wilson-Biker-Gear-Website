import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import StarRatingComponent from 'react-star-rating-component';
import { graphql, Link } from 'gatsby';
import SEO from '../components/seo';
import { processSizeAndPrice } from '../utils/process-size-and-price';

const ProductDetails = data => {
  const [
    weightCodes,
    lookup,
    prices,
    sizes,
    maxPrice,
    minPrice,
    sizeAndPriceStr, getSizePriceStr] = processSizeAndPrice(data.data.contentfulClothing.sizesAndPrices);
  
  const [selectState, setSelectState] = useState({
    value: 'Choose Size',
    userSelection: false,
    sizeAndPriceStr,
  });

  console.log(weightCodes)

  function handleChange(e) {
    e.persist()
    setSelectState(prevState => ({
      ...prevState,
      value: e.target.value, 
      userSelection: true,
      sizeAndPriceStr: getSizePriceStr(e.target.value)
    }));
  }


  
  return (
    <>
      <SEO 
        title={data.data.contentfulClothing.name} 
        keywords={[`Clothing`, `${data.data.contentfulClothing.name}`, `Jackets`, `Vests`]} 
        description={`Check out our ${data.data.contentfulClothing.name} currently starting at $${minPrice}`}
        location={data.location}
      />
      <div className="container details-page mb-5">
        <div className="product-details">
          <div className="Product-Screenshot">
            {data.data.contentfulClothing.productMorePhotos === null ? <div className="no-image">No Image</div> :
              <Tabs>
                {data.data.contentfulClothing.productMorePhotos.map(items => (
                  <TabPanel key={items.id}>
                    <Tab><img src={items.fixed.src} alt={items.id}/></Tab>
                  </TabPanel>
                ))}
                <TabList>
                  {data.data.contentfulClothing.productMorePhotos.map(items => (
                    <Tab key={items.id}><img src={items.fixed.src} alt={items.id}/></Tab>
                  ))}
                </TabList>
              </Tabs>}
          </div>
          <div>
            <h2>{data.data.contentfulClothing.name}</h2>
          </div>
          <StarRatingComponent
            name="rate1"
            starCount={5}
            value={data.data.contentfulClothing.rating}
          />
          <div className="row buynowinner">
            <div className="col-sm-4 col-md-3">
              <span className="price">{selectState.userSelection ? `$${lookup[selectState.value]}` : <small style={{fontSize: '.8rem'}}>{`$${minPrice} - $${maxPrice}`}</small>}</span>
              <select value={selectState.value} style={{padding: '.3rem', borderRadius: '7px'}} onChange={handleChange} onBlur={handleChange} className="form-select form-select-lg mb-3 mt-3">
                {!selectState.userSelection && <option value="Choose Size">Choose Size</option> }
                {sizes.map((s, i) => (
                  <option key={i} value={s}>{selectState.value === s ? s : `${s} - $${prices[i]}`}</option>
                ))}
              </select>
            </div>

              
              <div className="col-sm-12 col-md-12 text-left">
                <div className="row container mb-3">
                <button
                  style={{opacity: !selectState.userSelection ? .5: 1}}
                  className="Product snipcart-add-item"
                  data-item-id={data.data.contentfulClothing.slug}
                  data-item-image={data.data.contentfulClothing.image === null ? "" : data.data.contentfulClothing.image.fixed.src}
                  data-item-price={selectState.userSelection ? lookup[selectState.value] : minPrice}
                  data-item-custom1-name="Size"
                  data-item-custom1-options={selectState.sizeAndPriceStr}
                  data-item-name={data.data.contentfulClothing.name}
                  data-item-url={`/${data.data.contentfulClothing.slug}`}
                  disabled={!selectState.userSelection}
                  data-item-weight={selectState.userSelection ? weightCodes[selectState.value] : 2}
                  data-item-height="1" 
                  data-item-length="1" 
                  data-item-width="1"
                  >
                  <i className="fas fa-tags" />
                  Add to Cart
                </button> 
                </div>
                <div className="row container mt-3">
                  <Link
                  state={{ 
                    itemName: data.data.contentfulClothing.name,
                    itemPrice: lookup[selectState.value],
                    itemSize: selectState.value
                  }} className="btn btn-primary" to="/contact-us">Contact Us</Link>
                </div>
            </div>
             
          </div>
          <div
            dangerouslySetInnerHTML={{
              __html: data.data.contentfulClothing.description.childMarkdownRemark.html
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
    contentfulClothing(slug: {eq: $slug }) {
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