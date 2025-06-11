import React from 'react';
import { Card, Typography } from '@arco-design/web-react';

const { Title } = Typography;

const CompanyManagement: React.FC = () => {
  return (
    <div>
      <Title heading={3} className="!mb-6">企业管理</Title>
      <Card>
        <p>企业管理功能正在开发中...</p>
      </Card>
    </div>
  );
};

export default CompanyManagement; 