import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ControlTowerPanel from './pages/ControlTowerPanel';
// 运价中心相关组件暂时注释
// import FreightRateQuery from './pages/FreightRateQuery';
// import InquiryManagement from './pages/InquiryManagement';
import BillingManagement from './pages/BillingManagement';
import InvoiceManagement from './pages/InvoiceManagement';
import UserProfile from './pages/UserProfile';
import CompanyProfile from './pages/CompanyProfile';
import OrderManagement from './pages/OrderManagement';
import OrderDetail from './pages/OrderDetail';
import BLAddition from './pages/BLAddition';
import ScheduleQuery from './pages/ScheduleQuery';

// 引入超级运价系统的组件
import RateQuery from '../controltower/saas/RateQuery';
import InquiryManagementSaas from '../controltower/saas/InquiryManagement';

// 引入包装器
import SaasPageWrapper from './pages/SaasPageWrapper';

const ControlTowerClientRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/control-tower-panel" element={<ControlTowerPanel />} />
      <Route path="/schedule-query" element={<ScheduleQuery />} />
      {/* 运价中心相关路由已暂时注释
      <Route path="/freight-rate-query" element={<FreightRateQuery />} />
      <Route path="/inquiry-management" element={<InquiryManagement />} />
      */}
      <Route path="/order-management" element={<OrderManagement />} />
      <Route path="/order-detail/:orderId" element={<OrderDetail />} />
      <Route path="/bl-addition/:orderId" element={<BLAddition />} />
      <Route path="/billing-management" element={<BillingManagement />} />
      <Route path="/invoice-management" element={<InvoiceManagement />} />
      <Route path="/user-profile" element={<UserProfile />} />
      <Route path="/company-profile" element={<CompanyProfile />} />
      
      {/* 超级运价系统路由 - 使用包装器隐藏重复布局 */}
      <Route path="/saas/rate-query" element={
        <SaasPageWrapper>
          <RateQuery />
        </SaasPageWrapper>
      } />
      <Route path="/saas/inquiry-management" element={
        <SaasPageWrapper>
          <InquiryManagementSaas />
        </SaasPageWrapper>
      } />
    </Routes>
  );
};

export default ControlTowerClientRoutes; 