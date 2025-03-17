import { useState, useEffect } from "react";
import styles from "./student.module.css";

export default function StudentPlatform() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 3;

  const calculateSlideStyles = (index: number) => {
    // Calculate the angle for each planet (120 degrees apart)
    const angle = (360 / totalSlides) * index;
    // Calculate the rotation based on current slide
    const rotation = angle + currentSlide * -120;

    return {
      transform: `
        translate(-50%, -50%)
        rotateY(${rotation}deg)
      `,
      opacity: Math.abs((((rotation % 360) + 360) % 360) - 180) > 90 ? 0.3 : 1,
    };
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => prev + 1);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => prev - 1);
  };

  // Auto-rotate every 5 seconds
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className={styles.main}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Our Student Portal</h1>
          <p>
            Our student portal offers a cutting-edge platform for you to learn
            English effectively. With interactive lessons, real-time feedback,
            and engaging activities, learning has never been more fun!
          </p>
          <button className={styles.primaryButton}>Get Started</button>
        </div>
        <div className={styles.heroImage}>
          {/* Grey square placeholder */}
          <div className={styles.placeholder}></div>
        </div>
      </section>

      {/* Characters Section */}
      <section className={styles.characters}>
        <p className={styles.characterText}>
          Meet the gang who&apos;ll be helping by completing a guide series. As
          you progress, you&apos;ll get badges and unlock more skills!
        </p>
        <div className={styles.characterGrid}>
          {[1, 2, 3, 4].map((index) => (
            <div key={index} className={styles.characterCircle}></div>
          ))}
        </div>
      </section>

      {/* Planets Carousel Section */}
      <section className={styles.planets}>
        <h2>Explore our planets</h2>
        <div className={styles.carouselContainer}>
          <button
            className={`${styles.carouselButton} ${styles.prevButton}`}
            onClick={prevSlide}
            aria-label="Previous planet"
          >
            &lt;
          </button>

          <div className={styles.carousel}>
            <div className={styles.carouselTrack}>
              {[0, 1, 2].map((index) => (
                <div
                  key={index}
                  className={styles.carouselSlide}
                  style={calculateSlideStyles(index)}
                >
                  <div
                    className={styles.planetCircle}
                    style={{
                      transform: `rotateY(${-currentSlide * 120}deg)`,
                    }}
                  ></div>
                  <p className={styles.planetName}>Planet {index + 1}</p>
                </div>
              ))}
            </div>
          </div>

          <button
            className={`${styles.carouselButton} ${styles.nextButton}`}
            onClick={nextSlide}
            aria-label="Next planet"
          >
            &gt;
          </button>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <h2>Register today to start your learning journey!</h2>
        <button className={styles.registerButton}>Register</button>
      </section>
    </main>
  );
}
