import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import UserManagement from './pages/UserManagement';
import CompanyManagement from './pages/CompanyManagement';
import CarrierManagement from './pages/CarrierManagement';
import AnnouncementManagement from './pages/AnnouncementManagement';
import ProductCenter from './pages/ProductCenter';

const PlatformAdminRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/user-management" element={<UserManagement />} />
      <Route path="/company-management" element={<CompanyManagement />} />
      <Route path="/carrier-management" element={<CarrierManagement />} />
      <Route path="/announcement-management" element={<AnnouncementManagement />} />
      <Route path="/product-center" element={<ProductCenter />} />
    </Routes>
  );
};

export default PlatformAdminRoutes; 