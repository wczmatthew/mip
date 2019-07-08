module.exports = {
  publicPath: './',
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': [
          './src/theme'
        ]
      }
    }
  },
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  },
  devServer: {
    proxy: {
      '/test': {
        target: 'http://10.10.14.123:8715',
        ws: true,
        changeOrigin: true,
        //路径重写
        pathRewrite: {
          '^/test': ''
        },
      },
      '/local': {
        target: 'http://10.1.110.26:8715',
        changeOrigin: true,
        //路径重写
        pathRewrite: {
          '^/local': ''
        },
      },
      '/prod': {
        target: 'https://cbp.chint.com:8707',
        changeOrigin: true,
        //路径重写
        pathRewrite: {
          '^/prod': ''
        },
      }
    }
  }
}
