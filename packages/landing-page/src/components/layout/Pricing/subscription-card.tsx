import styles from "./subscription-card.module.css";

interface SubscriptionCardProps {
  title: string;
  description: string;
  price: string;
  features: string[];
}

export default function SubscriptionCard({
  title,
  description,
  price,
  features,
}: SubscriptionCardProps) {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      <div className={styles.price}>{price}</div>
      <ul className={styles.features}>
        {features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
      <button className={styles.subscribeButton}>Subscribe</button>
    </div>
  );
}
