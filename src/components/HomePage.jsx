import { Layout, Menu, Avatar, Space, Button, FloatButton, Drawer } from "antd";
import {
  LinkedinFilled,
  GithubFilled,
  MenuOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBootstrap,
  faCss3,
  faHtml5,
  faPython,
  faReact,
} from "@fortawesome/free-brands-svg-icons";
import { faJs } from "@fortawesome/free-brands-svg-icons";
import logo from "../assets/ttf.jpg";
// import logo from "../assets/headerImg.jpg";
import backgroundImg from "../assets/back.jpg";
import styles from "../components/HomePage.module.css";
import AboutPage from "./AboutPage";
import ExperiencePage from "./ExperiencePage";
import ContactPage from "./ContactPage";
import { useState, useEffect } from "react";
import AnimatedText from "./AnimatedText";
import TypingText from "./TypingText";
import { faShopify } from "@fortawesome/free-brands-svg-icons/faShopify";

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
  // const handleUrl = (e) => {
  //   const sectionId = e.currentTarget.getAttribute("data-key");
  //   const section = document.getElementById(sectionId);
  //   if (section) {
  //     section.scrollIntoView({ behavior: "smooth" });
  //   }
  // };

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
            <Avatar size={84} src={logo} />
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
          <h1 className={styles.title}>
            {/* <TypingText text="HEY, I'M RAJVEE KADCHHA" /> */}
            <AnimatedText text="HEY, I'M RAJVEE KADCHHA" />
          </h1>
          <h2 className={styles.text}>
            <TypingText text="I love blending creativity with code to craft stunning, user-friendly web experiences" />
          </h2>
          {/* <div style={{ display: "flex", gap: "20px", marginBlock: "0.5rem" }}>
            <FontAwesomeIcon icon={faReact} size="4x" color="#61DAFB" />
            <FontAwesomeIcon icon={faJs} size="4x" color="#f0db4f" />
            <FontAwesomeIcon icon={faHtml5} size="4x" color="#e34c26" />
            <FontAwesomeIcon icon={faCss3} size="4x" color="#2965f1" />
            <FontAwesomeIcon icon={faPython} size="4x" color="#ffd43b" />
            <FontAwesomeIcon icon={faBootstrap} size="4x" color="#563d7c" />
            <FontAwesomeIcon icon={faShopify} size="4x" color="#64943e" />
          </div> */}

          {/* <Button
            type="primary"
            size="large"
            data-key="experience"
            onClick={handleUrl}
            className={styles.pButton}
            style={{ background: "#659DBD", marginTop: "20px" }}
          >
            EXPERIENCE
          </Button> */}

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
