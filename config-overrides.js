const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd-mobile',
    style: true,
  }),
 addLessLoader({
   javascriptEnabled: true,
   modifyVars: { '@brand-primary': '#1DA57A','@brand-primary-tap': '#1D757A'},
 }),
);