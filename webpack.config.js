process.env.NODE_ENV = 'production';

const path = require('path');
const webpack = require('webpack');
const packageInfo = require('./package.json');
const version = packageInfo.version;
const fs = require('fs');

module.exports = {
    target: 'web',
    entry: {
        'template-web': path.resolve(__dirname, 'lib', 'index')
    },
    output: {
        path: path.resolve(__dirname, 'lib'),
        filename: '[name].js',
        library: 'template',
        libraryTarget: 'umd'
    },
    node: {
        fs: 'empty',
        path: 'empty',
        process: false
    },
    resolve: {
        alias: {
            'html-minifier': 'node-noop'
        }
    },
    /*
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        exclude: /node_modules/,
                        loader: 'eslint-loader',
                        options: JSON.parse(fs.readFileSync('.eslintrc.json').toString())
                    }
                ]
            }
        ]
    },
    */
    devtool: 'source-map',
    plugins: [
        new webpack.BannerPlugin(
            `art-template@${version} for browser | https://github.com/aui/art-template`
        ),
        new webpack.optimize.ModuleConcatenationPlugin(),
        process.env.NODE_ENV === 'production'
            ? new webpack.optimize.UglifyJsPlugin({
                  compress: {
                      warnings: false,
                      screw_ie8: false
                  },
                  mangle: {
                      screw_ie8: false
                  },
                  output: {
                      screw_ie8: false
                  }
              })
            : () => {}
    ]
};
