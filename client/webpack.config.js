const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function override(config, env) {
  if (env === 'development') {
    config.devServer = {
      ...config.devServer,
      allowedHosts: 'all',
      proxy: {
        '/api': {
          target: 'http://213.210.21.48:9000',
          changeOrigin: true
        }
      }
    };
  }
  return config;
};
