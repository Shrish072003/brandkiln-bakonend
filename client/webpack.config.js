module.exports = {
    devServer: {
      allowedHosts: 'all',  // This allows access from any host
      proxy: {
        '/api': {
          target: 'http://213.210.21.48:9000',  // Proxy API requests
          changeOrigin: true
        }
      }
    }
  };
  