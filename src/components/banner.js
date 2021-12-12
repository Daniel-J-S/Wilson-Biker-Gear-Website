import React, { useState, useEffect, useRef } from 'react';
import Slider from 'react-slick';
import Img from 'gatsby-image';
import { Link } from 'gatsby';



export default function Banner ({ BannerData }) {
    const [ message, setMessage ] = useState(0);

    const messageRef = useRef();
    
    const settings = {
      dots: false,
      speed: 3500,
      infinite: false,
      autoplay: false,
      autoplaySpeed: 5000,
      slidesToShow: 1,
      slidesToScroll: 1
    };


    const messages = {
      0: 'Holiday Closure: December 25th, 26th & 27th',
      1: 'Vacation Closure: January 1st - 10th',
    }

    const handleTick = () => {
      setMessage(m => ++m % 2)
    }
    
    useEffect(() => {
      messageRef.current = handleTick;
    })
    
    useEffect(() => {
      const timerId = setInterval(() => {
        messageRef.current();
      }, 15000);
      return () => {
        clearInterval(timerId)
      }
    }, []);

    return (
      <div className="slider-section">
        <div className="scroll-container">
          <p className="scroll-text" key={message}>
            <small>
              {messages[message]}
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