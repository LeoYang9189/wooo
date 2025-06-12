import React, { useState } from 'react';
import { Card, Typography, Switch, Tag, Space, Button, Grid } from '@arco-design/web-react';
import { IconSettings, IconThunderbolt, IconRobot } from '@arco-design/web-react/icon';
import { useNavigate } from 'react-router-dom';

const { Row, Col } = Grid;

const { Title, Text } = Typography;

interface ProductItem {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  enabled: boolean;
  features: string[];
  status: 'active' | 'inactive';
}

const ProductCenter: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<ProductItem[]>([
    {
      id: 'super-freight',
      name: '超级运价',
      description: '智能化运价管理系统，提供实时运价查询、比价分析和运价优化建议',
      icon: <IconThunderbolt style={{ fontSize: 24, color: '#165DFF' }} />,
      enabled: true,
      features: ['实时运价查询', '智能比价', '运价趋势分析', 'API集成'],
      status: 'active'
    },
    {
      id: 'control-tower',
      name: '控制塔',
      description: '全方位物流监控和管理平台，提供可视化运输跟踪和异常预警',
      icon: <IconSettings style={{ fontSize: 24, color: '#00B42A' }} />,
      enabled: false,
      features: ['运输监控', '异常预警', '数据分析', '报表生成'],
      status: 'inactive'
    },
    {
      id: 'smart-container',
      name: '智慧箱管',
      description: '智能集装箱管理系统，实现箱源调配、状态跟踪和成本控制',
      icon: <IconRobot style={{ fontSize: 24, color: '#FF7D00' }} />,
      enabled: false,
      features: ['箱源管理', '状态跟踪', '智能调配', '成本分析'],
      status: 'inactive'
    }
  ]);

  const handleSwitchChange = (productId: string, checked: boolean) => {
    setProducts(prev => prev.map(product => 
      product.id === productId 
        ? { ...product, enabled: checked, status: checked ? 'active' : 'inactive' }
        : product
    ));
  };

  const getStatusTag = (status: string) => {
    switch (status) {
      case 'active':
        return <Tag color="green">已启用</Tag>;
      case 'inactive':
        return <Tag color="gray">未启用</Tag>;
      default:
        return <Tag color="gray">未知</Tag>;
    }
  };

  const handleAuthorizeCompanies = (productId: string) => {
    navigate(`/platformadmin/product-authorization/${productId}`);
  };

  return (
    <div style={{ padding: '0' }}>
      <div style={{ marginBottom: '24px' }}>
        <Title heading={3} style={{ marginBottom: '8px' }}>产品中心</Title>
        <Text type="secondary">管理和配置各产品模块的授权状态</Text>
      </div>
      
      <Row gutter={[16, 16]}>
        {products.map(product => (
          <Col key={product.id} xs={24} sm={12} lg={8}>
            <Card
              style={{ 
                height: '100%',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              hoverable
              className={`product-card ${product.enabled ? 'enabled' : 'disabled'}`}
            >
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                {/* 卡片头部 */}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'flex-start',
                  marginBottom: '16px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {product.icon}
                    <div>
                      <Title heading={5} style={{ margin: 0, marginBottom: '4px' }}>
                        {product.name}
                      </Title>
                      {getStatusTag(product.status)}
                    </div>
                  </div>
                  <Switch
                    checked={product.enabled}
                    onChange={(checked) => handleSwitchChange(product.id, checked)}
                    size="default"
                  />
                </div>

                {/* 产品描述 */}
                <Text 
                  type="secondary" 
                  style={{ 
                    marginBottom: '16px', 
                    lineHeight: '1.5',
                    flex: 1
                  }}
                >
                  {product.description}
                </Text>

                {/* 功能特性 */}
                <div style={{ marginBottom: '16px' }}>
                  <Text style={{ fontSize: '12px', color: '#86909c', marginBottom: '8px', display: 'block' }}>
                    核心功能
                  </Text>
                  <Space wrap>
                    {product.features.map(feature => (
                      <Tag key={feature} size="small" style={{ fontSize: '11px' }}>
                        {feature}
                      </Tag>
                    ))}
                  </Space>
                </div>

                {/* 操作按钮 */}
                <div style={{ marginTop: 'auto' }}>
                  <Space>
                    <Button 
                      type="outline" 
                      size="small"
                      disabled={!product.enabled}
                    >
                      配置
                    </Button>
                    <Button 
                      type="primary" 
                      size="small"
                      disabled={!product.enabled}
                      onClick={() => handleAuthorizeCompanies(product.id)}
                    >
                      授权企业
                    </Button>
                  </Space>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* 底部说明 */}
      <Card style={{ marginTop: '24px', backgroundColor: '#f7f8fa' }}>
        <Space>
          <Text type="secondary" style={{ fontSize: '12px' }}>
            💡 提示：启用产品授权后，相关功能将对用户开放。如需调整产品配置，请联系技术支持团队。
          </Text>
        </Space>
      </Card>
    </div>
  );
};

export default ProductCenter; 