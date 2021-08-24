import { ENDPOINTS } from "../../proxies/remote-endpoints";

const PREFIX = "/api";

const API_URL = {
  login: PREFIX + ENDPOINTS.login,
  checkUser: PREFIX + ENDPOINTS.checkUser,
  register: PREFIX + ENDPOINTS.register,

  carts: PREFIX + ENDPOINTS.carts,
  cartRemove: PREFIX + ENDPOINTS.cartremove,

  circles: PREFIX + ENDPOINTS.circles,
  categoryCircle: PREFIX + ENDPOINTS.categoryCircle,

  inviteCodes: PREFIX + ENDPOINTS.inviteCodes,
  sendActivation: PREFIX + ENDPOINTS.sendActivation,

  products: PREFIX + ENDPOINTS.products,
  categoryProduct: PREFIX + ENDPOINTS.categoryProduct,

  transactions: PREFIX + ENDPOINTS.transactions,

  upload: PREFIX + ENDPOINTS.upload
};

export default API_URL;
