import React from 'react';
import { Card, Typography } from '@arco-design/web-react';

const { Title } = Typography;

const ProductCenter: React.FC = () => {
  return (
    <div>
      <Title heading={3} className="!mb-6">产品中心</Title>
      <Card>
        <p>产品中心功能正在开发中...</p>
      </Card>
    </div>
  );
};

export default ProductCenter; 