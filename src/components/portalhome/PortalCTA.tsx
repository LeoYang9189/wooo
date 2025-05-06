import React from 'react';
import { Button } from '@arco-design/web-react';
import { IconRight } from '@arco-design/web-react/icon';
import { useNavigate } from 'react-router-dom';

const PortalCTA: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto bg-gradient-to-r from-blue-600 to-blue-400 rounded-3xl p-12 relative overflow-hidden shadow-xl portal-shadow portal-wave">
          {/* 背景装饰 */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white opacity-10 rounded-full -ml-32 -mb-32"></div>
          </div>
          
          <div className="relative z-10 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">准备体验超级运价企业管理系统？</h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
              立即登录系统，开启高效的物流运价管理体验
            </p>
            
            <div className="flex flex-wrap gap-6 justify-center">
              <Button 
                type="primary" 
                size="large" 
                icon={<IconRight />}
                className="portal-button portal-button-primary h-12 px-8 bg-white text-blue-600 border-0 font-medium text-base hover:bg-blue-50"
                onClick={() => navigate('/saas-system')}
              >
                注册/登录
              </Button>
              <Button 
                size="large" 
                className="portal-button portal-button-outline h-12 px-8 border-white text-white hover:bg-blue-700 hover:border-blue-700 text-base"
              >
                联系我们
              </Button>
            </div>

            <div className="mt-8 text-blue-100">
              <p>已有账号？直接登录体验完整功能</p>
            </div>
          </div>
        </div>

        <div className="mt-20 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">常见问题</h3>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="p-6 bg-gray-50 rounded-xl">
              <h4 className="font-semibold text-gray-900 mb-2">如何访问超级运价系统？</h4>
              <p className="text-gray-600">您可以通过企业门户网站登录页面，输入管理员提供的账号和密码来访问系统。</p>
            </div>
            
            <div className="p-6 bg-gray-50 rounded-xl">
              <h4 className="font-semibold text-gray-900 mb-2">忘记密码怎么办？</h4>
              <p className="text-gray-600">在登录页面点击"忘记密码"，按照提示操作即可重置密码。或联系系统管理员重置您的密码。</p>
            </div>
            
            <div className="p-6 bg-gray-50 rounded-xl">
              <h4 className="font-semibold text-gray-900 mb-2">系统适用于哪些浏览器？</h4>
              <p className="text-gray-600">我们推荐使用Chrome、Edge、Firefox等现代浏览器，以获得最佳使用体验。</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortalCTA; 