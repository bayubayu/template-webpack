const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function(environment) {

    let webpackConfig = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist') // bundle js file, to output path/js
    },
    plugins: [
        new CleanWebpackPlugin(['dist']), // clean up dist folder
        new HtmlWebpackPlugin({
            title: 'Output Management',
            template: './src/index.html'
        }),
        new BrowserSyncPlugin( // browsersync with proxy mode, will auto refresh on file changes
            {
                host: 'localhost',
                port: 3003,
                open: false,
                server: { baseDir: ['dist'] }
            }, {
                injectCss: true // css changes will not get full reload
            }
        ),
        new ExtractTextPlugin({
            filename: './css/bundle.css'

        })
    ],
    module: {
        rules: [{
                test: /\.(s*)css$/,
                use: ExtractTextPlugin.extract({
                    // fallback:'style-loader',
                    use: [
                        {
                            loader: "css-loader",
                            options: {
                                sourceMap: true,
                                minimize: (environment === 'production')? true : false
                            }
                        }, {
                            loader: 'postcss-loader',
                            options: {
                                plugins: function () {
                                    return [
                                        // require('precss'),
                                        require('autoprefixer')
                                    ];
                                }
                            }
                        }, {
                            loader: "sass-loader",
                            options: {
                                sourceMap: true
                            }
                        }
                    ],
                })
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
                include: path.resolve(__dirname, 'src/fonts'),
                use: {
                    loader: 'file-loader',
                    options: {
                        name: './fonts/[name].[ext]',
                        context: ''
                    }
                }
            },
            {
                test: /.*\.(gif|png|jpe?g|svg)$/i,
                include: path.resolve(__dirname, 'src/images'),
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                        name: './img/[name].[ext]',
                    }                  }
                ]
            }            
        ]
    },
    externals: {
    }
};

    if (environment === 'production') {
        webpackConfig.plugins.push(
            new UglifyJsPlugin()
        );
    } else {
        webpackConfig.devtool = 'source-map';
    }

return webpackConfig;
};