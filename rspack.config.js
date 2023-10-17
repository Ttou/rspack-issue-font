const { defineConfig } = require('@rspack/cli')
const { VueLoaderPlugin } = require('vue-loader')
const { resolve } = require('node:path')
const components = require('unplugin-vue-components/rspack')
const { ElementUiResolver } = require('unplugin-vue-components/resolvers')

module.exports = defineConfig({
  context: __dirname,
  entry: {
    main: './src/main.ts'
  },
  output: {
    clean: true,
    filename: 'js/[name]-[hash:8].js',
    chunkFilename: 'js/[name]-[hash:8].js',
    assetModuleFilename: 'assets/[name]-[hash:8].[ext]'
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },
  builtins: {
    html: [
      {
        template: './index.html',
        title: 'Rspack Issue Font'
      }
    ]
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    },
    extensions: ['.vue', '...']
  },
  devServer: {
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    host: 'localhost',
    port: 3000,
    async onListening(devServer) {
      const address = devServer.server.address()

      console.log(
        'Rspack Listening on:',
        `http://${address.address}:${address.port}`
      )
    }
  },
  devtool: false,
  infrastructureLogging: {
    level: 'error'
  },
  plugins: [
    new VueLoaderPlugin(),
    components({
      dts: false,
      dirs: [],
      resolvers: [
        ElementUiResolver({
          importStyle: false
        })
      ]
    })
  ],
  experiments: {
    css: false
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.ts$/,
        loader: 'builtin:swc-loader',
        options: {
          sourceMap: true,
          jsc: {
            parser: {
              syntax: 'typescript'
            }
          }
        },
        type: 'javascript/auto'
      },
      {
        test: /\.scss$/,
        use: ['vue-style-loader', 'css-loader', 'sass-loader'],
        type: 'javascript/auto'
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [['postcss-nested', { preserveEmpty: true }]]
              }
            }
          }
        ],
        type: 'javascript/auto'
      },
      {
        test: /\.svg$/,
        type: 'asset/resource'
      }
    ]
  }
})
