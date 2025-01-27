const { getDefaultConfig } = require('@expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);
module.exports = (async () => {

  return {
    ...defaultConfig,
    resolver: {
      ...defaultConfig.resolver,
      sourceExts: [...defaultConfig.resolver.sourceExts, 'cjs', 'db', 'svg', 'gql', 'graphql'],
    },
  };
})();