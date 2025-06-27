import React from 'react';
import { IconCloud, IconStar, IconUser } from '@arco-design/web-react/icon';

const PortalTechSpecs: React.FC = () => {
  return (
    <div className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">
            技术优势与特性
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8">
              <IconCloud className="text-5xl text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-4">云原生架构</h3>
              <p className="text-gray-600">
                微服务架构设计，支持弹性扩容，高可用性保障，多环境部署灵活切换
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8">
              <IconStar className="text-5xl text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-4">智能化程度高</h3>
              <p className="text-gray-600">
                深度学习算法，智能决策支持，自动化流程处理，持续优化提升
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8">
              <IconUser className="text-5xl text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-4">协作能力强</h3>
              <p className="text-gray-600">
                多角色协同工作，实时通信机制，流程透明可控，效率显著提升
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortalTechSpecs; 