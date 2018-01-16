const homedir = require('os').homedir()
const path = require('path')

module.exports = env => ({
  entry: [
    './src/index.js',
  ],
  output: {
    path: env === 'dev' ? path.resolve(`${homedir}/Library/Containers/com.luckymarmot.Paw/Data/Library/Application Support/com.luckymarmot.Paw/Extensions/io.csilk.PawExtensions.APIBlueprintGenerator`) : __dirname,
    filename: 'APIBlueprintGenerator.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['babel-preset-env', 'stage-3'],
          },
        },
      },
    ],
  },
})
