import Header from '../layout/Header';
import Hero from './Hero';
import Features from './Features';
import Solutions from './Solutions';
import Testimonials from './Testimonials';
import CTA from './CTA';
import Footer from '../layout/Footer';

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <Features />
        <Solutions />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Home; 