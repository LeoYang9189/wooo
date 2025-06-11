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

// 引入超级运价系统的组件
// SaasSystem组件暂时注释，因为控制台页面已删除
// import SaasSystem from '../saas/SaasSystem';
import FclRates from '../saas/FclRates';
import RateQuery from '../saas/RateQuery';
import PrecarriageRates from '../saas/PrecarriageRates';
import LastMileRates from '../saas/LastMileRates';
import InquiryManagementSaas from '../saas/InquiryManagement';
import RouteManagement from '../saas/RouteManagement';
import RegionManagement from '../saas/RegionManagement';
import ZipcodeManagement from '../saas/ZipcodeManagement';
import FbaWarehouseManagement from '../saas/FbaWarehouseManagement';

// 引入包装器
import SaasPageWrapper from './pages/SaasPageWrapper';

const ControlTowerClientRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/control-tower-panel" element={<ControlTowerPanel />} />
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
      {/* 控制台和数据分析路由已删除
      <Route path="/saas/super-freight-dashboard" element={
        <SaasPageWrapper>
          <SaasSystem />
        </SaasPageWrapper>
      } />
      */}
      <Route path="/saas/fcl-rates" element={
        <SaasPageWrapper>
          <FclRates />
        </SaasPageWrapper>
      } />
      <Route path="/saas/rate-query" element={
        <SaasPageWrapper>
          <RateQuery />
        </SaasPageWrapper>
      } />
      <Route path="/saas/precarriage-rates" element={
        <SaasPageWrapper>
          <PrecarriageRates />
        </SaasPageWrapper>
      } />
      <Route path="/saas/lastmile-rates" element={
        <SaasPageWrapper>
          <LastMileRates />
        </SaasPageWrapper>
      } />
      <Route path="/saas/inquiry-management" element={
        <SaasPageWrapper>
          <InquiryManagementSaas />
        </SaasPageWrapper>
      } />
      <Route path="/saas/route-management" element={
        <SaasPageWrapper>
          <RouteManagement />
        </SaasPageWrapper>
      } />
      <Route path="/saas/region-management" element={
        <SaasPageWrapper>
          <RegionManagement />
        </SaasPageWrapper>
      } />
      <Route path="/saas/zipcode-management" element={
        <SaasPageWrapper>
          <ZipcodeManagement />
        </SaasPageWrapper>
      } />
      <Route path="/saas/fba-warehouse" element={
        <SaasPageWrapper>
          <FbaWarehouseManagement />
        </SaasPageWrapper>
      } />
    </Routes>
  );
};

export default ControlTowerClientRoutes; 