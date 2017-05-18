const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlPluginRemove = require('html-webpack-plugin-remove');

const webpack = require('webpack');
const path = require('path');

const isProd = process.env.NODE_ENV === 'production';

const cssDev = ['style-loader', 'css-loader?sourceMap', 'sass-loader'];
const cssProd = ExtractTextPlugin.extract({
    fallback: "style-loader",
    use: ['css-loader', 'sass-loader'],
    publicPath: "./dist"
});
const cssConfig = isProd ? cssProd : cssDev;

function getEntries(entries) {
    if (isProd) {
        return entries;
    }
    for (let key in entries) {
        if( typeof entries[key] === 'string' ) {
            entries[key] = [entries[key]];
        }
        entries[key] = entries[key].concat(['webpack/hot/dev-server', 'webpack-dev-server/client?http://localhost:8111'])
    }
    return entries;
}

function getPlugins() {
    let plugins = [
        new HtmlWebpackPlugin({
            filename: '../views/layout.ejs',
            hash: true,
            chunks: ['vendor', 'app'],
            template: path.resolve(__dirname, 'backend/views/layout.ejs')
        }),

        new webpack.optimize.CommonsChunkPlugin("vendor")
    ];
    if (isProd) {
        plugins.push(new ExtractTextPlugin({
            filename: "css/[name].css",
            disable: false,
            allChunks: true
        }));
        plugins.push(new HtmlPluginRemove(/<script.*?src="\/build\/.*?\.js".*?<\/script>/gi));
    } else {
        plugins.push(new webpack.NamedModulesPlugin());
        plugins.push(new webpack.HotModuleReplacementPlugin());
    }
    return plugins;
}

module.exports = {
    devtool: 'eval',
    entry: getEntries({
        app: path.resolve(__dirname, 'frontend/app.ts'),
        vendor: ['angular', 'angular-material', 'angular-material/angular-material.scss']
    }),
    output: {
        path: path.resolve(__dirname, 'dist/public'),
        filename: '[name].bundle.js',
        publicPath: isProd ? '/' : '/build/'
    },
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [

            {
                test: /\.sass|\.css|\.scss/,
                use: cssConfig
            },
            {
                test: /.*\.ts$/,
                use: [
                    {
                        loader: 'ng-annotate-loader',
                        options: {
                            add: true,
                            map: false,
                        }
                    },
                    {
                        loader: 'ts-loader'
                    }
                ]
            },
            {
                test: /\.ejs$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        minimize: false
                    }
                }
            },
            {
                test: /\.html$/,
                loader: 'raw-loader'
            },
            {
                test: /\.(woff2?|svg)$/,
                loader: require.resolve('url-loader') + '?limit=5000&name=fonts/[name].[ext]&publicPath=../'
            },
            {test: /\.(ttf|eot)$/, loader: require.resolve('file-loader') + '?name=fonts/[name].[ext]&publicPath=../'}
        ]
    },
    plugins: getPlugins()
};
