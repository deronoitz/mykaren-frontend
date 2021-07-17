import { apiWrapper } from "modules/apiWrapper"
import { Product__GetCatalog } from "modules/product/get-catalog"
import { parseCookies } from 'nookies'
import qs from 'query-string'
export default apiWrapper(
  Product__GetCatalog.contract.method,
  async (req, res) => {
    const { accessToken } = parseCookies({ req });
    const query = '?' + qs.stringify(req.query)
    const product = await fetch(`${process.env.API_URL}/product-circles${query}`, {
      method: 'get'
    }).then(res => res.json()).catch(err => err)
    if (product.statusCode >= 400) {
      throw new Error(product.message)
    } else {
      return product
    }
  }
)