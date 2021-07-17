import { apiWrapper } from "modules/apiWrapper"
import { Cart_DeleteItem } from "modules/cart/delete-item"
import { parseCookies } from 'nookies'
export default apiWrapper(
  Cart_DeleteItem.contract.method,
  async (req, res) => {
    const { accessToken } = parseCookies({ req });
    const cart = await fetch(`${process.env.API_URL}/carts/remove`, {
      method: 'post',
      body: JSON.stringify(req.body),
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