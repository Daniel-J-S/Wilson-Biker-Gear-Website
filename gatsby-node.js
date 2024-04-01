const path = require('path');

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  return new Promise((resolve, reject) => {
    const StoreTemplate = path.resolve('src/templates/details.js');
    resolve(
      graphql(`
        {
          allContentfulClothing{
            edges{
              node{
                id
                slug
              }
            }
          }
        }
      `).then(result => {
        if (result.errors) {
          reject(result.errors)
        }
        result.data.allContentfulClothing.edges.forEach(edge => {
          createPage({
            path: edge.node.slug,
            component: StoreTemplate,
            context: {
              slug: edge.node.slug,
            },
          })
        });
      })
    )
  })
}
