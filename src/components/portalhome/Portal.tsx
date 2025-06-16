import React from 'react';
import PortalHeader from './PortalHeader';
import Footer from '../layout/Footer';
import PortalHero from './PortalHero';
import PortalFeatures from './PortalFeatures';
import PortalSolutions from './PortalSolutions';
import PortalCTA from './PortalCTA';
import './PortalStyles.css';

const Portal: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <PortalHeader />
      <main>
        <PortalHero />
        <PortalFeatures />
        <PortalSolutions />
        <PortalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Portal; 