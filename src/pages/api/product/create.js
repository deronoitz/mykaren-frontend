import { apiWrapper } from 'modules/apiWrapper'
import { Product__CreateContract } from 'modules/product/create'
import { withSession } from 'lib/session'
import { parseCookies } from 'nookies'

export default withSession(apiWrapper(
  Product__CreateContract.contract.method,
  async (req, res) => {
    const { accessToken } = parseCookies({ req })
    const contentType = req.headers['content-type']
    console.log(contentType)
    const product = await fetch(`${process.env.API_URL}/product-circles`, {
      method: 'post',
      body: req.body,
      headers: {
        ['Content-Type']: contentType,
        ['Authorization']: `Bearer ${accessToken}`
      }
    }).then(res => res.json()).catch(err => err)
  
    // if(product.statusCode >= 400){
    //   throw new Error(product.message)
    // } else {
      return product
    // }
  }
))