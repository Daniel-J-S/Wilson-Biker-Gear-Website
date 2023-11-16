import React from 'react';
import Slider from 'react-slick';
import Img from 'gatsby-image';
import { Link } from 'gatsby';



export default function Banner ({ BannerData, bannerMessage }) {
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
          {
            bannerMessage.node.display &&
            <div className="scroll-container">
              <p className="scroll-text">
                <small>
                {bannerMessage.node.content}
                </small>
              </p>
            </div>
          }
            <div className="holiday-hours-container">
              <p>
                <small className="scroll-text">
                  Holiday Hours: Open Thanksgiving 9-3 - Closed Christmas Eve & Christmas Day
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