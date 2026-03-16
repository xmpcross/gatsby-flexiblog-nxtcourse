const withDefaults = require('./utils/default.options')

module.exports = ({ actions, getConfig }, pluginOptions) => {
  const { alias, extensions } = withDefaults(pluginOptions)
  const existingExtensions = (getConfig()?.resolve?.extensions || []).filter(Boolean)
  const normalizedExtensions = (extensions || [])
    .filter(Boolean)
    .map(ext => (ext.startsWith('.') ? ext : `.${ext}`))
  const mergedExtensions = [...new Set([...existingExtensions, ...normalizedExtensions])]

  actions.setWebpackConfig({
    resolve: {
      alias,
      ...(mergedExtensions.length > 0 ? { extensions: mergedExtensions } : {})
    }
  })
}
