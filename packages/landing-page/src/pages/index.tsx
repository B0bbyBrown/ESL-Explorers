import styles from "../styles/pages/Home.module.css";
import HeroSection from "../components/layout/Home/HeroSection";
import TaglineSection from "../components/layout/Home/TaglineSection";
import LearningToolsSection from "../components/layout/Home/LearningToolsSection";
import ServicesSection from "../components/layout/Home/ServicesSection";
import { PricingSection } from "@/components/layout/Pricing/PricingSection";
import RegisterCTASection from "../components/layout/Home/RegisterCTASection";

export const HomePage = () => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <HeroSection />
        <div className={styles.divider} />
        <TaglineSection />
        <div className={styles.divider} />
        <LearningToolsSection />
        <ServicesSection />
        <PricingSection />
        <RegisterCTASection />
      </main>
    </div>
  );
};

export default HomePage;
