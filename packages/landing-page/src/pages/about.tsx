import Image from "next/image";
import styles from "../styles/pages/About.module.css";

export default function AboutPage() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>About Us</h1>

        <div className={styles.content}>
          <div className={styles.textSection}>
            <p className={styles.paragraph}>
              We are a passionate team dedicated to providing Lorem ipsum dolor
              sit amet, consectetur adipiscing elit. Sed vitae lorem nulla.
              Fermentum eu aliquet mollis ac dolor massa odio. Lorem ipsum
              dolor. Lorem ipsum dolor sit amet consectetur adipiscing elit. Sed
              vitae lorem nulla. Lorem ipsum dolor.
            </p>

            <p className={styles.paragraph}>
              Lorem ipsum dolor. Lorem ipsum dolor sit amet consectetur
              Fermentum eu aliquet mollis ac dolor massa odio. Lorem ipsum
              dolor.
            </p>

            <div className={styles.quote}>
              &quot;Learning for a brighter future through fun stuff&quot;
            </div>
          </div>

          <div className={styles.imageContainer}>
            <Image
              src="/placeholder.svg?height=300&width=300"
              alt="3D figure with tablet"
              width={300}
              height={300}
              className={styles.image}
            />
          </div>
        </div>

        <div className={styles.infoBox}>
          <div className={styles.infoSection}>
            <h2 className={styles.infoTitle}>Mission</h2>
            <p className={styles.infoText}>
              Fermentum eu aliquet mollis ac dolor massa odio. Lorem ipsum
              dolor. Lorem ipsum dolor.
            </p>
          </div>

          <div className={styles.infoSection}>
            <h2 className={styles.infoTitle}>Vision</h2>
            <p className={styles.infoText}>
              Fermentum eu aliquet mollis ac dolor massa odio. Lorem ipsum
              dolor. Lorem ipsum dolor.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
