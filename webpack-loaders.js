"use strict";

const webpack = require('webpack');
const PATHS = require('./webpack-paths');

exports.devServer = function(options) {
	return {
		devServer:{
			historyApiFallback: true,
			hot: true,
			inline: true,
			stats: 'errors-only',
			host: options.host,
			port: options.port,
			contentBase: './client/dist',
		},
		plugins: [
			new webpack.HotModuleReplacementPlugin({
				multistep: true
			})
		]
	};
}

exports.css = {
  test: /\.css$/,
  loaders: ['style', 'css'],
  include: PATHS.css
}

exports.font = {
  test: /\.ttf$/,
  loaders: ['file']
}

exports.babel = {
  test: /\.jsx?$/,
  exclude: /node_modules/,
  loaders: ['babel']
};
