const path = require('path');
const zapStyleguideTheme = require('@zapsa/zap-front-doc/zapStyleguideTheme');

const srcPath = path.resolve(__dirname, 'example/src');

module.exports = {
  styleguideDir: 'docs',
  title: '@zapsa/zap-time-picker',
  template: 'styleguide.template.html',
  showCode: false,
  showUsage: true,
  styleguideComponents: {
    Wrapper: path.join(__dirname, 'styleguide/wrapper'),
  },
  ...zapStyleguideTheme,
  sections: [
    {
      name: 'Introduction',
      content: 'styleguide/introduction.md',
    },
    {
      name: 'Usage',
      content: 'styleguide/usage.md',
    },
    {
      name: 'Utilities',
      content: 'styleguide/utilities.md',
    },
    {
      name: 'Components',
      components: 'src/TimePicker.jsx',
    },
  ],
  ignore: ['**/__tests__/**', '**/*.test.{js,jsx,ts,tsx}', '**/*.spec.{js,jsx,ts,tsx}', '**/*.d.ts', '**/index.js'],
  webpackConfig: {
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          include: [
            srcPath,
            path.resolve(__dirname, 'src'),
            path.resolve(__dirname, 'styleguide'),
          ],
          loader: 'babel-loader',
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
        },
        {
          test: /\.scss$/,
          include: [
            srcPath,
            path.resolve(__dirname, 'src/styles'),
            path.resolve(__dirname, 'styleguide'),
          ],
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          loader: 'file-loader?name=src/assets/images/[name].[ext]',
        },
      ],
    },
  },
};
