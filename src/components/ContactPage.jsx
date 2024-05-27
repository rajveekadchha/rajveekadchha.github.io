import globalStyles from "../components/AboutPage.module.css";
import { Button, Form, Input, Row, Col } from "antd";
import styles from "../components/ContactPage.module.css";
import emailjs from "emailjs-com";

export default function ContactPage() {
  const onFinish = (values) => {
    console.log("Success:", values);
    sendEmail(values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const sendEmail = (values) => {
    emailjs
      .send(
        "service_g1b6ipb", // Replace with your EmailJS service ID
        "template_0fagr2f", // Replace with your EmailJS template ID
        {
          from_name: values.name,
          from_email: values.email,
          message: values.message,
        },
        "cIVAr22rJvUovkmvQ" // Replace with your EmailJS user ID
      )
      .then((response) => {
        console.log("SUCCESS!", response.status, response.text);
        // notification.success({
        //   message: "Email Sent",
        //   description: "Your message has been sent successfully!",
        // });
        // form.resetFields();
      })
      .catch((err) => {
        console.error("FAILED...", err);
        // notification.error({
        //   message: "Email Failed",
        //   description:
        //     "There was an issue sending your message. Please try again later.",
        // });
      });
  };

  return (
    <div style={{ backgroundColor: "#f0f0f0" }} id="contact">
      <h2 className={globalStyles.title}>CONTACT ME</h2>
      {/* <div className={styles.divider} /> */}

      <p className={globalStyles.subText}>
        Feel free to Contact me by submitting the form below and I will get back
        to you as soon as possible
      </p>
      <Row>
        <Col span={7}></Col>
        <Col span={10}>
          {" "}
          <Form
            name="basic"
            // labelCol={{
            //   span: 4,
            // }}
            // wrapperCol={{
            //   span: 14,
            // }}
            className={styles.formStyle}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                  type: "email",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="message"
              label="Message"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                formAction="mailto:rajveedkadchha@gmail.com"
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
        <Col span={7}></Col>
      </Row>
    </div>
  );
}
