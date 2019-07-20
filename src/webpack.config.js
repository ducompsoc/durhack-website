// webpack v4

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MergeIntoSingleFilePlugin = require('webpack-merge-and-include-globally');

module.exports = (env, argv) => {
    const entry = {
        main: './assets/js/core.js'
    };

    const output = {
        path: path.resolve(__dirname, 'public/dist'),
        filename: 'app.js'
    };

    const module = {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }, {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader"
                ]
            }
        ]
    };

    console.log(__dirname);

    const plugins = [
        new MiniCssExtractPlugin({
            filename: 'app.css'
        }),
        new MergeIntoSingleFilePlugin({
            files: {
                "vendor.js": [
                    path.resolve(__dirname, './node_modules/particles.js/particles.js'),
                    path.resolve(__dirname, './node_modules/typer-js/typer.min.js')
                ]
            }
        })
    ];

    // Minify CSS if we're building for production
    if (argv.mode === 'production') {
        plugins.push(new OptimizeCssAssetsPlugin());
    }

    return { entry, output, module, plugins };
};
