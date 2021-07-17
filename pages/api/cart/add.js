import { apiWrapper } from "modules/apiWrapper"
import { Cart_AddItem } from "modules/cart/add-cart"
import { parseCookies } from 'nookies'
export default apiWrapper(
  Cart_AddItem.contract.method,
  async (req, res) => {
    const { accessToken } = parseCookies({ req });
    console.log(req.body)
    const cart = await fetch(`${process.env.API_URL}/carts`, {
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