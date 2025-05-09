import React, { useState, ReactNode } from 'react';
import { Layout, Menu, Button, Avatar, Dropdown, Breadcrumb, Badge, Divider } from '@arco-design/web-react';
import { useNavigate } from 'react-router-dom';
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
  IconPoweroff,
  IconSettings as IconSettingsOutline,
  IconLanguage,
  IconQuestionCircle,
  IconExport,
  IconImport,
  IconApps,
  IconCalendar,
  IconLocation,
  IconInfoCircle
} from '@arco-design/web-react/icon';

const { Header, Sider, Content } = Layout;
const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;


interface ContainerSaasLayoutProps {
  children: ReactNode;
  breadcrumb?: ReactNode;
  menuSelectedKey?: string;
}

const ContainerSaasLayout: React.FC<ContainerSaasLayoutProps> = ({ children, breadcrumb, menuSelectedKey }) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  

  const toggleCollapse = () => setCollapsed(!collapsed);

  // 侧边栏菜单点击
  const handleMenuItemClick = (key: string) => {
    if (key === '1') navigate('/container-system');
    // 其他菜单可按需扩展
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
              <div className="bg-gradient-to-r from-green-600 to-teal-400 text-white w-10 h-10 rounded-lg flex items-center justify-center mr-4 relative overflow-hidden shadow-lg">
                <span className="text-xl font-bold">C</span>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-white rounded-tl-lg flex items-center justify-center">
                  <span className="text-xs text-green-600 font-bold">箱</span>
                </div>
              </div>
              <div>
                <div className="text-lg font-bold text-green-600 leading-relaxed tracking-wide">智慧集装箱</div>
                <div className="text-xs text-gray-500 mt-0.5 tracking-wider">CONTAINER SAAS</div>
              </div>
            </div>
          ) : (
            <div className="bg-gradient-to-r from-green-600 to-teal-400 text-white w-10 h-10 rounded-lg flex items-center justify-center relative overflow-hidden shadow-lg">
              <span className="text-xl font-bold">C</span>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-white rounded-tl-lg flex items-center justify-center">
                <span className="text-xs text-green-600 font-bold">箱</span>
              </div>
            </div>
          )}
        </div>
        <Menu
          selectedKeys={[menuSelectedKey || '1']}
          defaultOpenKeys={['sub1']}
          style={{ width: '100%' }}
        >
          <MenuItem key="1" onClick={() => handleMenuItemClick('1')}>
            <IconDashboard />
            <span>控制台</span>
          </MenuItem>
          <MenuItem key="2">
            <IconApps />
            <span>数据概览</span>
          </MenuItem>
          <SubMenu
            key="sub1"
            title={
              <span>
                <IconStorage />
                <span>箱子管理</span>
              </span>
            }
          >
            <MenuItem key="3">箱子库存</MenuItem>
            <MenuItem key="4">箱子位置</MenuItem>
            <MenuItem key="5">箱子状态</MenuItem>
            <MenuItem key="6">返空箱管理</MenuItem>
            <MenuItem key="7">修箱管理</MenuItem>
          </SubMenu>
          <SubMenu
            key="sub2"
            title={
              <span>
                <IconCalendar />
                <span>箱子调度</span>
              </span>
            }
          >
            <MenuItem key="8">调度计划</MenuItem>
            <MenuItem key="9">装箱计划</MenuItem>
            <MenuItem key="10">卸箱计划</MenuItem>
          </SubMenu>
          <SubMenu
            key="sub3"
            title={
              <span>
                <IconLocation />
                <span>轨迹追踪</span>
              </span>
            }
          >
            <MenuItem key="11">实时位置</MenuItem>
            <MenuItem key="12">历史轨迹</MenuItem>
            <MenuItem key="13">异常警报</MenuItem>
          </SubMenu>
          <SubMenu
            key="sub4"
            title={
              <span>
                <IconFile />
                <span>箱务报表</span>
              </span>
            }
          >
            <MenuItem key="14">周转率报表</MenuItem>
            <MenuItem key="15">滞留报表</MenuItem>
            <MenuItem key="16">损坏报表</MenuItem>
            <MenuItem key="17">使用率报表</MenuItem>
          </SubMenu>
          <SubMenu
            key="sub5"
            title={
              <span>
                <IconSettings />
                <span>基础设置</span>
              </span>
            }
          >
            <MenuItem key="18">集装箱类型</MenuItem>
            <MenuItem key="19">仓库管理</MenuItem>
            <MenuItem key="20">场站管理</MenuItem>
            <MenuItem key="21">供应商管理</MenuItem>
          </SubMenu>
          <MenuItem key="22">
            <IconInfoCircle />
            <span>公告管理</span>
          </MenuItem>
        </Menu>
        <div className="absolute bottom-5 w-full px-4">
          <Button 
            type="primary" 
            long 
            icon={<IconPoweroff />}
            className="flex items-center justify-center bg-gradient-to-r from-green-600 to-teal-400 border-0"
            onClick={() => navigate('/portal')}
          >
            返回门户首页
          </Button>
        </div>
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
            {breadcrumb || <Breadcrumb><Breadcrumb.Item>首页</Breadcrumb.Item></Breadcrumb>}
          </div>
          <div className="flex items-center">
            <Badge count={5} dot>
              <Button type="text" style={{ margin: '0 8px' }} icon={<IconNotification />} />
            </Badge>
            <Badge count={3}>
              <Button type="text" style={{ margin: '0 8px' }} icon={<IconMessage />} />
            </Badge>
            <Dropdown
              droplist={
                <Menu>
                  <Menu.Item key="zh-CN">简体中文</Menu.Item>
                  <Menu.Item key="en-US">English</Menu.Item>
                </Menu>
              }
              position="br"
            >
              <Button type="text" icon={<IconLanguage />} style={{ margin: '0 8px' }} />
            </Dropdown>
            <Dropdown
              droplist={
                <Menu>
                  <Menu.Item key="info"><IconUser className="mr-2" />个人信息</Menu.Item>
                  <Menu.Item key="setting"><IconSettingsOutline className="mr-2" />账户设置</Menu.Item>
                  <Menu.Item key="help"><IconQuestionCircle className="mr-2" />帮助中心</Menu.Item>
                  <Divider style={{ margin: '4px 0' }} />
                  <Menu.Item key="logout"><IconPoweroff className="mr-2" />退出登录</Menu.Item>
                </Menu>
              }
              position="br"
            >
              <div className="flex items-center cursor-pointer ml-3">
                <Avatar className="bg-green-500 mr-2"><IconUser /></Avatar>
                <span className="mr-1">管理员</span>
                <IconDown />
              </div>
            </Dropdown>
          </div>
        </Header>
        <Content className="p-6 bg-gray-50 min-h-[calc(100vh-64px)] overflow-auto">
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default ContainerSaasLayout; 