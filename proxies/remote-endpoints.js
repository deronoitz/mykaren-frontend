const BASE = process.env.API_URL;

const ENDPOINTS = {
  login: "/auth/local",
  checkUser: "/auth/check/user",
  register: "/auth/local/register",

  carts: "/carts",
  cartRemove: "/carts/remove",

  circles: "/circles",
  categoryCircle: "/category-circles",

  inviteCodes: "/invite-codes",
  sendActivation: "/invite-codes/send-invition",

  products: "/product-circles",
  categoryProduct: "/category-products",

  transactions: "/transactions",

  upload: "/upload"
};

const REMOTE_ENDPOINTS = {
  login: BASE + "/auth/local",
  checkUser: BASE + "/auth/check/user",
  register: BASE + "/auth/local/register",

  carts: BASE + "/carts",
  cartRemove: BASE + "/carts/remove",

  circles: BASE + "/circles",
  categoryCircle: BASE + "/category-circles",

  inviteCodes: BASE + "/invite-codes",
  sendActivation: BASE + "/invite-codes/send-invition",

  products: BASE + "/product-circles",
  categoryProduct: BASE + "/category-products",

  transactions: BASE + "/transactions",

  upload: BASE + "/upload"
};

module.exports = {
  ENDPOINTS,
  REMOTE_ENDPOINTS
};
