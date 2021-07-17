import { Tag } from 'antd'

export default function Status({ status: value }) {
  let status;
  switch (value) {
    case 'waiting-for-payment':
      status = <Tag color='warning'>Waiting for payment</Tag>
      break;
    case 'paid':
      status = <Tag color='success'>Paid</Tag>
      break;
    case 'in-process':
      status = <Tag color='blue'>In process</Tag>
      break;
    case 'done':
      status = <Tag color='success'>Done</Tag>
      break;
    default:
      break;
  }
  return status
}

