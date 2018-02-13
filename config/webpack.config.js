const webpack = require('webpack-stream');
const path = require('path');

module.exports = (options = {}) => {
  options = {
    ...{
      environment: 'development',
      analyze: false,
    },
    ...options,
  };

  return {
    output: {
      filename: 'client.min.js',
    },
    resolve: {
      alias: {
        vue$: 'vue/dist/vue.esm.js',
      },
    },
    module: {
      rules: [
        {
          test: /\.js?$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          query: {
            presets: ['env'],
          },
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            loaders: {
              scss: [
                'vue-style-loader',
                {
                  loader: 'css-loader',
                  options: {
                    sourceMap: true,
                  },
                },
                {
                  loader: 'postcss-loader',
                  options: {
                    sourceMap: true,
                    config: {
                      path: path.resolve(__dirname, './postcss.config.js'),
                    },
                  },
                },
                {
                  loader: 'sass-loader',
                  options: {
                    sourceMap: true,
                    includePaths: [
                      'node_modules/normalize.css',
                    ],
                  },
                },
                // {
                //   loader: 'sass-resources-loader',
                //   options: {
                //     resources: [],
                //   },
                // },
              ],
            },
          },
        },
      ],
    },
    plugins: [
      new webpack.webpack.ProvidePlugin({
        // $: 'jquery',
        // jQuery: 'jquery'
      }),
      new webpack.webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
        },
        sourceMap: webpack.webpack.devtool && (webpack.webpack.devtool.indexOf('sourcemap') >= 0 || webpack.webpack.devtool.indexOf('source-map') >= 0),
      }),
      new webpack.webpack.NamedModulesPlugin(),
      /**
       * plugins to be added when in analyze mode (`gulp --analyze`)
       */
      ...(options.analyze ? [
        new require('webpack-bundle-analyzer').BundleAnalyzerPlugin({
          analyzerMode: 'static',
          reportFilename: 'webpackReport.html',
        })] : []),
      /**
       * plugins to be added when in production only
       */
      ...(options.environment === 'production' ? [] : []),
    ],
    devtool: options.environment === 'development' ? 'cheap-module-eval-source-map' : 'nosources-source-map',
  };
};
