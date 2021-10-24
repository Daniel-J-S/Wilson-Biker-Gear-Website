import React, { Component } from 'react';
import Img from 'gatsby-image';
import { Link } from 'gatsby';

export default class Countdown extends Component {
  render() {
    const { data } = this.props;
    return (
      <div className="countdown-section">
        <Img fluid={data.featureImage.fluid} />
        <div className="container">
          <div className="countdown-inner">
            <h2 className="with-underline">{data.title}</h2>
            <span className="date">Last Date :</span>
            <span className="date"><strong><i className="fas fa-clock"></i>{data.date}</strong></span>
            <Link to="/sale-items">Shop Now</Link>
          </div>
        </div>
      </div>
    );
  }
}