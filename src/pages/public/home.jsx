import Navbar from '../../components/navbar';
import HeroSection from '../../components/heroSection';
import FeaturesSection from '../../components/featuresSection';
import MetricsSection from '../../components/metricsSection';
import RecentActivitySection from '../../components/recentActivitySection';
import SupportSection from '../../components/supportSection';
import Footer from '../../components/footer';

export default function Home() {
  return (
    <div style={{ fontFamily: '"Poppins", sans-serif' }}>
      <Navbar/>
      <HeroSection/>
      <FeaturesSection/>
      <MetricsSection/>
      <RecentActivitySection/>
      <SupportSection/>
      <Footer/>
    </div>
  );
}
