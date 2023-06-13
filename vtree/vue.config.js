'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

// const path = require('path')
module.exports = {
  // options...
  devServer: {
    proxy: {
        '/': {
            'target': 'http://127.0.0.1:8000/',
            'changeOrigin': true,
        }
    }
    
    
  }
}