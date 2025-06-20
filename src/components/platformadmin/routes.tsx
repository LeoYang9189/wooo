import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import UserManagement from './pages/UserManagement';
import CompanyManagement from './pages/CompanyManagement';
import CompanyForm from './pages/CompanyForm';
import CarrierManagement from './pages/CarrierManagement';
import CarrierDogPage from './pages/CarrierDogPage';
import AnnouncementDogPage from './pages/AnnouncementDogPage';
import CountryRegionManagement from './pages/CountryRegionManagement';
import ChinaAdministrativeDivision from './pages/ChinaAdministrativeDivision';
import OverseasWarehouseManagement from './pages/OverseasWarehouseManagement';
import ZipcodeManagement from './pages/ZipcodeManagement';
import RouteManagement from './pages/RouteManagement';
import TerminalManagement from './pages/TerminalManagement';
import ShipDataManagement from './pages/ShipDataManagement';
import ShipAgentManagement from './pages/ShipAgentManagement';
import TransportTermsManagement from './pages/TransportTermsManagement';
import TradeTermsManagement from './pages/TradeTermsManagement';
import ContainerManagement from './pages/ContainerManagement';
import PackageUnitManagement from './pages/PackageUnitManagement';
import CalculationUnitManagement from './pages/CalculationUnitManagement';
import ChargeManagement from './pages/ChargeManagement';
import ProductCenter from './pages/ProductCenter';
import ProductAuthorization from './pages/ProductAuthorization';
import StaffManagement from './pages/StaffManagement';
import RoleManagement from './pages/RoleManagement';
import PermissionManagement from './pages/PermissionManagement';
import PortManagement from './pages/PortManagement';
import CurrencyManagement from './pages/CurrencyManagement';
import ExchangeRateManagement from './pages/ExchangeRateManagement';

const PlatformAdminRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/user-management" element={<UserManagement />} />
      <Route path="/company-management" element={<CompanyManagement />} />
      <Route path="/company-management/add" element={<CompanyForm />} />
      <Route path="/company-management/edit/:id" element={<CompanyForm />} />
      <Route path="/carrier-management" element={<CarrierDogPage />} />
      <Route path="/carrier-management-basic" element={<CarrierManagement />} />
      <Route path="/announcement-management" element={<AnnouncementDogPage />} />
      <Route path="/country-region-management" element={<CountryRegionManagement />} />
      <Route path="/china-administrative" element={<ChinaAdministrativeDivision />} />
      <Route path="/overseas-warehouse" element={<OverseasWarehouseManagement />} />
      <Route path="/zipcode-management" element={<ZipcodeManagement />} />
      <Route path="/route-management" element={<RouteManagement />} />
      <Route path="/terminal-management" element={<TerminalManagement />} />
      <Route path="/ship-data" element={<ShipDataManagement />} />
      <Route path="/ship-agent" element={<ShipAgentManagement />} />
      <Route path="/transport-terms" element={<TransportTermsManagement />} />
      <Route path="/trade-terms" element={<TradeTermsManagement />} />
      <Route path="/container-management" element={<ContainerManagement />} />
      <Route path="/package-unit" element={<PackageUnitManagement />} />
      <Route path="/calculation-unit" element={<CalculationUnitManagement />} />
      <Route path="/charge-management" element={<ChargeManagement />} />
      <Route path="/product-center" element={<ProductCenter />} />
      <Route path="/product-authorization/:productId" element={<ProductAuthorization />} />
      <Route path="/staff-management" element={<StaffManagement />} />
      <Route path="/role-management" element={<RoleManagement />} />
      <Route path="/permission-management" element={<PermissionManagement />} />
      <Route path="/port-management" element={<PortManagement />} />
      <Route path="/currency-management" element={<CurrencyManagement />} />
      <Route path="/exchange-rate-management" element={<ExchangeRateManagement />} />
    </Routes>
  );
};

export default PlatformAdminRoutes; 