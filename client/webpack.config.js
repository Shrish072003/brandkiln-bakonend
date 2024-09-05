devServer: {
    allowedHosts: 'all',
    proxy: {
      '/api': {
        target: 'http://213.210.21.48:9000',
        changeOrigin: true
      }
    }
  }
  