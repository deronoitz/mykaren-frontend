import { apiWrapper } from 'modules/apiWrapper'
import { Product__GetCategory } from 'modules/product/get-category'
import { parseCookies } from 'nookies'
export default apiWrapper(
  Product__GetCategory.contract.method,
  async (req, res) => {
    const { accessToken } = parseCookies({ req })
    const category = await fetch(`${process.env.API_URL}/category-products?_sort=name`, {
      headers: {
        ['Authorization']: `Bearer ${accessToken}`
      }
    }).then(res => res.json()).catch(err => err)
    if (category.statusCode >= 400) {
      throw new Error(category.error.message)
    } else {
      return category
    }
  }
)