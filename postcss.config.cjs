// import postcssPresetEnv from 'postcss-preset-env'
const postcssPresetEnv = require('postcss-preset-env')

const config = {
  plugins: [
    postcssPresetEnv({
      autoprefixer: true,
      features: {
        'nesting-rules': true,
        'custom-media-queries': true,
        'media-query-ranges': true
      }
    })
  ]
}

module.exports = config
