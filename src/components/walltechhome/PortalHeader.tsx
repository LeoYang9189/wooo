import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Dropdown, Menu, Avatar } from '@arco-design/web-react';
import { IconHome, IconMenu, IconClose, IconUser, IconSettings, IconPoweroff } from '@arco-design/web-react/icon';
import { useUser } from './UserContext';

const PortalHeader: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, isLoggedIn, logout } = useUser();

  const handleGoHome = () => {
    window.open('https://zh.etowertech.com/', '_blank');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/walltech');
  };

  const handleMenuClick = (key: string) => {
    switch (key) {
      case 'profile':
        navigate('/controltower-client#profile');
        break;
      case 'company':
        navigate('/controltower-client#company');
        break;
      case 'logout':
        handleLogout();
        break;
    }
  };

  // 用户下拉菜单
  const userDropdownMenu = (
    <Menu onClickMenuItem={handleMenuClick}>
      <Menu.Item key="profile">
        <IconUser className="mr-2" />
        个人中心
      </Menu.Item>
      <Menu.Item key="company">
        <IconSettings className="mr-2" />
        企业信息
      </Menu.Item>
      <Menu.Item key="divider" disabled style={{ height: '1px', padding: 0, margin: '4px 0', backgroundColor: '#f0f0f0' }} />
      <Menu.Item key="logout">
        <IconPoweroff className="mr-2" />
        退出登录
      </Menu.Item>
    </Menu>
  );

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo + 回到首页 */}
        <div className="flex items-center space-x-6">
          <img 
            src="/assets/WX20250627-182147@2x.png" 
            alt="WallTech" 
            className="h-12 w-auto"
          />
          <button 
            className="hidden md:flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
            onClick={handleGoHome}
          >
            <IconHome className="text-lg" />
            <span className="font-medium">回到首页</span>
          </button>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center">
          {/* 用户认证区域 */}
          {isLoggedIn && user ? (
            <Dropdown droplist={userDropdownMenu} trigger="click" position="bottom">
              <div className="flex items-center space-x-2 cursor-pointer px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                <Avatar size={32} style={{ backgroundColor: '#3B82F6' }}>
                  {user.username.charAt(0).toUpperCase()}
                </Avatar>
                <span className="text-gray-700 font-medium">{user.username}</span>
              </div>
            </Dropdown>
          ) : (
            <Button 
              type="primary" 
              className="bg-gradient-to-r from-blue-600 to-blue-400 border-0"
              onClick={() => navigate('/portal/auth')}
            >
              注册/登录
            </Button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-gray-700">
            {isMenuOpen ? <IconClose /> : <IconMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="block md:hidden bg-white border-t border-gray-100 py-4">
          <div className="container mx-auto px-4 flex flex-col space-y-3">
            {/* Mobile User Section */}
            {isLoggedIn && user ? (
              <div className="space-y-3">
                <div className="flex items-center space-x-3 py-2">
                  <Avatar size={32} style={{ backgroundColor: '#3B82F6' }}>
                    {user.username.charAt(0).toUpperCase()}
                  </Avatar>
                  <span className="text-gray-700 font-medium">{user.username}</span>
                </div>
                <button 
                  className="w-full text-left text-gray-700 hover:text-blue-600 py-2 font-medium flex items-center"
                  onClick={() => {
                    toggleMenu();
                    navigate('/controltower-client#profile');
                  }}
                >
                  <IconUser className="mr-2" />
                  个人中心
                </button>
                <button 
                  className="w-full text-left text-gray-700 hover:text-blue-600 py-2 font-medium flex items-center"
                  onClick={() => {
                    toggleMenu();
                    navigate('/controltower-client#company');
                  }}
                >
                  <IconSettings className="mr-2" />
                  企业信息
                </button>
                <button 
                  className="w-full text-left text-red-600 hover:text-red-700 py-2 font-medium flex items-center"
                  onClick={() => {
                    toggleMenu();
                    handleLogout();
                  }}
                >
                  <IconPoweroff className="mr-2" />
                  退出登录
                </button>
              </div>
            ) : (
              <Button 
                type="primary" 
                className="bg-gradient-to-r from-blue-600 to-blue-400 border-0"
                onClick={() => {
                  toggleMenu();
                  navigate('/portal/auth');
                }}
              >
                注册/登录
              </Button>
            )}
            
            {/* 回到首页按钮 */}
            <button 
              className="w-full text-left text-gray-700 hover:text-blue-600 py-2 font-medium flex items-center"
              onClick={() => {
                toggleMenu();
                handleGoHome();
              }}
            >
              <IconHome className="mr-2" />
              回到首页
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default PortalHeader; 