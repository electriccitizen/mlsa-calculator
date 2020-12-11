/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})
module.exports = {
  siteMetadata: {
    title: "Montana Legal Help Tools",
    menuLinks: [
      {
        name: "Child Support Calculator",
        link: "/child-support",
        text: "Help determine your child support costs.",
        icon: "FaCalculator",
      },
      {
        name: "Calculator Guide",
        link: "/child-support/guide",
        text: "Learn more about how the calculator works.",
        icon: "FaGlobe",
      },
    ],
    menuLinks2: [
      {
        name: "Restitution Worksheet",
        link: "/restitution",
        text: "Create a restitution log.",
        icon: "FaRegFileAlt",
      },
    ],
    menuLinks3: [
      {
        name: "Safe Internet Use",
        link: "/safety",
        text: "Tips for Internet safety and safe browsing.",
        icon: "FaThumbsUp",
      },
      {
        name: "Contact",
        link: "/contact",
        text: "Contact the MLSA.",
        icon: "FaPhoneAlt",
      },
      {
        name: "About",
        link: "/about",
        text: "Learn more about the MLSA.",
        icon: "FaQuestionCircle",
      },
    ],
  },
  plugins: [
    // {
    //   resolve: "gatsby-plugin-chakra-ui",
    //   options: {
    //     isResettingCSS: true, // optional, default to true
    //     isUsingColorMode: true, // optional, default to true
    //   },
    // },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    // SOURCE FILESYSTEM (STATIC IMAGES)
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "Montana Legal Help Tools",
        short_name: "MLSA",
        start_url: "/",
        icon: "src/images/favicon.svg", // This path is relative to the root of the site.
      },
    },
    `gatsby-transformer-sharp`,
      `gatsby-plugin-sharp`,
  ],
}
