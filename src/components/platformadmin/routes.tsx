import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import UserManagement from './pages/UserManagement';
import CompanyManagement from './pages/CompanyManagement';
import CompanyForm from './pages/CompanyForm';
import CarrierManagement from './pages/CarrierManagement';
import AnnouncementManagement from './pages/AnnouncementManagement';
import ProductCenter from './pages/ProductCenter';
import ProductAuthorization from './pages/ProductAuthorization';
import StaffManagement from './pages/StaffManagement';
import RoleManagement from './pages/RoleManagement';
import PermissionManagement from './pages/PermissionManagement';
import PortManagement from './pages/PortManagement';

const PlatformAdminRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/user-management" element={<UserManagement />} />
      <Route path="/company-management" element={<CompanyManagement />} />
      <Route path="/company-management/add" element={<CompanyForm />} />
      <Route path="/company-management/edit/:id" element={<CompanyForm />} />
      <Route path="/carrier-management" element={<CarrierManagement />} />
      <Route path="/announcement-management" element={<AnnouncementManagement />} />
      <Route path="/product-center" element={<ProductCenter />} />
      <Route path="/product-authorization/:productId" element={<ProductAuthorization />} />
      <Route path="/staff-management" element={<StaffManagement />} />
      <Route path="/role-management" element={<RoleManagement />} />
      <Route path="/permission-management" element={<PermissionManagement />} />
      <Route path="/port-management" element={<PortManagement />} />
    </Routes>
  );
};

export default PlatformAdminRoutes; 