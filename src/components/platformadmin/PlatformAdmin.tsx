import React from 'react';
import './PlatformAdminStyles.css';
import PlatformAdminLayout from './layout/layout';
import PlatformAdminRoutes from './routes';

const PlatformAdmin: React.FC = () => {
  return (
    <PlatformAdminLayout>
      <PlatformAdminRoutes />
    </PlatformAdminLayout>
  );
};

export default PlatformAdmin; 