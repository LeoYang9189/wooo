import React from 'react';
import { Button, Space } from '@arco-design/web-react';

const PortalCTA: React.FC = () => {
  return (
    <div className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* CTA 区域 */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-6">
            开启您的数字化物流管控之旅
          </h2>
          <p className="text-xl mb-8 opacity-90">
            立即体验控制塔系统，感受智能化物流管理的强大功能
          </p>
          <Space size="large">
            <Button 
              size="large"
              className="h-14 px-8 bg-white text-blue-600 border-0 rounded-full font-semibold hover:bg-gray-100"
            >
              申请试用
            </Button>
            <Button 
              size="large"
              className="h-14 px-8 border-2 border-white text-white rounded-full hover:bg-white hover:text-blue-600 font-semibold"
            >
              联系我们
            </Button>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default PortalCTA; 