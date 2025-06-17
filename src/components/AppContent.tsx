import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useModal } from '../contexts/ModalContext';
import DraggableOctopus from './common/DraggableOctopus';
import AIWobaoChatbox from './common/AIWobaoChatbox';
import LeadFormModal from './common/LeadFormModal';
import LoadingSpinner from './common/LoadingSpinner';
import CookieConsent from './common/CookieConsent';
import CreateLclInquiry from './saas/CreateLclInquiry';
import InquiryDetail from './saas/InquiryDetail';

// 使用懒加载优化性能
const Home = lazy(() => import('./home/Home'));
const Auth = lazy(() => import('./pages/Auth'));
const Terms = lazy(() => import('./pages/Terms'));
const Privacy = lazy(() => import('./pages/Privacy'));
const About = lazy(() => import('./pages/About'));
const CookieSettings = lazy(() => import('./pages/CookieSettings'));
const FMCQualification = lazy(() => import('./pages/FMCQualification'));
const SuperFreight = lazy(() => import('./pages/SuperFreight'));
const SaasSystem = lazy(() => import('./saas/SaasSystem'));
const FclRates = lazy(() => import('./saas/FclRates'));
const Portal = lazy(() => import('./portalhome/Portal'));
const AuthPageWrapper = lazy(() => import('./portalhome/AuthPageWrapper'));
const StaffAuthPageWrapper = lazy(() => import('./portalhome/StaffAuthPageWrapper'));
const SSOAuthPageWrapper = lazy(() => import('./portalhome/SSOAuthPageWrapper'));
const ProfilePageWrapper = lazy(() => import('./portalhome/ProfilePageWrapper'));
const CompanyPageWrapper = lazy(() => import('./portalhome/CompanyPageWrapper'));
const NotFound = lazy(() => import('./pages/NotFound'));
const InquiryManagement = lazy(() => import('./saas/InquiryManagement'));
const CreateFclInquiry = lazy(() => import('./saas/CreateFclInquiry'));
const PrecarriageRates = lazy(() => import('./saas/PrecarriageRates'));
const CreatePrecarriageRate = lazy(() => import('./saas/CreatePrecarriageRate'));
const ViewPrecarriageRate = lazy(() => import('./saas/ViewPrecarriageRate'));
const LastMileRates = lazy(() => import('./saas/LastMileRates'));
const CreateLastMileRate = lazy(() => import('./saas/CreateLastMileRate'));
const ViewLastMileRate = lazy(() => import('./saas/ViewLastMileRate'));
const RouteManagement = lazy(() => import('./saas/RouteManagement'));
const CreateRoute = lazy(() => import('./saas/CreateRoute'));
const RegionManagement = lazy(() => import('./saas/RegionManagement'));
const CreateRegion = lazy(() => import('./saas/CreateRegion'));
const ZipcodeManagement = lazy(() => import('./saas/ZipcodeManagement'));
const FbaWarehouseManagement = lazy(() => import('./saas/FbaWarehouseManagement'));
const ContainerSystem = lazy(() => import('./containersaas/ContainerSystem'));
const ControlTower = lazy(() => import('./controltower/ControlTower'));
const ControlTowerClient = lazy(() => import('./controltower-client/ControlTower'));
const PlatformAdmin = lazy(() => import('./platformadmin/PlatformAdmin'));
const RateQuery = lazy(() => import('./saas/RateQuery'));
const CombinationRateQuery = lazy(() => import('./saas/CombinationRateQuery'));
const CreateAirInquiry = lazy(() => import('./saas/CreateAirInquiry'));

interface AppContentProps {}

const AppContent = ({}: AppContentProps) => {
  const { modalState, openModal, closeModal } = useModal();

  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" color="primary" />
      </div>
    }>
      <CookieConsent />
      <LeadFormModal isOpen={modalState.leadForm.isOpen} onClose={() => closeModal('leadForm')} />

      <Routes>
        <Route path="/" element={
          <>
            <Home />
            <DraggableOctopus onClick={() => openModal('aiChat')} />
            <AIWobaoChatbox isOpen={modalState.aiChat.isOpen} onClose={() => closeModal('aiChat')} />
          </>
        } />
        <Route path="/auth/*" element={<Auth />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/about" element={<About />} />
        <Route path="/cookie-settings" element={<CookieSettings />} />
        <Route path="/fmc-qualification" element={<FMCQualification />} />
        <Route path="/super-freight" element={<SuperFreight />} />
        <Route path="/saas-system" element={<SaasSystem />} />
        <Route path="/fcl-rates" element={<FclRates />} />
        <Route path="/portal" element={<Portal />} />
        <Route path="/portal/auth" element={<AuthPageWrapper />} />
        <Route path="/staff/auth" element={<StaffAuthPageWrapper />} />
        <Route path="/sso/auth/:provider" element={<SSOAuthPageWrapper />} />
        <Route path="/profile" element={<ProfilePageWrapper />} />
        <Route path="/company" element={<CompanyPageWrapper />} />
        <Route path="/inquiry-management" element={<InquiryManagement />} />
        <Route path="/saas/create-inquiry/fcl" element={<CreateFclInquiry />} />
        <Route path="/saas/create-inquiry/lcl" element={<CreateLclInquiry />} />
        <Route path="/saas/create-inquiry/air" element={<CreateAirInquiry />} />
        <Route path="/precarriage-rates" element={<PrecarriageRates />} />
        <Route path="/saas/create-precarriage-rate" element={<CreatePrecarriageRate />} />
        <Route path="/view-precarriage-rate/:id" element={<ViewPrecarriageRate />} />
        <Route path="/lastmile-rates" element={<LastMileRates />} />
        <Route path="/saas/create-lastmile-rate" element={<CreateLastMileRate />} />
        <Route path="/view-last-mile-rate/:id" element={<ViewLastMileRate />} />
        <Route path="/route-management" element={<RouteManagement />} />
        <Route path="/saas/create-route" element={<CreateRoute />} />
        <Route path="/saas/region-management" element={<RegionManagement />} />
        <Route path="/saas/create-region" element={<CreateRegion />} />
        <Route path="/saas/zipcode-management" element={<ZipcodeManagement />} />
        <Route path="/saas/fba-warehouse" element={<FbaWarehouseManagement />} />
        <Route path="/smartainer/*" element={<ContainerSystem />} />
        <Route path="/controltower/*" element={<ControlTower />} />
        <Route path="/controltower-client/*" element={<ControlTowerClient />} />
        <Route path="/platformadmin/*" element={<PlatformAdmin />} />
        <Route path="/rate-query" element={<RateQuery />} />
        <Route path="/combination-rate-query" element={<CombinationRateQuery />} />
        <Route path="/saas/inquiry-detail/:type/:id" element={<InquiryDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppContent;
