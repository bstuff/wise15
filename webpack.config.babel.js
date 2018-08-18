// import FaviconsWebpackPlugin from 'favicons-webpack-plugin';
import CircularDependencyPlugin from 'circular-dependency-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import WebpackShellPlugin from 'webpack-shell-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import DotenvPlugin from 'webpack-dotenv-plugin';
import webpack from 'webpack';
import dotenv from 'dotenv';
import yargs from 'yargs';
import path from 'path';
import fs from 'fs';

import { rules } from './loaders.config';

const NODE_ENV = process.env.NODE_ENV === 'production' ? 'production'
  : 'development';
const dev = NODE_ENV === 'development';
const prod = NODE_ENV === 'production';

dotenv.config({
  path: [
    dev && path.join(__dirname, '.env.dev'),
    path.join(__dirname, '.env'),
  ].filter(Boolean).filter(fs.existsSync).shift(),
});

const dotenvPlugin = new DotenvPlugin({
  sample: './_env',
  path: [
    path.join(__dirname, '.env'),
    dev && path.join(__dirname, '.env.dev'),
  ].filter(Boolean),
  allowEmptyValues: true,
});


const PORT = yargs.argv.port || 3000;
const relativeBuildPath = './dist/www';

export default function (env = {}) {
  console.log({ env });
  return {
    entry: {
      frontend: './src/index.jsx',
    },
    output: {
      path: path.join(__dirname, relativeBuildPath),
      publicPath: '/',
      filename: 'js/[name].js?[hash]',
    },

    devServer: {
      port: PORT,
      host: 'local.rain.wtf',
      disableHostCheck: true,
    },

    resolve: {
      extensions: [ '*', '.js', '.jsx', '.json' ],
      alias: {
        _api: path.resolve(__dirname, 'src', 'api'),
      },
    },
    module: {
      rules,
    },

    devtool: NODE_ENV === 'production' ? false : 'inline-source-map',
    plugins: [
      dev && new HtmlWebpackPlugin({
        title: 'GettDelivery',
        template: './src/index.pug',
        filename: 'index.html',
      }),
      new ExtractTextPlugin({
        filename: 'css/[name].css?[hash]',
        allChunks: true,
      }),
      new webpack.LoaderOptionsPlugin({
        minimize: prod,
        options: {
          stylus: {
            import: [
              '~stylus-mixins/index.styl',
              path.resolve(__dirname, './src/common.styl'),
            ],
          },
        },
      }),
      // new FaviconsWebpackPlugin({
      //   // Your source logo
      //   logo: './src/favicon32.png',
      //   prefix: 'assets/icons-[hash]/',
      // }),

      new CircularDependencyPlugin({
        // exclude detection of files based on a RegExp
        exclude: /a\.js|node_modules/,
        // add errors to webpack instead of warnings
        failOnError: true,
        // allow import cycles that include an asyncronous import,
        // e.g. via import(/* webpackMode: "weak" */ './file.js')
        allowAsyncCycles: false,
        // set the current working directory for displaying module paths
        cwd: process.cwd(),
      }),

      dotenvPlugin,

      prod && new WebpackShellPlugin({
        onBuildStart: [`rimraf ${relativeBuildPath}`],
        // onBuildEnd: [
        //   'cp -f ./Dockerfile ./dist/Dockerfile',
        //   'cp -f ./landings.conf ./dist/landings.conf',
        // ],
      }),
    ].filter(Boolean),
  };
}
