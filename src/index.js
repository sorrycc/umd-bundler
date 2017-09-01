const webpack = require('webpack');
const join = require('path').join;

function getConfig({
  globals,
  name,
  input,
  output,
}) {
  const paths = output.split('/');
  const path = paths.slice(0, -1).join('/');
  const filename = paths.slice(-1)[0];
  const cwd = process.cwd();

  // console.log('Params');
  // console.log(`  - input: ${input}`);
  // console.log(`  - path: ${path}, ${join(cwd, path)}`);
  // console.log(`  - filename: ${filename}`);
  // console.log(`  - name: ${name}`);
  // console.log();

  return {
    entry: input,
    output: {
      path: join(cwd, path),
      filename,
      library: name.split('.'),
      libraryTarget: 'umd',
    },
    externals: {
      react: 'window.React',
      'react-dom': 'window.ReactDOM',
    },
    resolveLoader: {
      modules: [
        join(__dirname, '../node_modules'),
      ],
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            babelrc: false,
            cacheDirectory: false,
            presets: [
              require.resolve('babel-preset-es2015'),
              require.resolve('babel-preset-react'),
              require.resolve('babel-preset-stage-0'),
            ],
            plugins: [
              require.resolve('babel-plugin-add-module-exports'),
              require.resolve('babel-plugin-react-require'),
              require.resolve('babel-plugin-syntax-dynamic-import'),
            ],
          },
        }
      ]
    },
    node: {
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
    },
  };
}

module.exports = function (args) {
  const config = getConfig(args);
  const compiler = webpack(config);
  compiler.run((err, stats) => {
    if (err) {
      console.log(err);
      process.exit(1);
    }
  });
};
