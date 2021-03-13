const { merge } = require('webpack-merge');
const WebpackObfuscator = require('webpack-obfuscator');
const path = require('path');
module.exports = option => {
  return merge(option, {
    plugins: [
      new WebpackObfuscator(
        {
          rotateStringArray: true,
        },
        [path.resolve(__dirname, 'excluded_file_name.js')],
      ),
    ],
  });
};
