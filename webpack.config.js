"use strict";

const merge = require('webpack-merge');

const PATHS = require('./webpack-paths');
const loaders = require('./webpack-loaders');

const common = {
	entry: {
		app: ['babel-polyfill', PATHS.src]
	},
	output: {
		path: PATHS.dist,
		filename: 'bundle.js'
	},
	module: {
    rules: [
      loaders.babel,
      loaders.css,
      loaders.font,
    ]
  },
	resolve: {
    extensions: ['.js', '.jsx']
  }
};

let config;

switch(process.env.NODE_ENV) {
	case 'build':
		config = merge(
		  common,
      { devtool: 'source-map' }
	  );
		break;
	case 'development':
		config = merge(
			common,
			{ devtool: 'eval-source-map' },
			loaders.devServer({
				host: process.env.host,
				port: 3000
			})
		);
}

module.exports = config;
