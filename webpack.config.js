const path = require('path');

module.exports = {
    entry: './src/index.js', // Điểm vào của ứng dụng của bạn
    output: {
        filename: 'bundle.js', // Tên tệp đầu ra
        path: path.resolve(__dirname, 'dist') // Thư mục đầu ra
    },
    module: {
        rules: [
            // Quy tắc biên dịch JavaScript bằng Babel
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            // Quy tắc biên dịch CSS
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            // Các quy tắc khác cho các loại tệp tin khác như hình ảnh, font chữ, vv.
        ]
    },
    resolve: {
        fallback: {
            "constants": require.resolve("constants-browserify")
        }
    }
};