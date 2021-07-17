import { apiWrapper } from 'modules/apiWrapper'
import { withSession } from 'lib/session'
import { Upload__CircleAvatarContract } from 'modules/upload/upload-circle-avatar'

export default withSession(apiWrapper(
  Upload__CircleAvatarContract.contract.method,
  async (req, res) => {
    const user = req.session.get('karen-user-data');
    const upload = await fetch(`${process.env.API_URL}/upload`, {
      method: 'post',
      body: req.body,
      headers: {
        ["Authorization"]: `Bearer ${user.jwt}`
      }
    }).then(res => res.json()).catch(err => err)
    if(upload.statusCode >= 400){
      throw new Error(upload.message)
    } else {
      return {
        upload
      }
    }
  }
))