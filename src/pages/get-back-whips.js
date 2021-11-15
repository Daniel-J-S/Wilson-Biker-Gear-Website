import React, { useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import StarRatingComponent from 'react-star-rating-component';
import { graphql, Link } from 'gatsby';
import SEO from '../components/seo';

const GetBackWhips = data => {
  
  const [selectState, setSelectState] = useState({
    value: 'Choose Option',
    userSelection: false,
    options: createOptionsString()
  });

  function handleChange(e) {
    e.persist()
    setSelectState(prevState => ({
      ...prevState,
      value: e.target.value, 
      userSelection: true,
      options: createOptionsString(e.target.value)
    }));
  }

  function createOptionsString(choice) {
      const arrCopy = [...data.data.contentfulProduct.sizesAndPrices].map(s => s.replace(' 32.99', ''))
      if(choice) {
          const extraction = arrCopy.splice(arrCopy.indexOf(choice), 1)[0];
          arrCopy.push(extraction);
          return arrCopy.join('|');
      }
      return arrCopy.join('|')
  }

  useEffect(() => {
      console.log(selectState)
  })
  
  return (
    <>
      <SEO 
        title={data.data.contentfulProduct.name} 
        keywords={[`Clothing`, `${data.data.contentfulProduct.name}`, `Jackets`, `Vests`]} 
        description={`Check out our ${data.data.contentfulProduct.name} currently starting at $32.99`}
        location={data.location}
      />
      <div className="container details-page mb-5">
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
              <span className="price">$32.99</span>
              <select value={selectState.value} style={{padding: '.3rem', borderRadius: '7px'}} onChange={handleChange} onBlur={handleChange} className="form-select form-select-lg mb-3 mt-3">
                {!selectState.userSelection && <option value="Choose Option">Choose Option</option> }
                {data.data.contentfulProduct.sizesAndPrices.map((v, i) => {
                    v = v.replace('32.99', '')
                    return (
                        <option key={i} value={v}>{v}</option>
                )})}
              </select>
            </div>

              
              <div className="col-sm-12 col-md-12 text-left">
                <div className="row container mb-3">
                <button
                  style={{opacity: !selectState.userSelection ? .5: 1}}
                  className="Product snipcart-add-item"
                  data-item-id={data.data.contentfulProduct.slug}
                  data-item-image={data.data.contentfulProduct.image === null ? "" : data.data.contentfulProduct.image.fixed.src}
                  data-item-price="32.99"
                  data-item-custom1-name="Options"
                  data-item-custom1-options={selectState.options}
                  data-item-name={data.data.contentfulProduct.name}
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
                    itemPrice: 32.99,
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

export default GetBackWhips;

export const query = graphql`
  query GetBackWhipsQuery {
    contentfulProduct(category: {name: {eq: "Get Back Whips"}}) {
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