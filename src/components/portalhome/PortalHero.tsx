import React from 'react';
import { Button } from '@arco-design/web-react';
import { useNavigate } from 'react-router-dom';

const PortalHero: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <section className="relative bg-white overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/2 w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2">
          <div className="w-full h-full rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 opacity-80"></div>
        </div>
        <div className="absolute top-1/4 right-0 w-[300px] h-[300px] -translate-y-1/2 translate-x-1/3">
          <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 opacity-50"></div>
        </div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] translate-y-1/3 -translate-x-1/4">
          <div className="w-full h-full rounded-full bg-gradient-to-tr from-blue-100 to-indigo-50 opacity-60"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 pt-32 pb-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="portal-animate-fade-in">
            <div className="mb-6">
              <span className="inline-block py-1 px-3 bg-blue-50 text-blue-600 font-medium rounded-full text-sm">企业门户</span>
            </div>
            <h1 className="portal-heading portal-heading-xl text-gray-900 leading-tight mb-6">
              Your LOGO<br />
              <span className="portal-gradient-text">企业物流管理系统</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-lg">
              针对企业内部员工的完整物流管理解决方案，轻松管理运价、询价、合约等业务流程。
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                type="primary" 
                size="large" 
                className="h-12 px-8 bg-gradient-to-r from-blue-600 to-blue-400 border-0 text-base"
                onClick={() => navigate('/saas-system')}
              >
                进入系统
              </Button>
              <Button size="large" className="h-12 px-8 text-base">
                了解更多
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative z-front bg-white p-4 rounded-xl shadow-2xl portal-shadow">
              <div className="aspect-ratio aspect-ratio-16/9 rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1586880244406-8b640d5c7d0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80" 
                  alt="超级运价系统界面"
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="mt-4 p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex">
                    <div className="bg-blue-600 w-3 h-3 rounded-full mr-2"></div>
                    <div className="bg-green-500 w-3 h-3 rounded-full mr-2"></div>
                    <div className="bg-yellow-500 w-3 h-3 rounded-full"></div>
                  </div>
                  <div className="text-sm text-gray-500">超级运价 v2.0</div>
                </div>
                
                {/* 模拟系统界面的装饰元素 */}
                <div className="grid grid-cols-4 gap-2 mb-3">
                  <div className="h-8 bg-gray-100 rounded"></div>
                  <div className="h-8 bg-gray-100 rounded"></div>
                  <div className="h-8 bg-gray-100 rounded"></div>
                  <div className="h-8 bg-blue-100 rounded"></div>
                </div>
                <div className="grid grid-cols-6 gap-2 mb-3">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-4 bg-gray-100 rounded"></div>
                  ))}
                </div>
                <div className="grid grid-cols-1 gap-2 mb-3">
                  <div className="h-16 bg-blue-50 rounded flex items-center justify-center">
                    <div className="w-16 h-6 bg-blue-500 rounded-full"></div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="h-12 bg-gray-100 rounded"></div>
                  <div className="h-12 bg-gray-100 rounded"></div>
                  <div className="h-12 bg-blue-100 rounded"></div>
                </div>
              </div>
            </div>
            
            {/* 装饰元素 */}
            <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4">
              <div className="w-16 h-16 bg-yellow-400 rounded-lg transform rotate-12 shadow-lg"></div>
            </div>
            <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4">
              <div className="w-20 h-20 bg-blue-500 rounded-full shadow-lg opacity-80"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortalHero; 