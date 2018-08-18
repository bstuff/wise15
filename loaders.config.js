/* eslint-disable import/no-extraneous-dependencies */
import autoprefixer from 'autoprefixer';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import path from 'path';

const NODE_ENV = process.env.NODE_ENV === 'production' ? 'production'
  : 'development';
const dev = NODE_ENV === 'development';
const prod = NODE_ENV === 'production';
const cssLoader = {
  loader: 'css-loader',
  options: {
    sourceMap: false,
    importLoaders: 2,
    modules: true,
    camelCase: true,
    localIdentName: '[name]__[local]___[hash:base64:5]',
    // getLocalIdent: (context, localIdentName, localName) => {
    //   const rp = context.resourcePath.replace(process.cwd(), '');
    //   if (prod) return getClassName(rp, localIdentName, localName);
    //   const hsh = Buffer.from(md5(rp)).toString('base64').substr(1, 5);
    //   return `${localName}___${hsh}`;
    // },
  },
};
const postcssLoader = {
  loader: 'postcss-loader',
  options: {
    plugins: () => [
      autoprefixer({
        browsers: ['last 3 version'],
      }),
    ],
    sourceMap: dev,
  },
};

const stylusLoader = {
  loader: 'stylus-loader',
};

const imagesLoader = {
  loader: 'file-loader',
  options: {
    name: 'assets/[hash].[ext]',
  },
};

export const rules = [{
  test: /\.css$/,
  exclude: /\/(node_modules)\//,
  use: prod
    ? ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [cssLoader],
    }) : [ 'style-loader', cssLoader ],
}, {
  test: /\.css$/,
  include: /\/(node_modules)\//,
  use: prod
    ? ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [cssLoader],
    }) : [ 'style-loader', cssLoader ],
},
{
  test: /\.html$/,
  loaders: [
    {
      loader: 'html-loader',
      options: {
        attrs: 'img:src video:poster xlink:href source:src image:xlink:href',
        interpolate: true,
      },
    },
  ],
}, {
  test: /\.(pug|jade)$/,
  loaders: [
    {
      loader: 'html-loader',
      options: {
        attrs: 'img:src xlink:href source:src image:xlink:href',
        interpolate: true,
      },
    },
    {
      loader: 'pug-html-loader',
      options: {
        exports: false,
        basedir: path.resolve(__dirname),
        pretty: dev,
      },
    },
  ],
},

{
  test: /\.styl$/,
  exclude: /\/(node_modules)\//,
  use: prod
    ? ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [ cssLoader, postcssLoader, stylusLoader ],
    }) : [ 'style-loader', 'css-modules-flow-types-loader', cssLoader, postcssLoader, stylusLoader ],
}, {
  test: /\.(jpe?g|png|gif|svg)$/i,
  loaders: imagesLoader,
}, {
  test: /\.(ttf|eot|woff|woff2|webm|ogv|mp4)$/,
  loaders: imagesLoader,
},
{
  test: /\.jsx?$/,
  include: [path.join(__dirname, 'src')],
  exclude: /(node_modules\/)/,
  use: {
    loader: 'babel-loader',
    // options: {
    //   presets: ['@babel/preset-env'],
    // },
  },
}];
