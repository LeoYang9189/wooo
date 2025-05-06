import React, { useState } from 'react';
import { Layout, Menu, Button, Avatar, Dropdown, Space, Typography, Breadcrumb } from '@arco-design/web-react';
import { useNavigate } from 'react-router-dom';
import '@arco-design/web-react/dist/css/arco.css';

// 导入Arco Design图标
import {
  IconDashboard,
  IconSettings,
  IconUser,
  IconMessage,
  IconNotification,
  IconDown,
  IconMenuFold,
  IconMenuUnfold,
  IconFile,
  IconStorage,
  IconNav
} from '@arco-design/web-react/icon';

const { Header, Footer, Sider, Content } = Layout;
const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;
const { Text, Title } = Typography;

const SaasSystem: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const handleMenuItemClick = (key: string) => {
    if (key === '3') {
      navigate('/fcl-rates');
    }
  };

  return (
    <Layout className="h-screen">
      {/* 侧边栏 */}
      <Sider
        theme="light"
        collapsed={collapsed}
        collapsible
        trigger={null}
        breakpoint="md"
        width={220}
        className="border-r border-gray-200"
      >
        <div className="p-4 flex items-center justify-center">
          {!collapsed ? (
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-blue-600 to-blue-400 text-white w-10 h-10 rounded-lg flex items-center justify-center mr-4 relative overflow-hidden shadow-lg">
                <span className="text-xl font-bold">S</span>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-white rounded-tl-lg flex items-center justify-center">
                  <span className="text-xs text-blue-600 font-bold">¥</span>
                </div>
              </div>
              <div>
                <div className="text-lg font-bold text-blue-600 leading-relaxed tracking-wide">超级运价</div>
                <div className="text-xs text-gray-500 mt-0.5 tracking-wider">SUPER FREIGHT</div>
              </div>
            </div>
          ) : (
            <div className="bg-gradient-to-r from-blue-600 to-blue-400 text-white w-10 h-10 rounded-lg flex items-center justify-center relative overflow-hidden shadow-lg">
              <span className="text-xl font-bold">S</span>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-white rounded-tl-lg flex items-center justify-center">
                <span className="text-xs text-blue-600 font-bold">¥</span>
              </div>
            </div>
          )}
        </div>
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ width: '100%' }}
        >
          <MenuItem key="1">
            <IconDashboard />
            <span>控制台</span>
          </MenuItem>
          <MenuItem key="2">
            <IconFile />
            <span>数据分析</span>
          </MenuItem>
          <SubMenu
            key="sub1"
            title={
              <span>
                <IconFile />
                <span>运价管理</span>
              </span>
            }
          >
            <MenuItem key="3" onClick={() => handleMenuItemClick('3')}>海运整箱</MenuItem>
            <MenuItem key="4">海运拼箱</MenuItem>
            <MenuItem key="5">空运运价</MenuItem>
            <MenuItem key="6">整箱附加费</MenuItem>
            <MenuItem key="7">拼箱附加费</MenuItem>
            <MenuItem key="8">空运附加费</MenuItem>
          </SubMenu>
          <SubMenu
            key="sub2"
            title={
              <span>
                <IconStorage />
                <span>询价报价</span>
              </span>
            }
          >
            <MenuItem key="9">询价管理</MenuItem>
            <MenuItem key="10">报价管理</MenuItem>
            <MenuItem key="11">报价审核</MenuItem>
          </SubMenu>
          <SubMenu
            key="sub3"
            title={
              <span>
                <IconFile />
                <span>舱位管理</span>
              </span>
            }
          >
            <MenuItem key="13">舱位查询</MenuItem>
            <MenuItem key="14">舱位预订</MenuItem>
            <MenuItem key="15">舱位统计</MenuItem>
          </SubMenu>
          <SubMenu
            key="sub4"
            title={
              <span>
                <IconStorage />
                <span>基础数据</span>
              </span>
            }
          >
            <MenuItem key="16">船公司管理</MenuItem>
            <MenuItem key="17">港口管理</MenuItem>
            <MenuItem key="18">航线管理</MenuItem>
            <MenuItem key="19">货币管理</MenuItem>
          </SubMenu>
          <MenuItem key="12">
            <IconFile />
            <span>合约管理</span>
          </MenuItem>
          <MenuItem key="13">
            <IconFile />
            <span>客户管理</span>
          </MenuItem>
          <MenuItem key="14">
            <IconSettings />
            <span>系统设置</span>
          </MenuItem>
        </Menu>
      </Sider>

      <Layout>
        {/* 顶部导航 */}
        <Header className="bg-white h-16 border-b border-gray-200 px-6 flex items-center justify-between">
          <div className="flex items-center">
            <Button
              type="text"
              icon={collapsed ? <IconMenuUnfold /> : <IconMenuFold />}
              onClick={toggleCollapse}
              className="mr-4"
            />
            <Breadcrumb>
              <Breadcrumb.Item>首页</Breadcrumb.Item>
              <Breadcrumb.Item>控制台</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className="flex items-center gap-4">
            <Button type="text" icon={<IconMessage />} />
            <Button type="text" icon={<IconNotification />} />
            <Dropdown
              droplist={
                <Menu>
                  <MenuItem key="1">个人信息</MenuItem>
                  <MenuItem key="2">账户设置</MenuItem>
                  <MenuItem key="3">退出登录</MenuItem>
                </Menu>
              }
              position="br"
            >
              <Space className="cursor-pointer">
                <Avatar size={32}>
                  <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="avatar" />
                </Avatar>
                <Text>管理员</Text>
                <IconDown />
              </Space>
            </Dropdown>
          </div>
        </Header>

        {/* 主内容区域 */}
        <Content className="p-6 bg-gray-50 min-h-[calc(100vh-64px)]">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <Title heading={4}>欢迎使用Walltech超级运价系统</Title>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-blue-50 rounded-lg border border-blue-100">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-gray-500 text-sm">待处理询价</div>
                    <div className="mt-2 text-2xl font-bold">26</div>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <IconNav className="text-blue-600 text-xl" />
                  </div>
                </div>
              </div>
              <div className="p-6 bg-green-50 rounded-lg border border-green-100">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-gray-500 text-sm">本月新增客户</div>
                    <div className="mt-2 text-2xl font-bold">128</div>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <IconUser className="text-green-600 text-xl" />
                  </div>
                </div>
              </div>
              <div className="p-6 bg-purple-50 rounded-lg border border-purple-100">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-gray-500 text-sm">运价更新</div>
                    <div className="mt-2 text-2xl font-bold">1,024</div>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <IconFile className="text-purple-600 text-xl" />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <Title heading={5}>快速入口</Title>
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button type="outline" size="large" style={{ height: '100px' }}>
                  <div className="flex flex-col items-center">
                    <IconFile className="text-xl mb-2" />
                    <span>新增运价</span>
                  </div>
                </Button>
                <Button type="outline" size="large" style={{ height: '100px' }}>
                  <div className="flex flex-col items-center">
                    <IconMessage className="text-xl mb-2" />
                    <span>发布询价</span>
                  </div>
                </Button>
                <Button type="outline" size="large" style={{ height: '100px' }}>
                  <div className="flex flex-col items-center">
                    <IconUser className="text-xl mb-2" />
                    <span>添加客户</span>
                  </div>
                </Button>
                <Button type="outline" size="large" style={{ height: '100px' }}>
                  <div className="flex flex-col items-center">
                    <IconFile className="text-xl mb-2" />
                    <span>数据报表</span>
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </Content>

        <Footer className="text-center p-4 text-gray-400 text-sm">
          Walltech SaaS System © {new Date().getFullYear()} Created by Walltech
        </Footer>
      </Layout>
    </Layout>
  );
};

export default SaasSystem; 