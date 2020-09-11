/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

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
        icon: "FaQuestionCircle",
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
        name: "About",
        link: "/about",
        text: "Learn more about this tool and MLSA.",
        icon: "FaQuestionCircle",
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
