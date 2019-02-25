const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin"); //生成html文件
module.exports = (env, argv) => ({
    mode: "production",
    entry: './test.js',
    output: {
        path: path.join(__dirname, "build"),
        filename: 'build.js'
    },
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-env",
                            {
                                "plugins": ["@babel/plugin-proposal-class-properties"]
                            } //这句很重要 不然箭头函数出错
                        ],
                    }
                },
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]',
                options: {
                    publicPath: '/'
                }
            },

        ],
    },
    devServer: {
        port: 3100,
        open: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./index.html",
            filename: "index.html"
        })
    ]
})