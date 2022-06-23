import React, { useState, useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import StarRatingComponent from 'react-star-rating-component';
import { graphql, Link } from 'gatsby';
import SEO from '../components/seo';
import { processSizeAndPrice } from '../utils/process-size-and-price';
import { processColors } from '../utils/process-colors';



const ProductDetails = ({ data }) => {
  console.log(data.contentfulClothing.productMorePhotos)
  const colorsStr = processColors(data.contentfulClothing.colors);
  const [
    weightCodes,
    lookup,
    prices,
    sizes,
    maxPrice,
    minPrice,
    sizeAndPriceStr, getSizePriceStr] = processSizeAndPrice(data.contentfulClothing.sizesAndPrices);
  
  const [selectState, setSelectState] = useState({
    value: 'Choose Size',
    userSelection: false,
    sizeAndPriceStr,
  });

  const [colorState, setColorState] = useState({
    value: '',
    userSelection: false,
    colorsStr,
  });


  function handleChange(e) {
    e.persist();
    setSelectState(prevState => ({
      ...prevState,
      value: e.target.value, 
      userSelection: true,
      sizeAndPriceStr: getSizePriceStr(e.target.value)
    }));
  }

  function handleColorChange(e) {
    e.persist();
    setColorState(prevState => ({
      ...prevState,
      value: e.target.value, 
      userSelection: true,
      colorsStr: processColors(data.contentfulClothing.colors, e.target.value)
    }));
  }



  const { slug } = data.contentfulClothing;
  const url = `https://wilsonbikergear.com/.netlify/functions/checkout?id=${slug}&price=${lookup[selectState.value]}&weight=${selectState.userSelection ? weightCodes[selectState.value] : 2}`
  return (
    <>
      <SEO 
        title={data.contentfulClothing.name} 
        keywords={[`Clothing`, `${data.contentfulClothing.name}`, `Jackets`, `Vests`]} 
        description={`Check out our ${data.contentfulClothing.name} currently starting at $${minPrice}`}
        location={data.location}
      />
      <div className="container details-page mb-5">
        <div className="product-details">
          <div className="Product-Screenshot">
            {data.contentfulClothing.productMorePhotos === null ? <div className="no-image">No Image</div> :
              <Tabs>
                {data.contentfulClothing.productMorePhotos.map(items => (
                  <TabPanel key={items.id}>
                    <Tab><img src={items.fixed.src} alt={items.id}/></Tab>
                  </TabPanel>
                ))}
                <TabList>
                  {data.contentfulClothing.productMorePhotos.map(items => (
                    <Tab key={items.id}><img src={items.fixed.src} alt={items.id}/></Tab>
                  ))}
                </TabList>
              </Tabs>}
          </div>
          <div>
            <h2>{data.contentfulClothing.name}</h2>
          </div>
          <StarRatingComponent
            name="rate1"
            starCount={5}
            value={data.contentfulClothing.rating}
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

              <select onChange={handleColorChange} value={colorState.value} style={{padding: '.3rem', borderRadius: '7px'}} onBlur={handleChange} className="form-select form-select-lg mb-3 mt-3">
                {!colorState.userSelection && <option value="Choose Color">Choose Color</option> }
                {data.contentfulClothing.colors.map((d, i) => <option key={i} value={d}>{d}</option>)}
              </select>

            </div>

              
              <div className="col-sm-12 col-md-12 text-left">
                <p style={{fontStyle: 'italic', fontSize: '.8rem'}} className="mt-2 mb-4">Shipping costs may vary based on volume</p>
                <div className="row container mb-3">
                <button
                  style={{opacity: !selectState.userSelection ? .5: 1}}
                  className="Product snipcart-add-item"
                  data-item-id={data.contentfulClothing.slug}
                  data-item-image={data.contentfulClothing.image === null ? "" : data.contentfulClothing.image.fixed.src}
                  data-item-price={selectState.userSelection ? lookup[selectState.value] : minPrice}
                  data-item-custom1-name="Size"
                  data-item-custom1-options={selectState.sizeAndPriceStr}
                  data-item-custom2-name={colorState.colorsStr ? "Colors": null}
                  data-item-custom2-options={colorState.colorsStr ? colorState.colorsStr: null }
                  data-item-name={data.contentfulClothing.name}
                  data-item-url={url}
                  disabled={!selectState.userSelection}
                  data-item-weight={selectState.userSelection ? weightCodes[selectState.value] : 2}
                  >
                  <i className="fas fa-tags" />
                  Add to Cart
                </button> 
                </div>
                <div className="row container mt-3">
                  {
                    selectState.userSelection ?
                    <Link
                    state={{ 
                      itemName: data.contentfulClothing.name,
                      itemPrice: lookup[selectState.value],
                      itemSize: selectState.value
                    }} className="btn btn-primary" to="/contact-us">Contact Us</Link>
                    :
                    <Link className="btn btn-primary" to="/contact-us">Contact Us</Link>
                  }
                </div>
            </div>
             
          </div>
          <div
            dangerouslySetInnerHTML={{
              __html: data.contentfulClothing.description.childMarkdownRemark.html
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
    colors
      description {
      childMarkdownRemark {
        html
      }
    }
    productMorePhotos {
      id
      description
      fixed(width: 1120, height: 600){
        src
      }
    }
    rating
  }
}`;