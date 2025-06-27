import React from 'react';
import PortalHeader from './PortalHeader';
import PortalFooter from './PortalFooter';
import PortalHero from './PortalHero';
import PortalFeatures from './PortalFeatures';
import PortalFeatureDetail from './PortalFeatureDetail';
import PortalTechSpecs from './PortalTechSpecs';
import PortalCTA from './PortalCTA';
import { UserProvider } from './UserContext';
import './PortalStyles.css';

const Portal: React.FC = () => {
  return (
    <UserProvider>
      <div className="min-h-screen bg-white">
        <PortalHeader />
        <main>
          <PortalHero />
          <PortalFeatures />
          <PortalFeatureDetail />
          <PortalTechSpecs />
          <PortalCTA />
        </main>
        <PortalFooter />
      </div>
    </UserProvider>
  );
};

export default Portal; 