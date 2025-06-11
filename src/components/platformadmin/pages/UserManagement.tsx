import React from 'react';
import { Card, Typography } from '@arco-design/web-react';

const { Title } = Typography;

const UserManagement: React.FC = () => {
  return (
    <div>
      <Title heading={3} className="!mb-6">用户管理</Title>
      <Card>
        <p>用户管理功能正在开发中...</p>
      </Card>
    </div>
  );
};

export default UserManagement; 