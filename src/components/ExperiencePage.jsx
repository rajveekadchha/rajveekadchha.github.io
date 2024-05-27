import globalStyles from "../components/AboutPage.module.css";
import styles from "../components/ExperiencePage.module.css";
import { Row, Col, Card } from "antd";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import classNames from "classnames";
export default function ExperiencePage() {
  const [leftRef, leftInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [rightRef, rightInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const leftCardVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };

  const rightCardVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div id="experience">
      <h2 className={globalStyles.title}>EXPERIENCE</h2>
      {/* <div className={styles.divider} /> */}
      <h2 className={styles.t}>
        I'M A FRONTEND DEVELOPER WITH 3 YEARS OF EXPERIENCE
      </h2>

      <Row
        gutter={32}
        className={globalStyles.grid}
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "stretch",
          margin: "1.5rem",
        }}
      >
        <Col xs={24} sm={24} md={24} lg={12}>
          <motion.div
            ref={leftRef}
            initial="hidden"
            animate={leftInView ? "visible" : "hidden"}
            variants={leftCardVariants}
            transition={{ duration: 1, ease: "easeInOut" }}
            className={styles.motionCard}
          >
            <Card
              className={styles.antCard}
              title={
                <span style={{ marginTop: "1rem" }}>
                  Software Engineer <br /> Jun. 2021 - Nov. 2023
                </span>
              }
              styles={{ paddingTop: 5 }}
              bordered={false}
            >
              <ul>
                <li>
                  Multi-Country Pricing (MCP) lets you sell products for
                  different prices to customers from different countries to earn
                  more profit.
                </li>
                <li>
                  Revamped Multi-Country Pricing (MCP) for Shopify 2.0, boosting
                  multi-national business profits by 40% and reducing setup time
                  by nearly 80% by eliminating theme dependencies.
                </li>
                <li>
                  Developed and launched a feature-rich Note-taking app on
                  Thinkific, enhancing user engagement by 40% with advanced
                  editing functionalities and an integrated PDF download
                  feature.
                </li>
                <li>
                  Contributed to Wix's Auto Currency Switcher with auto IP
                  detection, increasing customer retention by 10-30% and
                  reducing bounce rates through IP-based pricing.
                </li>
                <li>
                  Enhanced page speed up to 80 score for Shopify stores by
                  addressing performance metrics and utilizing technologies like
                  LCP, CLS, TBT, image optimization & other possible solutions.
                </li>
                <li>
                  Leveraged expertise in React, JavaScript, and CSS to
                  streamline development processes and optimize user experiences
                  across multiple platforms including Shopify and Wix.
                </li>
              </ul>
            </Card>
          </motion.div>
        </Col>
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={12}
          className={classNames({
            [styles.customStyle]: window.innerWidth <= 992, // Apply your logic here for when to add the class
          })}
        >
          <motion.div
            ref={rightRef}
            initial="hidden"
            animate={rightInView ? "visible" : "hidden"}
            variants={rightCardVariants}
            transition={{ duration: 1, ease: "easeInOut" }}
            className={styles.motionCard}
          >
            <Card
              className={styles.antCard}
              title={
                <span style={{ marginTop: "1rem" }}>
                  Django Developer Intern <br /> Jan. 2021 - Apr. 2021
                </span>
              }
              styles={{ paddingTop: "1rem" }}
              bordered={false}
            >
              <ul>
                {/* <li>
                Null Innovation is a technology company developing products and
                providing services in the areas of the Internet of Things (IoT)
                and Data Science.
              </li> */}
                <li>
                  Spearheaded integration of Twitter API within the
                  Dolphy-Digital Marketing tool, enriching its functionality by
                  50% and facilitating seamless social media management and
                  analytics aggregation.
                </li>
                <li>
                  Streamlined tweet scheduling and keyword-based post parsing,
                  enabling one-click tweet scheduling /rescheduling and reducing
                  time expenditure by 60%, enhancing efficiency and
                  productivity.
                </li>
                <li>
                  Implemented mass reply feature, empowering users to engage
                  with multiple tweets simultaneously, fostering enhanced social
                  media interaction and audience engagement.
                </li>
                <li>
                  Leveraged Django framework and REST APIs alongside Twitter API
                  to orchestrate seamless integration and robust functionality,
                  demonstrating proficiency in cutting-edge technologies and
                  solution-oriented development.
                </li>
              </ul>
            </Card>
          </motion.div>
        </Col>
      </Row>
    </div>
  );
}
