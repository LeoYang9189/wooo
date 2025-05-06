import React from 'react';
import { 
  IconDashboard, 
  IconFile, 
  IconStorage, 
  IconSettings, 
  IconRobot, 
  IconMessage 
} from '@arco-design/web-react/icon';

const PortalFeatures: React.FC = () => {
  const features = [
    {
      icon: <IconDashboard className="text-blue-500 text-4xl" />,
      title: '直观的控制面板',
      description: '一目了然的数据展示，帮助您快速了解业务运营状况和关键指标。'
    },
    {
      icon: <IconFile className="text-blue-500 text-4xl" />,
      title: '运价管理',
      description: '高效管理海运整箱、拼箱和空运运价，轻松应对市场变化。'
    },
    {
      icon: <IconStorage className="text-blue-500 text-4xl" />,
      title: '询价报价一体化',
      description: '完整的询价报价流程，提高报价效率，减少人为错误。'
    },
    {
      icon: <IconRobot className="text-blue-500 text-4xl" />,
      title: 'AI智能识别',
      description: '自动识别合约文件并提取关键信息，大幅节省数据录入时间。'
    },
    {
      icon: <IconSettings className="text-blue-500 text-4xl" />,
      title: '灵活的配置选项',
      description: '根据企业需求自定义系统设置，满足不同规模企业的需求。'
    },
    {
      icon: <IconMessage className="text-blue-500 text-4xl" />,
      title: '团队协作',
      description: '内置消息和通知系统，促进团队成员之间的有效沟通和协作。'
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">系统功能特点</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            超级运价系统为您提供全方位的功能，满足企业内部管理需求
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="mb-5 w-16 h-16 flex items-center justify-center bg-blue-50 rounded-2xl">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-block px-6 py-3 bg-blue-50 rounded-full">
            <span className="text-blue-600 font-medium">了解我们的完整功能，请联系销售团队</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortalFeatures; 