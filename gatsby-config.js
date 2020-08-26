/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: {
    title: "Montana Child Support Calculator",
    menuLinks: [
      {
        name: "Calculator",
        link: "/intro",
        text: "Help determine your child support costs.",
        icon: "FaCalculator"
      },
      {
        name: "Calculator Guide",
        link: "/guide",
        text:
          "Learn more about how the calculator works.",
        icon: "FaGlobe"
      },
      {
        name: "Safe Internet Use",
        link: "/safety",
        text: "Tips for Internet safety and safe browsing.",
        icon: "FaThumbsUp"
      },
    ],
    plugins: [
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: `images`,
          path: `${__dirname}/src/images`,
        },
      },
      `gatsby-transformer-sharp`,
      `gatsby-plugin-sharp`,
    ],
  },
}
