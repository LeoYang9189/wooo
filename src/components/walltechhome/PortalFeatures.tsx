import React, { useState } from 'react';
import { Card } from '@arco-design/web-react';
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

const PortalFeatures: React.FC = () => {
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
    <div className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          八大核心功能，全面赋能您的业务
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 ${
                selectedFeature === index ? 'ring-2 ring-blue-500 shadow-xl' : ''
              }`}
              onClick={() => setSelectedFeature(index)}
            >
              <div className="text-center p-4">
                <div className="mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {feature.description}
                </p>
                <div className="text-xs text-gray-500 leading-relaxed">
                  {feature.details}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PortalFeatures; 