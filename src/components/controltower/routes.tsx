import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import FreightRateQuery from './pages/FreightRateQuery';
import InquiryManagement from './pages/InquiryManagement';
import BillingManagement from './pages/BillingManagement';
import InvoiceManagement from './pages/InvoiceManagement';
import UserProfile from './pages/UserProfile';
import CompanyProfile from './pages/CompanyProfile';
import OrderManagement from './pages/OrderManagement';
import OrderDetail from './pages/OrderDetail';
import BLAddition from './pages/BLAddition';

const ControlTowerRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/freight-rate-query" element={<FreightRateQuery />} />
      <Route path="/inquiry-management" element={<InquiryManagement />} />
      <Route path="/order-management" element={<OrderManagement />} />
      <Route path="/order-detail/:orderId" element={<OrderDetail />} />
      <Route path="/bl-addition/:orderId" element={<BLAddition />} />
      <Route path="/billing-management" element={<BillingManagement />} />
      <Route path="/invoice-management" element={<InvoiceManagement />} />
      <Route path="/user-profile" element={<UserProfile />} />
      <Route path="/company-profile" element={<CompanyProfile />} />
    </Routes>
  );
};

export default ControlTowerRoutes; 