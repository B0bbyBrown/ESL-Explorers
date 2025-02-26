import styles from "../Styles/PricingTable.module.css";

const PricingTable = () => {
  return (
    <section className={styles.pricing}>
      <h2>Pricing Plans</h2>
      <div className={styles.plans}>
        <div className={styles.plan}>
          <h3>Basic</h3>
          <p>$9.99/month</p>
          <p>Access to essential lessons and quizzes.</p>
          <button className={styles.button}>Choose Plan</button>
        </div>
        <div className={styles.plan}>
          <h3>Pro</h3>
          <p>$19.99/month</p>
          <p>All Basic features plus personalized feedback.</p>
          <button className={styles.button}>Choose Plan</button>
        </div>
      </div>
    </section>
  );
};

export default PricingTable;
