import React from 'react';
import Slider from 'react-slick';
import Img from 'gatsby-image';
import { Link } from 'gatsby';



export default function Banner ({ BannerData }) {
  const settings = {
    dots: true,
    speed: 5000,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1
  };

    return (
      <div className="slider-section">
          {/* <div className="scroll-container">
            <p className="blink">
              <small>
                We'll be Temporarily Closed July 1 - 18th
              </small>
            </p>
          </div>  */}
          <div className="scroll-container">
            <p className="scroll-text">
              <small>
              We are not affiliated or associated with any other location other than our only location at 3016 Alta Mere on the Westside of Fort Worth.
              </small>
            </p>
          </div> 
        <Slider {...settings}>
          {BannerData.map((items, i) => (
            <div key={i} className="item">
              <div className="site-Banner">
                <Img fluid={items.node.image.fluid} />
                <div className="Banner-details">
                  <div>
                    <span className="sub-title">{items.node.subHeading}</span>
                    <h1>{items.node.title}</h1>
                    <Link to="/store">Shop Now</Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
  );
}