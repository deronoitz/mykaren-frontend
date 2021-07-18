const withAntdLess = require("next-plugin-antd-less");
const proxyList = require("./proxies/index");

module.exports = withAntdLess({
  lessVarsFilePath: "./src/assets/antd-custom.less",
  publicRuntimeConfig: {
    baseUrl: process.env.API_URL
  },
  async rewrites() {
    return proxyList;
  },
  webpack(config) {
    return config;
  }
});
