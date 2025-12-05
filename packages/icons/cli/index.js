/**
 * SageBox CLI
 *
 * Entry point for programmatic usage
 */

module.exports = {
  commands: {
    icons: require('./commands/icons'),
    iconSets: require('./commands/icon-sets'),
    init: require('./commands/init')
  },
  utils: {
    config: require('./utils/config'),
    svgParser: require('./utils/svg-parser'),
    svgOptimizer: require('./utils/svg-optimizer'),
    iconServer: require('./utils/icon-server')
  },
  plugins: {
    vite: require('./plugins/vite')
  }
};
