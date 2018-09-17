const rewireMobX = require('react-app-rewire-mobx');
const { injectBabelPlugin } = require('react-app-rewired');

/* config-overrides.js */
module.exports = function override(config, env) {
  config = injectBabelPlugin('emotion', config);
  config = rewireMobX(config, env);
  return config;
};
