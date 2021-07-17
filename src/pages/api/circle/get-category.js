import { apiWrapper } from 'modules/apiWrapper'
import { Circle__GetCategory } from 'modules/circle/get-category'
import { parseCookies } from 'nookies'
export default apiWrapper(
  Circle__GetCategory.contract.method,
  async (req, res) => {
    const { accessToken } = parseCookies({ req })
    const category = await fetch(`${process.env.API_URL}/category-circles`, {
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