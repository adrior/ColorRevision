const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    entry: './src/scripts/index.js',
    mode: 'production',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'scripts/index.js',
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: 'styles/**/*', context: 'src/', force: true },
            { from: 'utils/**/*', context: 'src/', force: true },
            { from: 'src/manifest.json', force: true },
        ]),
    ],
}
