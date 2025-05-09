import React from 'react';
import { Typography, Card, Button } from '@arco-design/web-react';
import { IconPlus } from '@arco-design/web-react/icon';

const { Title, Paragraph } = Typography;

const ReleaseManagementPage: React.FC = () => {
  return (
    <div style={{ padding: '20px', backgroundColor: 'var(--color-bg-2)', borderRadius: 'var(--border-radius-medium)' }}>
      <Title heading={5}>放箱管理</Title>
      <Paragraph>管理集装箱的放箱指令和操作。</Paragraph>
      <Button type='primary' icon={<IconPlus />} style={{ marginBottom: '20px' }}>创建放箱指令</Button>
      <Card title="放箱指令列表">
        <Paragraph>跟踪进行中和已完成的放箱操作。</Paragraph>
      </Card>
    </div>
  );
};

export default ReleaseManagementPage; 