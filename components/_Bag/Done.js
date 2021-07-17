import { Typography, Button, Upload, message } from 'antd'
import { UploadOutlined } from '@ant-design/icons';
import Context from 'hooks/bag'
import { parseCookies } from 'nookies'
const { Title, Text } = Typography

const uploadProps = {
  name: 'files',
  action: process.env.NEXT_PUBLIC_API_URL + '/upload',
  headers: {
    'Access-Control-Allow-Origin': '*',
    authorization: `Bearer ${parseCookies().accessToken}`,
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

export default function Done() {
  const { data } = Context.useContainer()
  return (
    <div>
      <style jsx>
        {`
          .info td {
            padding: 5px 0
          }
          .separator {
            height: 1px;
            width: 100%;
            background: #e8e8e8;
            margin: 30px 0;
          }
          .account-wrapper {
            padding: 30px 48px;
            background:  #fafafa;
            border-radius: 16px;
            margin-top: 30px;
          }
          .account-wrapper img {
            mix-blend-mode: multiply
          }
        `}
      </style>
      <Title level={2}>Done</Title>
      <Text style={{ fontSize: 16, fontWeight: 500, color: 'var(--titleColor)', display: 'block', marginTop: 20, marginBottom: 8 }}>Finish your transaction</Text>
      <Text>Please transfer with this following amount to finish the transaction</Text>
      <div style={{ margin: '20px 0 10px' }}>
        <table className='info'>
          <tbody>
            <tr>
              <td style={{ width: 140 }}>Sub-total</td>
              <td>
                <Text style={{ fontWeight: 500, color: 'var(--titleColor' }}>Rp. {new Intl.NumberFormat(['ban', 'id']).format(data?.total)}</Text>
              </td>
            </tr>
            <tr>
              <td>Unique Code*</td>
              <td style={{ textAlign: 'right' }}>
                <Text style={{ fontWeight: 500, color: 'var(--titleColor' }}>{data?.uniqueCode}</Text>
              </td>
            </tr>
            <tr>
              <td><Text style={{ fontWeight: 500, color: 'var(--titleColor)' }}>Total Amount</Text></td>
              <td>
                <Text style={{ fontWeight: 500, color: 'var(--titleColor' }}>Rp. {new Intl.NumberFormat(['ban', 'id']).format(data?.total + data?.uniqueCode)}</Text>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <Text style={{ fontSize: 12 }}>*Unique code is needed to makes system verification easier and faster.</Text>
      {/* <div style={{ marginTop: 20 }}>
        <Button type='primary' ghost>Download Invoice</Button>
      </div> */}
      <div className='separator' />

      <Text style={{ fontSize: 16, fontWeight: 500, color: 'var(--titleColor)', display: 'block', marginTop: 20, marginBottom: 8 }}>Transfer to this bank account</Text>
      <div className='account-wrapper f mdl'>
        <img src='/images/bank/bni-big.jpg' style={{ marginRight: 56 }} />
        <div className='f f-c'>
          <Text style={{ color: 'var(--titleColor)', display: 'block', marginBottom: 10 }}>A/N <span style={{ fontWeight: 500 }}>Budi Kopling</span></Text>
          <Text>Account Number</Text>
          <Text style={{ fontWeight: 500, color: 'var(--titleColor)', fontSize: 16 }}>290923840</Text>
        </div>
      </div>

      <div className='separator' />
      <Text style={{ fontSize: 16, fontWeight: 500, color: 'var(--titleColor)', display: 'block', marginTop: 20, marginBottom: 8 }}>
        Upload proof of transfer
        <Text style={{ fontSize: 12, marginLeft: 10, color: 'var(--contentColor)', fontWeight: 400 }}>Max.  2MB with format JPG, PNG, or PDF</Text>
      </Text>

      <div className='f mdl' style={{ marginTop: 26 }}>
        <Upload {...uploadProps}>
          <Button type='primary' icon={<UploadOutlined />}>Choose file</Button>
        </Upload>
      </div>
    </div>
  )
}