import {
  Layout,
  Menu,
  Avatar,
  Space,
  Button,
  FloatButton,
  Drawer,
  // Row,
  // Col,
} from "antd";
import {
  LinkedinFilled,
  GithubFilled,
  MenuOutlined,
  MailOutlined,
} from "@ant-design/icons";

import logo1 from "../assets/logo1.JPG";
// import myPhoto from "../assets/my.jpg";
import backgroundImg from "../assets/back.jpg";
import styles from "../components/HomePage.module.css";
import AboutPage from "./AboutPage";
import ExperiencePage from "./ExperiencePage";
import ContactPage from "./ContactPage";
import { useState, useEffect } from "react";
import AnimatedText from "./AnimatedText";
import TypingText from "./TypingText";

const { Header } = Layout;

export default function HomePage() {
  const handleClick = (e) => {
    onClose();
    console.log(e);
    const sectionId = e.key;
    console.log(sectionId);
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
  const handleUrl = (e) => {
    const sectionId = e.currentTarget.getAttribute("data-key");
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const [visible, setVisible] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const menuItems = [
    { key: "home", title: "Home" },
    { key: "about", title: "About" },
    { key: "experience", title: "Experience" },
    { key: "contact", title: "Contact" },
  ];
  return (
    <>
      <Layout className="layout" id="home">
        <Header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "#659DBD",
            height: 100,
            position: "sticky",
            top: 0,
            zIndex: 1,
          }}
        >
          <Space>
            <Avatar size={84} src={logo1} />
            <div style={{ fontSize: "74", fontWeight: "1000", color: "white" }}>
              RAJVEE KADCHHA
            </div>
          </Space>

          <div>
            {windowWidth <= 768 ? (
              <>
                <Button
                  type="primary"
                  onClick={showDrawer}
                  style={{ backgroundColor: "unset" }}
                >
                  <MenuOutlined />
                </Button>
                <Drawer
                  // title="Navigation"
                  placement="right"
                  closable={true}
                  onClose={onClose}
                  open={visible}
                >
                  <Menu mode="vertical" onClick={handleClick}>
                    {menuItems.map((item) => (
                      <Menu.Item key={item.key}>{item.title}</Menu.Item>
                    ))}
                  </Menu>
                </Drawer>
              </>
            ) : (
              <Menu
                mode="horizontal"
                onClick={handleClick}
                style={{ backgroundColor: "unset", borderBottom: "unset" }}
              >
                {menuItems.map((item) => (
                  <Menu.Item style={{ color: "white" }} key={item.key}>
                    {item.title}
                  </Menu.Item>
                ))}
              </Menu>
            )}
          </div>
        </Header>
        <div
          className={styles.home}
          style={{
            backgroundImage: `url(${backgroundImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            paddingBottom: "100px",
          }}
        >
          {/* <Row justify="center">
            <Col xs={6} sm={6} md={2} lg={2}></Col>
            <Col xs={12} sm={12} md={6} lg={6} style={{ display: "flex" }}>
              <div className={styles.parentComponent}>
                <img
                  src={myPhoto}
                  alt="Profile"
                  className={styles.profilePhoto}
                />
              </div>
            </Col>
            <Col xs={6} sm={6} md={2} lg={2}></Col>
            <Col xs={24} sm={24} md={14} lg={14} className={styles.intro}> */}
          <h1 className={styles.title}>
            {/* <TypingText text="HEY, I'M RAJVEE KADCHHA" /> */}
            <AnimatedText text="HEY, I'M RAJVEE KADCHHA" />
          </h1>
          <h2 className={styles.text}>
            <TypingText
              text="UI Developer Dedicated to Creating User-Friendly Interfaces with a
            Focus on Design and Functionality"
            />
          </h2>
          <Button
            type="primary"
            size="large"
            data-key="experience"
            onClick={handleUrl}
            className={styles.pButton}
            style={{ background: "#659DBD", marginTop: "20px" }}
          >
            EXPERIENCE
          </Button>
          {/* </Col>
          </Row> */}
          <FloatButton.Group
            shape="square"
            size="large"
            className="custom-float-btn-body"
            style={{
              left: 0,
              top: "20rem",
              height: "fit-content",
              display: "block",
            }}
          >
            <FloatButton
              style={{ width: "50px", height: "50px", display: "block" }}
              icon={<LinkedinFilled style={{ fontSize: "x-large" }} />}
              href="https://www.linkedin.com/in/rajveekadchha/"
              target="_blank"
            />
            <FloatButton
              style={{ width: "50px", height: "50px", display: "block" }}
              icon={<GithubFilled style={{ fontSize: "x-large" }} />}
              href="https://github.com/rajveekadchha"
              target="_blank"
            />
            <FloatButton
              style={{ width: "50px", height: "50px" }}
              icon={<MailOutlined style={{ fontSize: "x-large" }} />}
              href="mailto:rajveedkadchha@gmail.com"
              target="_blank"
            />
          </FloatButton.Group>
        </div>

        <AboutPage />
        <ExperiencePage />
        <ContactPage />
      </Layout>
    </>
  );
}
