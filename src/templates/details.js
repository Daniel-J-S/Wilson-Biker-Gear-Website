import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import StarRatingComponent from 'react-star-rating-component';
import { graphql, Link } from 'gatsby';
import SEO from '../components/seo';
import { processSizeAndPrice } from '../utils/process-size-and-price';
import { processColors } from '../utils/process-colors';



const ProductDetails = ({ data: { contentfulClothing }, location }) => {
  const colorsStr = processColors(contentfulClothing.colors);
  const [
    weightCodes,
    lookup,
    prices,
    sizes,
    maxPrice,
    minPrice,
    sizeAndPriceStr, getSizePriceStr] = processSizeAndPrice(contentfulClothing.sizesAndPrices);
  
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

  const [photos, setPhotos] = useState({
    selectedPhoto: contentfulClothing.image,
    morePhotos: contentfulClothing.productMorePhotos
  })


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
    
    const filteredPhoto = photos.morePhotos.find(p => p.description === e.target.value);
    const filteredPhotos = photos.morePhotos.filter(p => p.description !== e.target.value);
    
    filteredPhotos.unshift(filteredPhoto)
    
    setPhotos({
      selectedPhoto: filteredPhoto,
      morePhotos: filteredPhotos
    });

    setColorState(prevState => ({
      ...prevState,
      value: e.target.value, 
      userSelection: true,
      colorsStr: processColors(contentfulClothing.colors, e.target.value)
    }));
  }



  const { slug } = contentfulClothing;
  const url = `https://wilsonbikergear.com/.netlify/functions/checkout?id=${slug}&price=${lookup[selectState.value]}&weight=${selectState.userSelection ? weightCodes[selectState.value] : 2}`
  return (
    <>
      <SEO 
        title={contentfulClothing.name} 
        keywords={[`Clothing`, `${contentfulClothing.name}`, `Jackets`, `Vests`]} 
        description={`Check out our ${contentfulClothing.name} currently starting at $${minPrice}`}
        location={location}
      />
      <div className="container details-page mb-5">
        <div className="product-details">
          <div className="Product-Screenshot">
            {photos.morePhotos === null ? <div className="no-image">No Image</div> :
              <Tabs>
                {photos.morePhotos.map(photo => (
                  <TabPanel key={photo.id}>
                    <Tab><img src={photo.fixed.src} alt={photo.id}/></Tab>
                  </TabPanel>
                ))}
                <TabList>
                  {photos.morePhotos.map(photo => (
                    <Tab key={photo.id}><img src={photo.fixed.src} alt={photo.id}/></Tab>
                  ))}
                </TabList>
              </Tabs>}
          </div>
          <div>
            <h2>{contentfulClothing.name}</h2>
          </div>
          <StarRatingComponent
            name="rate1"
            starCount={5}
            value={contentfulClothing.rating}
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
              {
                contentfulClothing.colors &&
                <select onChange={handleColorChange} value={colorState.value} style={{padding: '.3rem', borderRadius: '7px'}} onBlur={handleChange} className="form-select form-select-lg mb-3 mt-3">
                  {!colorState.userSelection && <option value="Choose Color">Choose Color</option> }
                  {contentfulClothing.colors.map((d, i) => <option key={i} value={d}>{d}</option>)}
                </select>
              }

            </div>

              
              <div className="col-sm-12 col-md-12 text-left">
                <p style={{fontStyle: 'italic', fontSize: '.8rem'}} className="mt-2 mb-4">Shipping costs may vary based on volume</p>
                <div className="row container mb-3">
                <button
                  style={{opacity: !selectState.userSelection ? .5: 1}}
                  className="Product snipcart-add-item"
                  data-item-id={contentfulClothing.slug}
                  data-item-image={photos.selectedPhoto === null ? "" : photos.selectedPhoto.fixed.src}
                  data-item-price={selectState.userSelection ? lookup[selectState.value] : minPrice}
                  data-item-custom1-name="Size"
                  data-item-custom1-options={selectState.sizeAndPriceStr}
                  data-item-custom2-name={colorState.colorsStr ? "Colors": null}
                  data-item-custom2-options={colorState.colorsStr ? colorState.colorsStr: null }
                  data-item-name={contentfulClothing.name}
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
                      itemName: contentfulClothing.name,
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
              __html: contentfulClothing.description.childMarkdownRemark.html
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