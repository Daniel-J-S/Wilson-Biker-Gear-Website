import React, { Component } from 'react';
import Img from 'gatsby-image';

export default class LatestBlogs extends Component {
    render() {
        const { data } = this.props;
        return (
            <div className="container">
                <div className="text-center"><h2 className="with-underline">Latest Blogs</h2></div>
                <ul className="latest-blog">
                    {data.edges.map(items => (
                        <li key={items.node.id}>
                            <div className="inner">
                                <Img fluid={items.node.featureImage.fluid} />
                                <h2>{items.node.title}</h2>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
};