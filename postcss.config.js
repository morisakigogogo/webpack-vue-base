// https://github.com/michael-ciniawsky/postcss-load-config
module.exports = {
  "plugins": {
    "postcss-url": {},
    "postcss-pxtorem": {
      rootValue: 37.5,
      unitPrecision: 5,
      propList: ["width", "height", "font", "font-size", "line-height", "letter-spacing", "bottom", "top", "left", "padding", "margin-bottom", "padding-bottom"],
      selectorBlackList: [],
      replace: true,
      mediaQuery: false,
      minPixelValue: 0
    },
    // to edit target browsers: use "browserslist" field in package.json
    "autoprefixer": {}
  }
}
