import { apiWrapper } from "modules/apiWrapper"
import { Product__GetProduct } from "modules/product/get-product"
import { parseCookies } from 'nookies'

export default apiWrapper(
  Product__GetProduct.contract.method,
  async (req, res) => {
    const { accessToken } = parseCookies({ req });
    const { circle } = req.query
    const product = await fetch(`${process.env.API_URL}/product-circles?circle=${circle}`, {
      method: 'get',
      headers: {
        ['Authorization']: `Bearer ${accessToken}`
      }
    }).then(res => res.json()).catch(err => err)
    if (product.statusCode >= 400) {
      throw new Error(product.message)
    } else {
      return product
    }
  }
)