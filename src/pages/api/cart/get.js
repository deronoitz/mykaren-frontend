import { apiWrapper } from "modules/apiWrapper"
import { Cart_GetCart } from "modules/cart/get-cart"
import { parseCookies } from 'nookies'
import qs from 'query-string'
export default apiWrapper(
  Cart_GetCart.contract.method,
  async (req, res) => {
    const { accessToken } = parseCookies({ req });
    const query = '?' + qs.stringify(req.query)
    const cart = await fetch(`${process.env.API_URL}/carts${query}`, {
      method: 'get',
      headers: {
        ['Authorization']: `Bearer ${accessToken}`
      }
    }).then(res => res.json()).catch(err => err)
    if (cart.statusCode >= 400) {
      throw new Error(cart.message)
    } else {
      return cart
    }
  }
)