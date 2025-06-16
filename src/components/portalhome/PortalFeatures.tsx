import React from 'react';
import { 
  IconDashboard, 
  IconFile, 
  IconRobot, 
  IconSearch,
  IconSafe,
  IconCloud
} from '@arco-design/web-react/icon';

const PortalFeatures: React.FC = () => {
  const features = [
    {
      icon: <IconDashboard className="text-white text-3xl" />,
      title: '智能控制面板',
      description: '直观的数据可视化，实时监控业务状况，帮助您做出明智决策。',
      color: 'from-blue-300 to-blue-400',
      bgColor: 'bg-blue-50'
    },
    {
      icon: <IconFile className="text-white text-3xl" />,
      title: '运价管理系统',
      description: '高效管理海运、空运运价，支持批量导入导出，轻松应对市场变化。',
      color: 'from-green-300 to-green-400',
      bgColor: 'bg-green-50'
    },
    {
      icon: <IconSearch className="text-white text-3xl" />,
      title: '询价报价一体化',
      description: '完整的询价报价流程，自动计算利润率，提高报价效率和准确性。',
      color: 'from-purple-300 to-purple-400',
      bgColor: 'bg-purple-50'
    },
    {
      icon: <IconRobot className="text-white text-3xl" />,
      title: 'AI智能助手',
      description: '24/7在线AI助手，自动识别合约文件，智能回答运价查询问题。',
      color: 'from-orange-300 to-orange-400',
      bgColor: 'bg-orange-50'
    },
    {
      icon: <IconCloud className="text-white text-3xl" />,
      title: '云端数据同步',
      description: '多设备数据同步，随时随地访问系统，确保业务连续性。',
      color: 'from-cyan-300 to-cyan-400',
      bgColor: 'bg-cyan-50'
    },
    {
      icon: <IconSafe className="text-white text-3xl" />,
      title: '企业级安全',
      description: '银行级安全保障，数据加密传输存储，完善的权限管理体系。',
      color: 'from-red-300 to-red-400',
      bgColor: 'bg-red-50'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-100 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-purple-100 rounded-full opacity-40 animate-bounce"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-green-100 rounded-full opacity-20 animate-ping"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold text-sm uppercase tracking-wider">
              核心功能
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            系统功能
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">特点</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            智能化物流管理平台，为您的业务提供全方位的功能支持，让工作更高效、更智能
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden ${feature.bgColor} border border-gray-100`}
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              {/* 渐变背景装饰 */}
              <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${feature.color} opacity-10 rounded-bl-full transition-all duration-500 group-hover:scale-110`}></div>
              
              <div className="relative p-8">
                {/* 图标容器 */}
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-6 shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                  {feature.icon}
                </div>
                
                {/* 内容 */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
                
                {/* 悬停时的底部装饰线 */}
                <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${feature.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
              </div>
            </div>
          ))}
        </div>

        {/* 底部行动号召 */}
        <div className="text-center bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              准备体验我们的完整功能了吗？
            </h3>
            <p className="text-gray-600 mb-6">
              立即联系我们的专业团队，获取个性化的系统演示和定制方案
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                立即咨询
              </button>
              <button className="px-8 py-3 bg-white text-gray-700 font-semibold rounded-xl border-2 border-gray-200 hover:border-blue-500 hover:text-blue-600 transition-all duration-300">
                查看演示
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortalFeatures; 