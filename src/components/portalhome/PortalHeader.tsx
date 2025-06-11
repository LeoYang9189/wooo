import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@arco-design/web-react';
import { IconMenu, IconClose } from '@arco-design/web-react/icon';

const PortalHeader: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { label: '首页', href: '/portal' },
    { label: '控制塔', href: '/controltower' },
    { label: '业务介绍', href: '#services' },
    { label: '资讯中心', href: '#news' },
    { label: '关于我们', href: '#about' },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/portal" className="flex items-center">
          <div className="flex items-center">
            <div className="bg-gradient-to-r from-blue-600 to-blue-400 text-white w-10 h-10 rounded-lg flex items-center justify-center mr-3 relative overflow-hidden shadow-lg">
              <span className="text-xl font-bold">Y</span>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-white rounded-tl-lg flex items-center justify-center">
                <span className="text-xs text-blue-600 font-bold">L</span>
              </div>
            </div>
            <div>
              <div className="text-lg font-bold text-gray-800 leading-tight tracking-wide">Your LOGO</div>
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item, index) => (
            <Link 
              key={index}
              to={item.href} 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Login Button (Desktop) */}
        <div className="hidden md:block">
          <Button 
            type="primary" 
            className="bg-gradient-to-r from-blue-600 to-blue-400 border-0"
            onClick={() => navigate('/controltower-client')}
          >
            注册/登录
          </Button>
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
            {navItems.map((item, index) => (
              <Link 
                key={index}
                to={item.href} 
                className="text-gray-700 hover:text-blue-600 py-2 font-medium"
                onClick={toggleMenu}
              >
                {item.label}
              </Link>
            ))}
            <Button 
              type="primary" 
              className="bg-gradient-to-r from-blue-600 to-blue-400 border-0 mt-2"
              onClick={() => navigate('/controltower-client')}
            >
              注册/登录
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default PortalHeader; 