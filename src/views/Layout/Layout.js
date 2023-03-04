// 快捷键 rfc
// 图标
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  AppstoreOutlined, MailOutlined, SettingOutlined
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React, { useState } from 'react';
const { Header, Sider, Content } = Layout;
import './Layout.scss'
// 顶部导航的数据(菜单项)
const navItems = [
  {
    label: '首页',
    key: 'home',
    icon: <MailOutlined />,
  },
  {
    label: '邮件',
    key: 'mail',
    icon: <AppstoreOutlined />,
    // disabled: true,
  },
  {
    // label: (
    //   <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
    //     Navigation Four - Link
    //   </a>
    // ),
    label: "通知",
    icon: <AppstoreOutlined />,
    key: 'alipay',
  },
  {
    label: '个人中心',
    key: 'self',
    icon: <SettingOutlined />,
    // children: [
    // { 
    children: [
      {
        label: '个人信息',
        key: 'profile',
      },
      {
        label: '修改密码',
        key: 'pass',
      },
      {
        label: '退出系统',
        key: 'exit',
      },
    ],
    // }  
    // {
    //   type: 'group',
    //   label: 'Item 2',
    //   children: [
    //     {
    //       label: 'Option 3',
    //       key: 'setting:3',
    //     },
    //     {
    //       label: 'Option 4',
    //       key: 'setting:4',
    //     },
    //   ],
    // },
    // ],
  },
];
const menuItems = [
  {
    key: '1',
    icon: <UserOutlined />,
    label: '账户管理',
    children: [
      {
        key: '1-1',
        label: '角色管理'
      },
      {
        key: '1-2',
        label: '用户管理'
      }
    ]
  },
  {
    key: '2',
    icon: <VideoCameraOutlined />,
    label: '视频管理',
    children: [
      {
        key: '2-1',
        label: '视频审核'
      },
      {
        key: '2-2',
        label: '视频管理'
      },
      {
        key: '2-3',
        label: '视频数据'
      }
    ]
  },
  {
    key: '3',
    icon: <UploadOutlined />,
    label: 'nav 3',
  },
]
export default function () {
  // 侧边栏折叠状态
  const [collapsed, setCollapsed] = useState(false);
  // 当前选中的Menu的item
  const [current, setCurrent] = useState('home');
  // 顶部导航item点击触发
  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };
  return (
    <Layout className='layout'>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">{collapsed ? 'MAL' : 'MALMAN管理系统'}</div>
        <Menu
          theme="dark"
          mode="inline"
          // 如果这里是defaultSelectKey,则没有点击事件时,点击item也会变样式(哪怕current不是该item)
          selectedKeys={[current]}
          items={menuItems}
          onClick={onClick}
        />
      </Sider>
      <Layout>
        <Header className='header'>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            // 改变折叠状态
            onClick: () => setCollapsed(!collapsed),
          })}
          <Menu className='menu' onClick={onClick} selectedKeys={[current]} mode="horizontal" items={navItems} />
        </Header>
        <Content
          style={{
            margin: '16px 16px',
            padding: 12,
            minHeight: 280,
          }}
        >
          Content
        </Content>
      </Layout>
    </Layout>
  );
};


