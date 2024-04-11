exports.onCreateWebpackConfig = ({ stage, loaders, actions, getConfig }) => {
  if (stage === "build-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /print-js/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
  if (stage === 'build-javascript' || stage === 'develop') {
    const config = getConfig()

    const miniCssExtractPlugin = config.plugins.find(
        plugin => (plugin.constructor.name === 'MiniCssExtractPlugin')
    )

    if (miniCssExtractPlugin) miniCssExtractPlugin.options.ignoreOrder = true

    actions.replaceWebpackConfig(config)
  }
}
// gatsby-node.js
// exports.onCreateWebpackConfig = ({ actions }) => {
//   actions.setWebpackConfig({
//     node: {
//       fs: 'empty'
//     }
//   })
// }
