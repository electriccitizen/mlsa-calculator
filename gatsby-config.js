/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: {
    title: "Montana Child Support Calculator",
      menuLinks:[
        {
          name: 'Home',
          link: '/'
        },
        {
          name: 'Safety',
          link: '/safety'
        }
      ]
  },
  plugins: ["gatsby-plugin-chakra-ui"],
}
