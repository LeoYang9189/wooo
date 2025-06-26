import React, { useState } from 'react';
import { 
  Card, 
  Typography, 
  Tabs, 
  Form, 
  Input, 
  Button, 
  Space, 
  Message
} from '@arco-design/web-react';
import { 
  IconSave,
  IconRefresh
} from '@arco-design/web-react/icon';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

const PersonalizationConfig: React.FC = () => {
  const [activeTab, setActiveTab] = useState('website');
  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    setLoading(true);
    // 模拟保存操作
    setTimeout(() => {
      Message.success('配置保存成功');
      setLoading(false);
    }, 1000);
  };

  const handleReset = () => {
    Message.info('配置已重置为默认值');
  };

  const renderWebsiteConfig = () => {
    return (
      <div style={{ maxWidth: 800 }}>
        <Card title="网站基本信息配置" style={{ marginBottom: 24 }}>
          <Text type="secondary" style={{ display: 'block', marginBottom: 16 }}>
            配置网站的基本信息和展示内容
          </Text>
          <Form layout="vertical">
            <Form.Item label="网站名称">
              <Input placeholder="请输入网站名称" />
            </Form.Item>
            <Form.Item label="网站Logo">
              <Input placeholder="请输入Logo URL" />
            </Form.Item>
            <Form.Item label="网站描述">
              <Input.TextArea placeholder="请输入网站描述" rows={3} />
            </Form.Item>
            <Form.Item label="联系方式">
              <Input placeholder="请输入联系方式" />
            </Form.Item>
          </Form>
        </Card>
      </div>
    );
  };

  const renderFieldConfig = () => {
    return (
      <div style={{ maxWidth: 800 }}>
        <Card title="页面字段配置" style={{ marginBottom: 24 }}>
          <Text type="secondary" style={{ display: 'block', marginBottom: 16 }}>
            配置页面中各个字段的显示和标签
          </Text>
          <Form layout="vertical">
            <Form.Item label="用户管理字段">
              <Input placeholder="配置用户管理相关字段" />
            </Form.Item>
            <Form.Item label="订单管理字段">
              <Input placeholder="配置订单管理相关字段" />
            </Form.Item>
            <Form.Item label="运价管理字段">
              <Input placeholder="配置运价管理相关字段" />
            </Form.Item>
          </Form>
        </Card>
      </div>
    );
  };

  const renderAIConfig = () => {
    return (
      <div style={{ maxWidth: 800 }}>
        <Card title="AI助手配置" style={{ marginBottom: 24 }}>
          <Text type="secondary" style={{ display: 'block', marginBottom: 16 }}>
            配置AI助手的功能和展示设置
          </Text>
          <Form layout="vertical">
            <Form.Item label="助手名称">
              <Input placeholder="请输入AI助手名称" />
            </Form.Item>
            <Form.Item label="欢迎语">
              <Input.TextArea placeholder="请输入AI助手欢迎语" rows={3} />
            </Form.Item>
            <Form.Item label="功能配置">
              <Input placeholder="配置AI助手功能" />
            </Form.Item>
          </Form>
        </Card>
      </div>
    );
  };

  return (
    <div style={{ padding: '0' }}>
      {/* 页面标题 */}
      <div style={{ marginBottom: '24px' }}>
        <Title heading={3} style={{ margin: 0, marginBottom: '8px' }}>
          个性化配置
        </Title>
        <Text type="secondary">
          配置系统的个性化设置和展示内容
        </Text>
      </div>

      {/* 操作栏 */}
      <Card style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Space>
            <Text style={{ fontWeight: 'bold' }}>配置管理</Text>
          </Space>
          
          <Space>
            <Button icon={<IconRefresh />} onClick={handleReset}>
              重置
            </Button>
            <Button 
              type="primary" 
              icon={<IconSave />}
              loading={loading}
              onClick={handleSave}
            >
              保存配置
            </Button>
          </Space>
        </div>
      </Card>

      {/* 配置页签 */}
      <Card>
        <Tabs 
          activeTab={activeTab} 
          onChange={setActiveTab}
          type="rounded"
        >
          <TabPane key="website" title="网站基本信息">
            {renderWebsiteConfig()}
          </TabPane>
          <TabPane key="fields" title="页面字段配置">
            {renderFieldConfig()}
          </TabPane>
          <TabPane key="ai" title="AI助手配置">
            {renderAIConfig()}
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default PersonalizationConfig; 