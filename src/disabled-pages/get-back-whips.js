import React, { useState } from 'react';
import StarRatingComponent from 'react-star-rating-component';
import { graphql, Link } from 'gatsby';
import SEO from '../components/seo';


const GetBackWhips = data => {
  
  const [selectState, setSelectState] = useState({
    value: 'Choose Option',
    userSelection: false,
    index: 0,
    options: getOptionsString()
  });


  function getOptionsString(option) {
    const { contentfulAccessory: { variations }} = data.data;
    const variationsCopy = [...variations];
    if(option !== undefined) {
      variationsCopy.splice(variationsCopy.indexOf(option), 1);
      variationsCopy.unshift(option);
      return variationsCopy.join('|');
    }
    return variationsCopy.join('|');
  }


  function handleChange(e) {
    e.persist()
    setSelectState(prevState => ({
      ...prevState,
      value: e.target.value, 
      index: e.target.selectedIndex,
      userSelection: true,
      options: getOptionsString(e.target.value)
    }));
  }

  const { slug } = data.data.contentfulAccessory;
  const url = `https://wilsonbikergear.com/.netlify/functions/checkout?id=${slug}&price=32.99&weight=1`

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
          <div id="carouselExampleControls" className="carousel slide mb-5 mt-5" data-ride="carousel" data-interval="2000">
              <div className="carousel-inner">
                  {data.data.contentfulAccessory.productMorePhotos.map((items, index) => (
                      <div key={items.id} className={`carousel-item ${index === 0 ? 'active': ''}`}>
                        <img className="d-block w-100" src={items.fixed.src} alt={`Get back whip slide #${index + 1}`} />
                      </div>
                  ))}
              </div>
              <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span style={{color: '#000', fontSize: '1.5rem'}}>
                  <i className="fas fa-arrow-left" />
                </span>
              </a>
              <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span style={{color: '#000', fontSize: '1.5rem'}}>
                  <i className="fas fa-arrow-right" />
                </span>
              </a>
            </div>
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
              <select value={selectState.value} style={{padding: '.3rem', borderRadius: '7px', width: '15em' }} onChange={handleChange} onBlur={handleChange} className="form-select form-select-lg mb-3 mt-3">
                {!selectState.userSelection && <option value="Choose Option">Choose Option</option> }
                {data.data.contentfulAccessory.variations.map((v, i) => (
                  <option key={i} data-index={i} value={v}>{v}</option>
                ))}
              </select>
            </div>

              
              <div className="col-sm-12 col-md-12 text-left">
                <div className="row container mb-3">
                <button
                  style={{opacity: !selectState.userSelection ? .5: 1}}
                  className="Product snipcart-add-item"
                  data-item-id={data.data.contentfulAccessory.slug}
                  data-item-image={data.data.contentfulAccessory.image === null ? "" : data.data.contentfulAccessory.productMorePhotos[selectState.index].fixed.src}
                  data-item-price={data.data.contentfulAccessory.price}
                  data-item-custom1-name="Options"
                  data-item-custom1-options={selectState.options}
                  data-item-name={data.data.contentfulAccessory.name}
                  data-item-url={url}
                  data-item-weight={1}
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