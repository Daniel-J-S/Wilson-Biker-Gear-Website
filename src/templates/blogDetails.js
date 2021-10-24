import React from 'react';
import Img from 'gatsby-image';
import { DiscussionEmbed } from 'disqus-react';
import SEO from '../components/seo';
import { graphql } from 'gatsby';

const disqusShortname = 'wilsonbikergear';

const BlogDetails = data => (
    <>
        <SEO title={data.data.contentfulBlogs.title} keywords={[`vests`, `jackets`, `biker gear`, `mens`, `womens`]} />
        <div className="blogs-page">
            <div className="post-thumbnail">
                <Img fluid={data.data.contentfulBlogs.featureImage.fluid} />
            </div>
            <div className="container">
                <div className="post-details">
                    <h2 className="title">{data.data.contentfulBlogs.title}</h2>
                    <div className="post-date">
                        <i className="fas fa-calendar-alt"></i>
                        {data.data.contentfulBlogs.publicData}
                    </div>
                    <div className="author">
                        <Img fixed={data.data.contentfulBlogs.author.photo.fixed} />
                        <strong className="name">{data.data.contentfulBlogs.author.name}</strong>
                    </div>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: data.data.contentfulBlogs.description.childMarkdownRemark.html
                        }}
                    />

                </div>
                <DiscussionEmbed
                    shortname={disqusShortname}
                    config={{
                        identifier: data.data.contentfulBlogs.id,
                        title: data.data.contentfulBlogs.title
                    }}
                />
            </div>
        </div>
    </>
);

export default BlogDetails;

export const query = graphql`
  query BlogDetailsQuery($slug: String!) {
        contentfulBlogs(slug: {eq: $slug }) {
            id
            title
            slug
            publicData(formatString: "MMMM D, YYYY")
            author {
            name
            photo {
                fixed(width: 50, height: 50) {
                width
                height
                src
                srcSet
                }
            }
            }
            description {
                childMarkdownRemark {
                    html
                    excerpt(pruneLength: 250)
                }
            }
            featureImage {
                fluid {
                    base64
                    aspectRatio
                    src
                    srcSet
                    srcWebp
                    srcSetWebp
                    sizes
                  }
        }
    }
}`;
