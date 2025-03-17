import styles from "./AboutUsSection.module.css";

export const AboutUsSection = () => {
  const teamMembers = [
    {
      name: "Shinade Groves",
      role: "Chief Executive Officer",
      title: "CEO & Founder",
      image: "/team/shinade.jpg",
    },
    {
      name: "Bobby Brown",
      role: "Lead Developer",
      title: "Technical Lead",
      image: "/team/bobby.jpg",
    },
    {
      name: "Sarah Longworth",
      role: "Content Director",
      title: "Head of Content",
      image: "/team/sarah.jpg",
    },
    {
      name: "Nathan",
      role: "Senior Designer",
      title: "Creative Lead",
      image: "/team/nathan.jpg",
    },
  ];

  return (
    <section className={styles.aboutUs}>
      <div className={styles.container}>
        <h1 className={styles.title}>About Us</h1>

        <div className={styles.description}>
          <p>
            We&apos;re a team passionate about ESL education and committed to
            making language learning effective, fun, and accessible to everyone.
            Our mission is to create a bridge to success through innovative
            learning methods that make English education engaging and impactful.
          </p>
          <button className={styles.aboutBtn}>About Us</button>
        </div>

        <div className={styles.tagline}>
          &quot;Adventure awaits - learn English with ESL Explorers&quot;
        </div>

        <div className={styles.infoSections}>
          <div className={styles.mission}>
            <h2>Our Mission</h2>
            <p>
              At ESL Explorers, our mission is to make learning English an
              exciting and immersive adventure. We empower both teachers and
              students with high-quality resources that make learning engaging
              and effective. Our goal is to help learners master English with
              confidence, creativity, and a sense of adventure—whether preparing
              for exams, advancing your skills, or simply learning the language.
            </p>
          </div>

          <div className={styles.vision}>
            <h2>Our Vision</h2>
            <p>
              To be the leading platform in revolutionizing ESL education by
              creating an engaging, dynamic learning experience that makes
              English accessible to all. We envision a world where language
              barriers dissolve, and every learner can achieve their goals while
              having fun exploring English and its possibilities.
            </p>
          </div>

          <div className={styles.team}>
            <h2>Our Team</h2>
            <div className={styles.teamGrid}>
              {teamMembers.map((member) => (
                <div key={member.name} className={styles.teamMember}>
                  <div className={styles.memberImage}>
                    {/* Image placeholder */}
                  </div>
                  <h3>{member.name}</h3>
                  <p className={styles.memberRole}>{member.role}</p>
                  <p className={styles.memberTitle}>{member.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.cta}>
          <h2>Register today to start your learning journey!</h2>
          <button className={styles.registerBtn}>Register</button>
        </div>
      </div>
    </section>
  );
};
