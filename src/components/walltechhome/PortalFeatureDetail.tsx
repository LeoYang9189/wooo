import React, { useState } from 'react';
import { IconCheckCircle } from '@arco-design/web-react/icon';
import { 
  IconDashboard, 
  IconRobot, 
  IconCloud, 
  IconUser,
  IconLink,
  IconEye,
  IconMessage,
  IconSend
} from '@arco-design/web-react/icon';

const PortalFeatureDetail: React.FC = () => {
  const [selectedFeature, setSelectedFeature] = useState(0);

  const features = [
    {
      icon: <IconDashboard className="text-4xl text-blue-600" />,
      title: "智能BI面板",
      description: "实时数据分析与可视化，助力管理决策",
      details: "多维度数据分析、自定义报表、实时监控、趋势预测"
    },
    {
      icon: <IconRobot className="text-4xl text-green-600" />,
      title: "AI智能助手",
      description: "24/7在线，智能解答业务问题",
      details: "自然语言处理、智能推荐、自动化操作、学习优化"
    },
    {
      icon: <IconCloud className="text-4xl text-purple-600" />,
      title: "灵活部署",
      description: "支持云端和本地部署方案",
      details: "公有云、私有云、混合云、本地化部署"
    },
    {
      icon: <IconUser className="text-4xl text-orange-600" />,
      title: "权限体系",
      description: "完整的组织架构与权限管理",
      details: "角色管理、权限分配、组织架构、安全控制"
    },
    {
      icon: <IconLink className="text-4xl text-indigo-600" />,
      title: "API整合",
      description: "完善的第三方系统对接能力",
      details: "RESTful API、WebHook、数据同步、系统集成"
    },
    {
      icon: <IconEye className="text-4xl text-red-600" />,
      title: "AI识别",
      description: "强大的文档识别与数据提取",
      details: "OCR识别、单证解析、智能分类、数据验证"
    },
    {
      icon: <IconMessage className="text-4xl text-cyan-600" />,
      title: "询价报价",
      description: "功能齐全的询价报价管理系统",
      details: "智能报价、价格比较、成本分析、方案推荐"
    },
    {
      icon: <IconSend className="text-4xl text-emerald-600" />,
      title: "订单协作",
      description: "高度协同的订单履约管理",
      details: "流程协同、状态跟踪、异常预警、协作沟通"
    }
  ];

  return (
    <div className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* 功能选择器 */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2 mb-12">
          {features.map((feature, index) => (
            <button
              key={index}
              className={`p-4 rounded-lg transition-all duration-300 ${
                selectedFeature === index 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-600'
              }`}
              onClick={() => setSelectedFeature(index)}
            >
              <div className="flex flex-col items-center space-y-2">
                <div className={`text-2xl ${selectedFeature === index ? 'text-white' : ''}`}>
                  {React.cloneElement(features[index].icon, { 
                    className: `text-2xl ${selectedFeature === index ? 'text-white' : features[index].icon.props.className}`
                  })}
                </div>
                <span className="text-xs font-medium text-center">{feature.title}</span>
              </div>
            </button>
          ))}
        </div>

        {/* 功能详细展示 */}
        <div className="bg-white rounded-3xl shadow-2xl p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                {features[selectedFeature].icon}
                <h3 className="text-3xl font-bold text-gray-900 ml-4">
                  {features[selectedFeature].title}
                </h3>
              </div>
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                {features[selectedFeature].description}
              </p>
              <div className="space-y-3">
                {features[selectedFeature].details.split('、').map((detail, index) => (
                  <div key={index} className="flex items-center">
                    <IconCheckCircle className="text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{detail}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl h-80 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">
                    {features[selectedFeature].icon}
                  </div>
                  <p className="text-gray-600">功能演示界面</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortalFeatureDetail; 