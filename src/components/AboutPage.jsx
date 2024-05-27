import { Row, Col, Button } from "antd";
import styles from "../components/AboutPage.module.css";

export default function AboutPage() {
  const handleUrl = (e) => {
    const sectionId = e.currentTarget.getAttribute("data-key");
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div style={{ backgroundColor: "#f0f0f0" }} id="about">
      <h2 className={styles.title}>ABOUT ME</h2>
      {/* <div className={styles.divider} /> */}

      <p className={styles.subText}>
        Here you will find more information about me, what I do, and my current
        skills mostly in terms of programming and technology
      </p>
      <Row className={styles.grid}>
        <Col xs={24} sm={24} md={24} lg={12}>
          <h2>Get to know me!</h2>
          <p className={styles.subSubText}>
            I am UI Developer Dedicated to Creating User-Friendly Interfaces
            with a Focus on Design and Functionality. Check out my work on
            Projects section.
          </p>
          <p className={styles.subSubText}>
            I'm open to Job opportunities where I can contribute, learn and
            grow. If you have a good opportunity that matches my skills and
            experience then please contact me.
          </p>

          <Button
            type="primary"
            size="large"
            data-key="contact"
            onClick={handleUrl}
            className={styles.pButton}
            style={{ background: "#659DBD" }}
          >
            CONTACT
          </Button>
        </Col>
        <Col xs={24} sm={24} md={24} lg={12}>
          <div className={styles.skills}>
            <div className={styles.skill}>React</div>
            <div className={styles.skill}>JavaScript</div>
            <div className={styles.skill}>Jquery</div>
            <div className={styles.skill}>HTML</div>
            <div className={styles.skill}>CSS</div>
            <div className={styles.skill}>Shopify</div>
            <div className={styles.skill}>Liquid</div>
            <div className={styles.skill}>Velo</div>
            <div className={styles.skill}>Python</div>
            <div className={styles.skill}>Django</div>
            <div className={styles.skill}>Flask</div>
            <div className={styles.skill}>Bootstrap</div>
            <div className={styles.skill}>ANTD</div>
            <div className={styles.skill}>MaterialUI</div>
            <div className={styles.skill}>TailwindCSS</div>
            <div className={styles.skill}>Github</div>
          </div>
        </Col>
      </Row>
    </div>
  );
}
