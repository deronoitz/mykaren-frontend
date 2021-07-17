import { useState } from 'react';
import { useRouter } from "next/router"
import { Menu, Button, Badge } from 'antd';
import Link from "next/link"
import _ from "lodash"
import AddCircleModal from '../AddCircle/AddCircle'
import { RocketFilled } from '@ant-design/icons'

function Sidemenu(props) {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false)
  const { data, noAction } = props
  const { asPath } = router;
  let active = data.map(i => i.menu.filter(n => asPath.startsWith(n.link)))
  console.log(active)
  active = active[1]?.length == 0 || !active[1] ? active[0] : active[1] || []
  // const active = _.filter(data[0].menu, i => asPath.startsWith(i.link))
  // const active = _.filter(data[0].menu, i => i.link === asPath)
  return (
    <div className="sideMenu">
      <style jsx>
        {`
        .sideMenu {
          max-width: 234px;
          width: 100%;
        }
        .headMenu {
          font-size: 12px;
          line-height: 18px;
          letter-spacing: 0.275em;
        }
      `}
      </style>
      {
        !noAction &&
        <>
          <AddCircleModal visible={modalVisible} onCancel={() => setModalVisible(false)} />
          <Button onClick={() => setModalVisible(true)} style={{ marginBottom: 15, height: 44, width: '80%' }} type="default" icon={<RocketFilled />} block>
            Add a booth
          </Button>
        </>
      }
      <Menu
        mode="inline"
        selectedKeys={active[0] ? active[0].title : []}
        style={{
          background: 'none',
          width: '80%',
          position: 'sticky',
          top: 80,
          // marginLeft: -16,
          borderRight: 'none',
          // width: 'calc(100% + 16px)'
        }}
      >
        {
          (data || []).map(group => (
            <Menu.ItemGroup style={{ marginBottom: 10 }} key={group.title} title={<span className="headMenu">{group.title}</span>}>
              {
                (group.menu || []).map((item, index) => (
                  <Menu.Item
                    style={{ margin: 0 }}
                    key={item.title}
                    icon={item.icon}
                  >
                    <Link href={item.link}>
                      {item.title}
                    </Link>
                    { item.count && <Badge count={item.count} style={{ marginLeft: 10 }} />}

                  </Menu.Item>
                ))
              }
            </Menu.ItemGroup>
          ))
        }
      </Menu>
    </div>
  )
}

export default Sidemenu