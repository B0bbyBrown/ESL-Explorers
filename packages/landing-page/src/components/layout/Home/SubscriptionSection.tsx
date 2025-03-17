import SubscriptionCard from "../Pricing/subscription-card";
import styles from "./SubscriptionSection.module.css";

export const SubscriptionSection = () => {
  return (
    <section className={styles.subscriptions}>
      <h2 className={styles.sectionTitle}>Subscriptions</h2>
      <p className={styles.sectionDescription}>
        Choose the subscription plan that best fits your needs and start your
        learning journey today.
      </p>

      <div className={styles.subscriptionCards}>
        <SubscriptionCard
          title="Student"
          description="Perfect for individual learners looking to expand their knowledge and skills."
          price="$19.99/month"
          features={[
            "Access to all courses",
            "Progress tracking",
            "Community support",
            "Mobile access",
          ]}
        />

        <SubscriptionCard
          title="Teacher"
          description="Designed for educators who want to enhance their teaching with our platform."
          price="$39.99/month"
          features={[
            "All student features",
            "Create custom courses",
            "Student management tools",
            "Advanced analytics",
          ]}
        />
      </div>
    </section>
  );
};

export default SubscriptionSection;
