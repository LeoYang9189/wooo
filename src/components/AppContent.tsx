import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useModal } from '../contexts/ModalContext';
import DraggableOctopus from './common/DraggableOctopus';
import AIWobaoChatbox from './common/AIWobaoChatbox';
import LeadFormModal from './common/LeadFormModal';
import LoadingSpinner from './common/LoadingSpinner';
import CookieConsent from './common/CookieConsent';

// 使用懒加载优化性能
const Home = lazy(() => import('./home/Home'));
const Auth = lazy(() => import('./pages/Auth'));
const Terms = lazy(() => import('./pages/Terms'));
const Privacy = lazy(() => import('./pages/Privacy'));
const CookieSettings = lazy(() => import('./pages/CookieSettings'));
const FMCQualification = lazy(() => import('./pages/FMCQualification'));
const SuperFreight = lazy(() => import('./pages/SuperFreight'));
const SaasSystem = lazy(() => import('./saas/SaasSystem'));
const FclRates = lazy(() => import('./saas/FclRates'));
const Portal = lazy(() => import('./portalhome/Portal'));
const NotFound = lazy(() => import('./pages/NotFound'));
const InquiryManagement = lazy(() => import('./saas/InquiryManagement'));
const CreateFclInquiry = lazy(() => import('./saas/CreateFclInquiry'));
const PrecarriageRates = lazy(() => import('./saas/PrecarriageRates'));
const CreatePrecarriageRate = lazy(() => import('./saas/CreatePrecarriageRate'));
const LastMileRates = lazy(() => import('./saas/LastMileRates'));
const CreateLastMileRate = lazy(() => import('./saas/CreateLastMileRate'));
const RouteManagement = lazy(() => import('./saas/RouteManagement'));
const CreateRoute = lazy(() => import('./saas/CreateRoute'));
const ContainerSystem = lazy(() => import('./containersaas/ContainerSystem'));
const ControlTower = lazy(() => import('./controltower/ControlTower'));


interface AppContentProps {
  isAIWobaoChatboxOpen: boolean;
  handleOpenChatbox: () => void;
  handleCloseChatbox: () => void;
}

const AppContent = ({ isAIWobaoChatboxOpen, handleOpenChatbox, handleCloseChatbox }: AppContentProps) => {
  const { isLeadFormOpen, closeLeadForm } = useModal();

  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" color="primary" />
      </div>
    }>
      <CookieConsent />
      <LeadFormModal isOpen={isLeadFormOpen} onClose={closeLeadForm} />

      <Routes>
        <Route path="/" element={
          <>
            <Home />
            <DraggableOctopus onOpen={handleOpenChatbox} />
            <AIWobaoChatbox isOpen={isAIWobaoChatboxOpen} onClose={handleCloseChatbox} />
          </>
        } />
        <Route path="/auth" element={<Auth />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/cookie-settings" element={<CookieSettings />} />
        <Route path="/fmc-qualification" element={<FMCQualification />} />
        <Route path="/super-freight" element={<SuperFreight />} />
        <Route path="/saas-system" element={<SaasSystem />} />
        <Route path="/fcl-rates" element={<FclRates />} />
        <Route path="/portal" element={<Portal />} />
        <Route path="/inquiry-management" element={<InquiryManagement />} />
        <Route path="/saas/create-inquiry/fcl" element={<CreateFclInquiry />} />
        <Route path="/precarriage-rates" element={<PrecarriageRates />} />
        <Route path="/saas/create-precarriage-rate" element={<CreatePrecarriageRate />} />
        <Route path="/lastmile-rates" element={<LastMileRates />} />
        <Route path="/saas/create-lastmile-rate" element={<CreateLastMileRate />} />
        <Route path="/route-management" element={<RouteManagement />} />
        <Route path="/saas/create-route" element={<CreateRoute />} />
        <Route path="/smartainer/*" element={<ContainerSystem />} />
        <Route path="/controltower" element={<ControlTower />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppContent;
