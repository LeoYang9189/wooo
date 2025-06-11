import React from 'react';
import { Card, Grid, Statistic, Typography } from '@arco-design/web-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faBuilding, faShip, faBullhorn } from '@fortawesome/free-solid-svg-icons';

const { Row, Col } = Grid;
const { Title, Paragraph } = Typography;

const Dashboard: React.FC = () => {
  const stats = [
    {
      title: '注册用户',
      value: 2548,
      prefix: <FontAwesomeIcon icon={faUsers} className="text-blue-500" />,
      suffix: '人',
      color: '#1890ff'
    },
    {
      title: '企业客户',
      value: 126,
      prefix: <FontAwesomeIcon icon={faBuilding} className="text-green-500" />,
      suffix: '家',
      color: '#52c41a'
    },
    {
      title: '合作船东',
      value: 45,
      prefix: <FontAwesomeIcon icon={faShip} className="text-purple-500" />,
      suffix: '家',
      color: '#722ed1'
    },
    {
      title: '活跃公告',
      value: 12,
      prefix: <FontAwesomeIcon icon={faBullhorn} className="text-orange-500" />,
      suffix: '条',
      color: '#fa8c16'
    }
  ];

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="mb-6">
        <Title heading={3} className="!mb-2">
          平台运营控制台
        </Title>
        <Paragraph className="text-gray-600">
          欢迎来到控制塔平台运营后台，这里是您管理整个平台的核心控制中心。
        </Paragraph>
      </div>

      {/* 统计卡片 */}
      <Row gutter={[24, 24]}>
        {stats.map((stat, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card className="hover:shadow-lg transition-shadow">
              <Statistic
                title={stat.title}
                value={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
                countUp
                styleValue={{ color: stat.color }}
              />
            </Card>
          </Col>
        ))}
      </Row>

      {/* 功能概览 */}
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={12}>
          <Card 
            title="快速操作" 
            className="h-full"
            headerStyle={{ borderBottom: '1px solid #f0f0f0' }}
          >
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faUsers} className="text-blue-500 text-xl mr-3" />
                  <div>
                    <div className="font-semibold text-gray-800">用户管理</div>
                    <div className="text-sm text-gray-600">管理平台用户账户和权限</div>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-100">
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faBuilding} className="text-green-500 text-xl mr-3" />
                  <div>
                    <div className="font-semibold text-gray-800">企业管理</div>
                    <div className="text-sm text-gray-600">管理企业客户信息和认证</div>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-gradient-to-r from-purple-50 to-violet-50 rounded-lg border border-purple-100">
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faShip} className="text-purple-500 text-xl mr-3" />
                  <div>
                    <div className="font-semibold text-gray-800">船东维护</div>
                    <div className="text-sm text-gray-600">维护合作船东信息和合约</div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </Col>
        
        <Col xs={24} lg={12}>
          <Card 
            title="系统状态" 
            className="h-full"
            headerStyle={{ borderBottom: '1px solid #f0f0f0' }}
          >
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <span className="text-gray-700">系统运行状态</span>
                <span className="text-green-600 font-semibold">正常</span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <span className="text-gray-700">数据库连接</span>
                <span className="text-blue-600 font-semibold">良好</span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                <span className="text-gray-700">API响应时间</span>
                <span className="text-orange-600 font-semibold">85ms</span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                <span className="text-gray-700">在线用户数</span>
                <span className="text-purple-600 font-semibold">1,234</span>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* 最近活动 */}
      <Card title="最近活动" headerStyle={{ borderBottom: '1px solid #f0f0f0' }}>
        <div className="space-y-3">
          <div className="flex items-center p-3 hover:bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-4"></div>
            <div className="flex-1">
              <div className="text-gray-800">新用户注册</div>
              <div className="text-sm text-gray-500">2小时前</div>
            </div>
          </div>
          
          <div className="flex items-center p-3 hover:bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-4"></div>
            <div className="flex-1">
              <div className="text-gray-800">企业认证完成</div>
              <div className="text-sm text-gray-500">4小时前</div>
            </div>
          </div>
          
          <div className="flex items-center p-3 hover:bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-purple-500 rounded-full mr-4"></div>
            <div className="flex-1">
              <div className="text-gray-800">船东合约更新</div>
              <div className="text-sm text-gray-500">6小时前</div>
            </div>
          </div>
          
          <div className="flex items-center p-3 hover:bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-orange-500 rounded-full mr-4"></div>
            <div className="flex-1">
              <div className="text-gray-800">系统公告发布</div>
              <div className="text-sm text-gray-500">8小时前</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard; 