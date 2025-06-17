import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ControlTowerPanel from './pages/ControlTowerPanel';
// 运价中心相关组件暂时注释
// import FreightRateQuery from './pages/FreightRateQuery';
// import InquiryManagement from './pages/InquiryManagement';
import UserProfile from './pages/UserProfile';
import CompanyProfile from './pages/CompanyProfile';
import CompanyCertification from './pages/CompanyCertification';
import CompanyDataManagement from './pages/CompanyDataManagement';
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
import QuoteManagement from '../saas/QuoteManagement';
import ContractManagement from '../saas/ContractManagement';
import ContractForm from '../saas/ContractForm';
import PricingRuleManagement from '../saas/PricingRuleManagement';
import PricingRuleForm from '../saas/PricingRuleForm';
import SurchargeManagement from '../saas/SurchargeManagement';
import SurchargeForm from '../saas/SurchargeForm';

// 引入包装器
import SaasPageWrapper from './pages/SaasPageWrapper';

// --- 新增：从 platformadmin 复制的基础资料维护页面 ---
import PortManagement from './pages/PortManagement';
import CarrierManagement from './pages/CarrierManagement';
import CountryRegionManagement from './pages/CountryRegionManagement';
import ChinaAdministrativeDivision from './pages/ChinaAdministrativeDivision';
import OverseasWarehouseManagement from './pages/OverseasWarehouseManagement';
import ZipcodeManagementCt from './pages/ZipcodeManagement';
import RouteManagementCt from './pages/RouteManagement';
import ContainerManagement from './pages/ContainerManagement';
import PackageUnitManagement from './pages/PackageUnitManagement';
import TransportTermsManagement from './pages/TransportTermsManagement';
import TradeTermsManagement from './pages/TradeTermsManagement';
import CalculationUnitManagement from './pages/CalculationUnitManagement';
import ChargeManagement from './pages/ChargeManagement';
import ShipAgentManagement from './pages/ShipAgentManagement';
import ShipDataManagement from './pages/ShipDataManagement';
import TerminalManagement from './pages/TerminalManagement';
import UserManagement from './pages/UserManagement';
import RoleManagement from './pages/RoleManagement';
import StaffManagement from './pages/StaffManagement';
// import CompanyForm from './pages/CompanyForm';
import CreatePrecarriageRate from '../saas/CreatePrecarriageRate';
import CreateLastMileRate from '../saas/CreateLastMileRate';
// --- 结束 ---

const ControlTowerRoutes: React.FC = () => {
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
      <Route path="/user-profile" element={<UserProfile />} />
      <Route path="/company-profile" element={<CompanyProfile />} />
      <Route path="/company-certification" element={<CompanyCertification />} />
      <Route path="/company-data-management" element={<CompanyDataManagement />} />
      
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
      <Route path="/saas/quote-management" element={
        <SaasPageWrapper>
          <QuoteManagement />
        </SaasPageWrapper>
      } />
      <Route path="/saas/contract-management" element={
        <SaasPageWrapper>
          <ContractManagement />
        </SaasPageWrapper>
      } />
      <Route path="/saas/contract/add" element={
        <SaasPageWrapper>
          <ContractForm />
        </SaasPageWrapper>
      } />
      <Route path="/saas/contract/edit/:id" element={
        <SaasPageWrapper>
          <ContractForm />
        </SaasPageWrapper>
      } />
      <Route path="/saas/pricing-rule-management" element={
        <SaasPageWrapper>
          <PricingRuleManagement />
        </SaasPageWrapper>
      } />
      <Route path="/saas/pricing-rule-management/add" element={
        <SaasPageWrapper>
          <PricingRuleForm />
        </SaasPageWrapper>
      } />
      <Route path="/saas/pricing-rule-management/edit/:id" element={
        <SaasPageWrapper>
          <PricingRuleForm />
        </SaasPageWrapper>
      } />
      <Route path="/saas/surcharge" element={
        <SaasPageWrapper>
          <SurchargeManagement />
        </SaasPageWrapper>
      } />
      <Route path="/saas/surcharge/add" element={
        <SaasPageWrapper>
          <SurchargeForm />
        </SaasPageWrapper>
      } />
      <Route path="/saas/surcharge/edit/:id" element={
        <SaasPageWrapper>
          <SurchargeForm />
        </SaasPageWrapper>
      } />
      <Route path="/saas/surcharge/view/:id" element={
        <SaasPageWrapper>
          <SurchargeForm />
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
      <Route path="/saas/create-precarriage-rate" element={
        <SaasPageWrapper>
          <CreatePrecarriageRate />
        </SaasPageWrapper>
      } />
      <Route path="/saas/create-lastmile-rate" element={
        <SaasPageWrapper>
          <CreateLastMileRate />
        </SaasPageWrapper>
      } />

      {/* --- 新增：基础资料维护路由 --- */}
      <Route path="/port-management" element={<PortManagement />} />
      <Route path="/carrier-management" element={<CarrierManagement />} />
      <Route path="/country-region-management" element={<CountryRegionManagement />} />
      <Route path="/china-administrative" element={<ChinaAdministrativeDivision />} />
      <Route path="/overseas-warehouse" element={<OverseasWarehouseManagement />} />
      <Route path="/zipcode-management" element={<ZipcodeManagementCt />} />
      <Route path="/route-management" element={<RouteManagementCt />} />
      <Route path="/container-management" element={<ContainerManagement />} />
      <Route path="/package-unit" element={<PackageUnitManagement />} />
      <Route path="/transport-terms" element={<TransportTermsManagement />} />
      <Route path="/trade-terms" element={<TradeTermsManagement />} />
      <Route path="/calculation-unit" element={<CalculationUnitManagement />} />
      <Route path="/charge-management" element={<ChargeManagement />} />
      <Route path="/ship-agent" element={<ShipAgentManagement />} />
      <Route path="/ship-data" element={<ShipDataManagement />} />
      <Route path="/terminal-management" element={<TerminalManagement />} />
      <Route path="/user-management" element={<UserManagement />} />
      <Route path="/role-management" element={<RoleManagement />} />
      <Route path="/staff-management" element={<StaffManagement />} />
      {/* --- 结束 --- */}
    </Routes>
  );
};

export default ControlTowerRoutes; 