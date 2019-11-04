  module.exports = {
    publicPath: './',
    css: {
      loaderOptions: {
        // 给 sass-loader 传递选项 -- 全局引入scss
        scss: {
          // 注意：在 sass-loader v7 中，这个选项名是 "data", V7之后为 'prependData'
          prependData: `@import '~@/styles/variable.scss';`
        },
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
        '/hw': {
          target: 'http://10.1.110.25:8715',
          changeOrigin: true,
          //路径重写
          pathRewrite: {
            '^/hw': ''
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
          target: 'https://ism.chint.com/marketingcloud',
          changeOrigin: true,
          //路径重写
          pathRewrite: {
            '^/prod': ''
          },
        }
      }
    }
  }
