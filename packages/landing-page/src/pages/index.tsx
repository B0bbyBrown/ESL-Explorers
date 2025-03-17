import styles from "../styles/pages/home.module.css";
import HeroSection from "../components/layout/Home/HeroSection";
import TaglineSection from "../components/layout/Home/TaglineSection";
import HowWeTeachSection from "../components/layout/Home/HowWeTeachSection";
import ServicesSection from "../components/layout/Home/ServicesSection";
import SubscriptionSection from "../components/layout/Home/SubscriptionSection";
import RegisterCTASection from "../components/layout/Home/RegisterCTASection";

export const HomePage = () => {
  return (
    <main className={styles.main}>
      <HeroSection />
      <div className={styles.divider} />
      <TaglineSection />
      <div className={styles.divider} />
      <HowWeTeachSection />
      <ServicesSection />
      <SubscriptionSection />
      <RegisterCTASection />
    </main>
  );
};

export default HomePage;
