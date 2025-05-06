import React from 'react';
import { Grid } from '@arco-design/web-react';

const { Row, Col } = Grid;

const PortalSolutions: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">企业管理解决方案</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            超级运价系统专为物流企业打造，提供完整的内部管理解决方案
          </p>
        </div>

        <Row gutter={[40, 40]} className="items-center">
          <Col xs={24} lg={12}>
            <div className="relative">
              <div className="relative z-10 overflow-hidden rounded-xl shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                  alt="运价管理解决方案" 
                  className="w-full"
                />
              </div>
              
              {/* 装饰元素 */}
              <div className="absolute top-0 left-0 w-full h-full bg-blue-100 rounded-xl -z-10 transform -rotate-3"></div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-yellow-400 rounded-lg z-0"></div>
            </div>
          </Col>
          
          <Col xs={24} lg={12}>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">运价管理解决方案</h3>
              <p className="text-gray-600 mb-6">
                我们的运价管理模块帮助您有效管理各种运输方式的价格信息。系统支持海运整箱、拼箱和空运运价的录入、编辑和查询，同时提供多种筛选和排序功能，方便您快速找到所需信息。
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center mr-3 mt-1">
                    <span className="text-sm font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">批量导入与导出</h4>
                    <p className="text-gray-600">支持Excel格式批量导入和导出，提高数据处理效率</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center mr-3 mt-1">
                    <span className="text-sm font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">AI智能识别</h4>
                    <p className="text-gray-600">通过AI技术自动识别合约文件中的运价信息</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center mr-3 mt-1">
                    <span className="text-sm font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">自定义表格</h4>
                    <p className="text-gray-600">根据需要自定义表格显示内容，专注于重要信息</p>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>

        <Row gutter={[40, 40]} className="items-center mt-20">
          <Col xs={24} lg={12} className="lg:order-2">
            <div className="relative">
              <div className="relative z-10 overflow-hidden rounded-xl shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                  alt="询价报价解决方案" 
                  className="w-full"
                />
              </div>
              
              {/* 装饰元素 */}
              <div className="absolute top-0 right-0 w-full h-full bg-green-100 rounded-xl -z-10 transform rotate-3"></div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-blue-400 rounded-lg z-0"></div>
            </div>
          </Col>
          
          <Col xs={24} lg={12} className="lg:order-1">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">询价报价解决方案</h3>
              <p className="text-gray-600 mb-6">
                询价报价模块提供完整的工作流程管理，从客户询价到报价生成，再到报价审核，全程无缝衔接。系统会自动计算利润率，帮助您制定更具竞争力的价格策略。
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center mr-3 mt-1">
                    <span className="text-sm font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">询价管理</h4>
                    <p className="text-gray-600">记录和跟踪客户询价，确保每个询价都得到及时处理</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center mr-3 mt-1">
                    <span className="text-sm font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">报价管理</h4>
                    <p className="text-gray-600">基于最新运价数据生成报价，支持多种报价模板</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center mr-3 mt-1">
                    <span className="text-sm font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">报价审核</h4>
                    <p className="text-gray-600">完善的报价审核流程，确保报价准确性和合规性</p>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default PortalSolutions; 