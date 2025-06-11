import React, { useState } from 'react';
import { Layout, Menu, Button, Avatar, Badge, Breadcrumb, Dropdown, Divider } from '@arco-design/web-react';
import { 
  IconDashboard, 
  IconList, 
  IconApps, 
  IconUser, 
  IconNotification, 
  IconMenuFold, 
  IconMenuUnfold, 
  IconMessage, 
  IconDown, 
  IconPoweroff, 
  IconSettings as IconSettingsOutline, 
  IconLanguage, 
  IconQuestionCircle,
  IconFile,
  IconStorage,
  IconSettings,
  IconCustomerService
} from '@arco-design/web-react/icon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot, faUsers, faBuilding, faShip, faBullhorn } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useLocation } from 'react-router-dom';
import '../PlatformAdminStyles.css';

const { Header, Sider, Content } = Layout;
const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;

interface BreadcrumbItem {
  title: string;
  path?: string;
}

interface LayoutProps {
  children: React.ReactNode;
}

const PlatformAdminLayout: React.FC<LayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleCollapse = () => setCollapsed(!collapsed);

  // 菜单点击
  const handleMenuItemClick = (key: string) => {
    if (key === 'dashboard') {
      navigate('/platformadmin');
    } else {
      navigate(key === 'dashboard' ? '/platformadmin' : `/platformadmin/${key}`);
    }
  };

  // 根据当前路由生成面包屑
  const getBreadcrumbs = (): BreadcrumbItem[] => {
    const path = location.pathname.replace('/platformadmin/', '');
    const breadcrumbs: BreadcrumbItem[] = [
      { title: '首页', path: '/platformadmin' },
      { title: '平台运营后台', path: '/platformadmin' }
    ];

    const simplePath = path.replace('/', '');
    switch (simplePath) {
      case '':
      case 'dashboard':
        breadcrumbs.push({ title: '控制台', path: '/platformadmin/dashboard' });
        break;
      case 'user-management':
        breadcrumbs.push(
          { title: '客户中心', path: undefined },
          { title: '用户管理', path: '/platformadmin/user-management' }
        );
        break;
      case 'company-management':
        breadcrumbs.push(
          { title: '客户中心', path: undefined },
          { title: '企业管理', path: '/platformadmin/company-management' }
        );
        break;
      case 'carrier-management':
        breadcrumbs.push(
          { title: '运营管理', path: undefined },
          { title: '船东维护', path: '/platformadmin/carrier-management' }
        );
        break;
      case 'announcement-management':
        breadcrumbs.push(
          { title: '运营管理', path: undefined },
          { title: '公告板管理', path: '/platformadmin/announcement-management' }
        );
        break;
      case 'product-center':
        breadcrumbs.push({ title: '产品中心', path: '/platformadmin/product-center' });
        break;
      default:
        break;
    }

    return breadcrumbs;
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
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white w-10 h-10 rounded-lg flex items-center justify-center mr-4 relative overflow-hidden shadow-lg">
                <span className="text-xl font-bold">P</span>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-white rounded-tl-lg flex items-center justify-center">
                  <span className="text-xs text-purple-600 font-bold">A</span>
                </div>
              </div>
              <div>
                <div className="text-lg font-bold text-purple-600 leading-relaxed tracking-wide">平台运营后台</div>
                <div className="text-xs text-gray-500 mt-0.5 tracking-wider">Admin Platform</div>
              </div>
            </div>
          ) : (
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white w-10 h-10 rounded-lg flex items-center justify-center relative overflow-hidden shadow-lg">
              <span className="text-xl font-bold">P</span>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-white rounded-tl-lg flex items-center justify-center">
                <span className="text-xs text-purple-600 font-bold">A</span>
              </div>
            </div>
          )}
        </div>
        <Menu
          selectedKeys={[
            location.pathname.replace('/platformadmin/', '').replace('/', '') || 'dashboard'
          ]}
          onClickMenuItem={handleMenuItemClick}
          style={{ width: '100%' }}
        >
          {/* 控制台 */}
          <MenuItem key="dashboard">
            <IconDashboard />
            <span>控制台</span>
          </MenuItem>
          
          {/* 客户中心 */}
          <SubMenu
            key="customer"
            title={
              <span>
                <FontAwesomeIcon icon={faUsers} className="mr-2" />
                <span>客户中心</span>
              </span>
            }
          >
            <MenuItem key="user-management">用户管理</MenuItem>
            <MenuItem key="company-management">企业管理</MenuItem>
          </SubMenu>
          
          {/* 运营管理 */}
          <SubMenu
            key="operation"
            title={
              <span>
                <IconSettings />
                <span>运营管理</span>
              </span>
            }
          >
            <MenuItem key="carrier-management">
              <FontAwesomeIcon icon={faShip} className="mr-2" />
              <span>船东维护</span>
            </MenuItem>
            <MenuItem key="announcement-management">
              <FontAwesomeIcon icon={faBullhorn} className="mr-2" />
              <span>公告板管理</span>
            </MenuItem>
          </SubMenu>
          
          {/* 产品中心 */}
          <MenuItem key="product-center">
            <IconApps />
            <span>产品中心</span>
          </MenuItem>
        </Menu>
        
        <div className="absolute bottom-20 w-full px-4 flex justify-center">
          <Button 
            type="outline" 
            shape="circle"
            className="flex items-center justify-center ai-assistant-btn shadow-md hover:shadow-lg"
            icon={<FontAwesomeIcon icon={faRobot} className="text-purple-500 text-xl" />}
            style={{ 
              width: '54px', 
              height: '54px', 
              background: 'linear-gradient(135deg, #faf0ff 0%, #f3e8ff 100%)',
              border: '2px solid #c084fc',
              zIndex: 2
            }}
          />
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-medium animate-bounce shadow-sm">
            智能助手
          </div>
        </div>
        <div className="absolute bottom-5 w-full px-4">
          <Button 
            type="primary" 
            long 
            icon={<IconPoweroff />}
            className="flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-600 border-0"
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
            <Breadcrumb>
              {getBreadcrumbs().map((item, index) => (
                <Breadcrumb.Item
                  key={index}
                  onClick={() => item.path && navigate(item.path)}
                  className={item.path ? "cursor-pointer hover:text-purple-500" : "text-purple-600 font-medium"}
                >
                  {item.title}
                </Breadcrumb.Item>
              ))}
            </Breadcrumb>
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
                <Avatar className="bg-purple-500 mr-2"><IconUser /></Avatar>
                <span className="mr-1">平台管理员</span>
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

export default PlatformAdminLayout; 