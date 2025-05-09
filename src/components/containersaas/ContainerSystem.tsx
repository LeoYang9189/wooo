import React, { useState } from 'react';
import { Card, Grid, Typography, Statistic, Space, Button, Table, Badge, Dropdown, Menu, Tag } from '@arco-design/web-react';
import { IconMoreVertical, IconRefresh, IconCalendar, IconExport, IconUserGroup, IconStorage, IconBulb, IconRobot } from '@arco-design/web-react/icon';
import ContainerSaasLayout from './ContainerSaasLayout';
import './ContainerSystem.css';

const { Row, Col } = Grid;
const { Title, Paragraph, Text } = Typography;

// 模拟数据
const containerStatusData = [
  { value: 2548, title: '总箱量', color: 'rgb(var(--primary-6))' },
  { value: 1863, title: '在用箱', color: 'rgb(var(--success-6))' },
  { value: 458, title: '空闲箱', color: 'rgb(var(--warning-6))' },
  { value: 227, title: '维修箱', color: 'rgb(var(--danger-6))' },
];

const ContainerSystem: React.FC = () => {
  const [containerOperations] = useState([
    {
      id: '1',
      containerNo: 'CSNU1234567',
      operationType: '装载',
      location: '上海洋山港',
      status: '成功',
      operator: '张三',
      operationTime: '2023-08-15 14:30:22',
    },
    {
      id: '2',
      containerNo: 'MAEU8765432',
      operationType: '卸货',
      location: '宁波舟山港',
      status: '成功',
      operator: '李四',
      operationTime: '2023-08-15 11:45:18',
    },
    {
      id: '3',
      containerNo: 'CMAU2468013',
      operationType: '维修',
      location: '广州南沙港',
      status: '进行中',
      operator: '王五',
      operationTime: '2023-08-15 09:12:05',
    },
    {
      id: '4',
      containerNo: 'OOLU9876543',
      operationType: '移动',
      location: '青岛港',
      status: '成功',
      operator: '赵六',
      operationTime: '2023-08-14 17:23:41',
    },
    {
      id: '5',
      containerNo: 'HLXU5678901',
      operationType: '清洗',
      location: '天津港',
      status: '失败',
      operator: '钱七',
      operationTime: '2023-08-14 15:09:33',
    },
  ]);

  const statusColorMap: Record<string, string> = {
    '成功': 'green',
    '进行中': 'blue',
    '失败': 'red',
  };

  const operationTypeIconMap: Record<string, React.ReactNode> = {
    '装载': <Badge status="success" />,
    '卸货': <Badge status="warning" />,
    '维修': <Badge status="error" />,
    '移动': <Badge status="processing" />,
    '清洗': <Badge status="default" />,
  };

  const currentDate = new Date().toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <ContainerSaasLayout menuSelectedKey="1">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <Title heading={3} style={{ marginTop: 0, marginBottom: 16 }}>
            集装箱管理控制台
          </Title>
          <Paragraph className="text-gray-600">
            今天是 {currentDate}，管理员，欢迎回来！箱子周转状态良好，今日有3个异常需要处理。
          </Paragraph>
        </div>
        <Space>
          <Button type="outline" icon={<IconCalendar />}>设置时间</Button>
          <Button type="outline" icon={<IconRefresh />}>刷新</Button>
          <Button type="primary" icon={<IconExport />}>导出报表</Button>
        </Space>
      </div>

      {/* 数据概览卡片 */}
      <Row gutter={[16, 16]} className="mb-6 container-stats-wrapper">
        {containerStatusData.map((item, index) => (
          <Col span={6} key={index}>
            <Card bordered={false} className="h-full shadow-sm hover:shadow-md transition-shadow status-card container-stats-card">
              <Statistic 
                title={
                  <div className="text-base font-medium text-gray-600">{item.title}</div>
                }
                value={item.value}
                style={{ 
                  color: item.color,
                  fontSize: '28px', 
                  fontWeight: 'bold' 
                }}
                suffix={index === 0 ? '箱' : '箱'}
              />
              <div className="text-xs text-gray-500 mt-2">
                {index === 0 && '较上月增长 2.5%'}
                {index === 1 && '使用率 73.1%'}
                {index === 2 && '可调度率 18.0%'}
                {index === 3 && '维修率 8.9%'}
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* 内容区域 */}
      <Row gutter={[16, 16]}>
        {/* 左侧区域 */}
        <Col span={16}>
          <Card bordered={false} className="mb-4 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <Title heading={5} className="m-0">集装箱类型分布</Title>
              <Dropdown
                droplist={
                  <Menu>
                    <Menu.Item key="weekly">查看周数据</Menu.Item>
                    <Menu.Item key="monthly">查看月数据</Menu.Item>
                    <Menu.Item key="yearly">查看年数据</Menu.Item>
                  </Menu>
                }
              >
                <Button type="text" icon={<IconMoreVertical />} />
              </Dropdown>
            </div>
            
            <div className="h-64 flex justify-center items-center border border-gray-100 rounded-lg bg-gray-50 chart-placeholder">
              <div className="text-center text-gray-400">
                <IconStorage style={{ fontSize: 48 }} className="mb-2" />
                <div>箱型分布图表将在此显示</div>
                <div className="text-xs mt-1">支持20GP、40GP、40HC等类型</div>
              </div>
            </div>
          </Card>

          <Card bordered={false} className="shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <Title heading={5} className="m-0">集装箱地域分布</Title>
              <Dropdown
                droplist={
                  <Menu>
                    <Menu.Item key="weekly">查看周数据</Menu.Item>
                    <Menu.Item key="monthly">查看月数据</Menu.Item>
                    <Menu.Item key="yearly">查看年数据</Menu.Item>
                  </Menu>
                }
              >
                <Button type="text" icon={<IconMoreVertical />} />
              </Dropdown>
            </div>
            
            <div className="h-64 flex justify-center items-center border border-gray-100 rounded-lg bg-gray-50 chart-placeholder">
              <div className="text-center text-gray-400">
                <IconRobot style={{ fontSize: 48 }} className="mb-2" />
                <div>地域分布地图将在此显示</div>
                <div className="text-xs mt-1">支持全球港口位置展示</div>
              </div>
            </div>
          </Card>
        </Col>

        {/* 右侧区域 */}
        <Col span={8}>
          <Card bordered={false} className="mb-4 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <Title heading={5} className="m-0">智能预警</Title>
              <Button type="text" icon={<IconBulb />} className="text-warning-6">
                3条未处理
              </Button>
            </div>
            
            <div className="space-y-3">
              <div className="p-3 border border-warning-2 bg-warning-1 rounded-lg alert-card">
                <div className="flex items-center">
                  <Badge status="warning" />
                  <Text className="ml-2 font-medium">超期滞留预警</Text>
                </div>
                <div className="ml-4 mt-1 text-gray-600 text-sm">
                  共有15个集装箱滞留超过15天，请处理
                </div>
              </div>
              
              <div className="p-3 border border-danger-2 bg-danger-1 rounded-lg alert-card">
                <div className="flex items-center">
                  <Badge status="error" />
                  <Text className="ml-2 font-medium">箱损严重预警</Text>
                </div>
                <div className="ml-4 mt-1 text-gray-600 text-sm">
                  CSNU7654321箱体损坏严重，请安排维修
                </div>
              </div>
              
              <div className="p-3 border border-info-2 bg-info-1 rounded-lg alert-card">
                <div className="flex items-center">
                  <Badge status="processing" />
                  <Text className="ml-2 font-medium">库存不足预警</Text>
                </div>
                <div className="ml-4 mt-1 text-gray-600 text-sm">
                  青岛港40HC类型集装箱库存不足，剩余5个
                </div>
              </div>
            </div>
          </Card>

          <Card bordered={false} className="shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <Title heading={5} className="m-0">近期操作记录</Title>
              <div>
                <IconUserGroup className="text-gray-400 mr-1" />
                <Text className="text-xs text-gray-500">今日活跃: 8人</Text>
              </div>
            </div>
            
            <Table
              data={containerOperations}
              rowKey="id"
              pagination={{ pageSize: 5, simple: true }}
              border={false}
              size="small"
              className="operations-table"
              columns={[
                {
                  title: '操作类型',
                  dataIndex: 'operationType',
                  width: 90,
                  render: (value) => (
                    <div className="flex items-center">
                      {operationTypeIconMap[value]}
                      <span className="ml-2">{value}</span>
                    </div>
                  ),
                },
                {
                  title: '箱号',
                  dataIndex: 'containerNo',
                  width: 130,
                },
                {
                  title: '状态',
                  dataIndex: 'status',
                  width: 90,
                  render: (status) => (
                    <Tag color={statusColorMap[status]} className="container-status-tag">{status}</Tag>
                  ),
                },
                {
                  title: '操作人',
                  dataIndex: 'operator',
                  width: 90,
                },
              ]}
            />
          </Card>
        </Col>
      </Row>
    </ContainerSaasLayout>
  );
};

export default ContainerSystem; 