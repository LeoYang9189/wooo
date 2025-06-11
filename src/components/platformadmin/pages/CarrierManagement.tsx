import React from 'react';
import { Card, Typography } from '@arco-design/web-react';

const { Title } = Typography;

const CarrierManagement: React.FC = () => {
  return (
    <div>
      <Title heading={3} className="!mb-6">船东维护</Title>
      <Card>
        <p>船东维护功能正在开发中...</p>
      </Card>
    </div>
  );
};

export default CarrierManagement; 