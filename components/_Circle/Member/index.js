import {
  Avatar,
  Typography,
  Dropdown,
  Menu,
  Button,
  Table,
  Tag,
  Badge
} from "antd"
import Banner from '../Banner/Member'
import InviteModal from './InviteModal'
import { Circle__GetMember } from 'modules/circle/get-member'
import { useState } from 'react'
import {
  UserOutlined,
  PlusOutlined,
  InfoCircleFilled,
  MoreOutlined
} from "@ant-design/icons"
import { useRouter } from 'next/router'
const { Title, Text } = Typography

let initial = (data) => data.firstName?.split("")[0] + data.lastName?.split("")[0] || ""

const memberMenu = (
  <Menu>
    <Menu.Item>Detail</Menu.Item>
    <Menu.Item danger>Kick</Menu.Item>
  </Menu>
)

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text, record) => {
      return (
        <div className="f mdl">
          <Avatar style={{ marginRight: 30 }} size={40}>{initial(record)}</Avatar>
          <div>
            <Text style={{ display: "block", color: "var(--titleColor)", fontWeight: 500 }}>{record.firstName + ' ' + record.lastName}</Text>
            <Text style={{ fontSize: 12, color: "var(--contentColor)" }}>{record.user.email}</Text>
          </div>
        </div>
      )
    },
  },
  {
    title: 'Role',
    dataIndex: 'role',
    key: 'role',
    render: (tags, record) => (
      <>
        <Tag color='#8C62E4'>Member</Tag>
        {/* {tags.map(tag => {
          let color = tag.length > 5 ? '#8C62E4' : '#20CAEF';
          if (tag === 'Manager') {
            color = '#F72963';
          }
          return (
            <Tag color={color} key={tag}>
              {tag}
            </Tag>
          );
        })} */}
      </>
    ),
  },
  // {
  //   title: 'Last Active',
  //   dataIndex: 'lastactive',
  //   key: 'lastactive',
  //   render: text => text === "Online" ? <Text style={{ color: "#79d823" }}>{text}</Text> : text
  // },
  {
    title: <Badge offset={[15, 7]} count={<InfoCircleFilled style={{ color: "#20CAEF" }} />}>Reputation</Badge>,
    key: 'reputation',
    dataIndex: 'reputation',
    render: () => '0 EXP'
  },
  {
    title: '',
    key: 'action',
    dataIndex: 'action',
    render: (text, record) => (
      <Dropdown overlay={memberMenu} placement="bottomRight" overlayStyle={{ width: 120 }}>
        <MoreOutlined style={{ fontSize: 16 }} />
      </Dropdown>
    ),
  },
];


export default function Member() {
  const [inviteVisible, setInviteVisible] = useState(false)
  const router = useRouter()
  const memberSWR = router.query && Circle__GetMember.swr(`?circle=${router?.query?.id}`, { refreshInterval: null})
  const members = memberSWR.data?.data || []
  let circleSize = () => {
    const count = members.length
    if(count < 5){
      return 'Small Circle'
    } else if (count < 10 && count >= 5){
      return 'Medium Circle'
    } else if (count >= 10){
      return 'Big Circle'
    }
  }
  return (
    <div>
      <style jsx>
        {`
          .wrapper {
            background: #fff;
            padding: 26px 38px 60px;
            border-radius: 16px;
            box-shadow: 5px 5px 30px rgba(0,0,0,.1);
            margin-top: 15px;
            min-height: 60vh;
          }
        `}
      </style>

      <Banner />

      <div className="wrapper">
        <div className="f mdl f-btw" style={{ marginBottom: 20 }}>
          <div>
            <Title level={4} style={{ margin: 0 }}>Circle Member</Title>
            <Text style={{ fontSize: 12 }}>{members.length || 0} Member - <span style={{ color: "var(--primaryColor)" }}>{circleSize()}</span></Text>
          </div>
          <Button type="primary" ghost onClick={() => setInviteVisible(true)}>
            <PlusOutlined />
            Invite Member
          </Button>
        </div>
        <Table pagination={false} columns={columns} dataSource={members} />
      </div>
      <InviteModal visible={inviteVisible} close={() => setInviteVisible(false)}/>
    </div>
  )
}