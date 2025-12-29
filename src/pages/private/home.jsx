import Navbar from '../../components/layout/navbar';
import HeroSection from '../../components/home/heroSection';
import FeaturesSection from '../../components/home/featuresSection';
import MetricsSection from '../../components/home/metricsSection';
import RecentActivitySection from '../../components/home/recentActivitySection';
import SupportSection from '../../components/home/supportSection';
import Footer from '../../components/layout/footer';

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
