exports.pages = function (env, folder = '') {
  const rootPagesFolderName = 'views'
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  const fs = require('fs')
  const path = require('path')
  const viewsFolder = path.resolve(__dirname, `../src/${rootPagesFolderName}/${folder}`)

  var pages = []

  fs.readdirSync(viewsFolder).forEach(view => {
    if (view.split('.')[1] === undefined)
      return false;

    const viewName = view.split('.')[0];
    const fileName = folder === '' ? `assets/views/${viewName}/index.html` : `assets/views/${folder}/${viewName}/index.html`;
    const options = {
      filename: fileName,
      template: `${rootPagesFolderName}/${folder}/${view}`,
      inject: true
    };

    if (env === 'development') {
      options.minify = {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      };
    }

    pages.push(new HtmlWebpackPlugin(options));
  })

  return pages;
}
