const { ENDPOINTS, REMOTE_ENDPOINTS } = require("./remote-endpoints");

const proxyList = [
  {
    source: "/api" + ENDPOINTS.login,
    destination: REMOTE_ENDPOINTS.login
  },
  {
    source: "/api" + ENDPOINTS.checkUser,
    destination: REMOTE_ENDPOINTS.checkUser
  },
  {
    source: "/api" + ENDPOINTS.register,
    destination: REMOTE_ENDPOINTS.register
  },

  {
    source: "/api" + ENDPOINTS.carts,
    destination: REMOTE_ENDPOINTS.carts
  },
  {
    source: "/api" + ENDPOINTS.cartRemove,
    destination: REMOTE_ENDPOINTS.cartRemove
  },

  {
    source: "/api" + ENDPOINTS.circles,
    destination: REMOTE_ENDPOINTS.circles
  },
  {
    source: "/api" + ENDPOINTS.categoryCircle,
    destination: REMOTE_ENDPOINTS.categoryCircle
  },

  {
    source: "/api" + ENDPOINTS.inviteCodes,
    destination: REMOTE_ENDPOINTS.inviteCodes
  },
  {
    source: "/api" + ENDPOINTS.sendActivation,
    destination: REMOTE_ENDPOINTS.sendActivation
  },

  {
    source: "/api" + ENDPOINTS.products,
    destination: REMOTE_ENDPOINTS.products
  },
  {
    source: "/api" + ENDPOINTS.categoryProduct,
    destination: REMOTE_ENDPOINTS.categoryProduct
  },

  {
    source: "/api" + ENDPOINTS.transactions,
    destination: REMOTE_ENDPOINTS.transactions
  },

  {
    source: "/api" + ENDPOINTS.upload,
    destination: REMOTE_ENDPOINTS.upload
  }
];

module.exports = proxyList;
