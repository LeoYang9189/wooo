import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';

interface NavItem {
  label: string;
  href: string;
  dropdown?: boolean;
}

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const navItems: NavItem[] = [
    { label: '案例与方案', href: '#', dropdown: true },
    { label: '产品功能', href: '#', dropdown: true },
    { label: '合作与支持', href: '#', dropdown: true },
    { label: '飞书', href: '#' },
    { label: '定价', href: '#' }
  ];
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container-custom py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <img src={logoImg} alt="飞书" className="h-8 w-auto" />
          <span className="ml-2 text-xl font-bold text-gray-800">飞书</span>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item, index) => (
            <div key={index} className="relative group">
              <a 
                href={item.href} 
                className="text-gray-700 hover:text-primary flex items-center"
              >
                {item.label}
                {item.dropdown && (
                  <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                )}
              </a>
            </div>
          ))}
        </nav>
        
        {/* Contact & Auth */}
        <div className="hidden md:flex items-center space-x-4">
          <span className="text-gray-700">400-0682-666</span>
          <button className="text-gray-700 hover:text-primary font-medium">登录/注册</button>
          <button className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full hover:bg-gray-200">飞书商务版</button>
          <button className="btn-primary">下载飞书</button>
        </div>
        
        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={toggleMenu}>
          {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white">
          <div className="container-custom py-4 space-y-4">
            {navItems.map((item, index) => (
              <a 
                key={index}
                href={item.href} 
                className="block py-2 text-gray-700 hover:text-primary"
              >
                {item.label}
              </a>
            ))}
            <div className="pt-4 border-t border-gray-100 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">400-0682-666</span>
                <button className="text-gray-700 hover:text-primary font-medium">登录/注册</button>
              </div>
              <div className="flex space-x-2">
                <button className="bg-gray-100 text-gray-700 px-3 py-2 rounded-full hover:bg-gray-200 flex-1">飞书商务版</button>
                <button className="btn-primary flex-1">下载飞书</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header; 