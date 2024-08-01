import React, { useState } from "react";
import emailjs from "emailjs-com";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Resume from "../assets/Rajvee_Resume.pdf";
import myPhoto from "../assets/photo.jpg";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendEmail(formData);
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
        setFormData({ name: "", email: "", message: "" });
      })
      .catch((err) => {
        console.error("FAILED...", err);
      });
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-gray-100 p-4"
      id="contact"
    >
      <div className="bg-white rounded-lg shadow-lg flex flex-col lg:flex-row overflow-hidden w-full max-w-4xl">
        <div className="bg-gray-800 text-white p-8 flex flex-col justify-center items-center text-center lg:w-1/3">
          <img
            src={myPhoto}
            alt="Rajvee"
            className="rounded-full mb-4 w-36 h-36 hidden lg:block object-cover"
          />
          <h2 className="text-2xl mb-2">Rajvee</h2>
          <h4 className="text-lg mb-4">Software Engineer</h4>
          <div className="flex space-x-4 mb-4">
            <a
              href="https://github.com/rajveekadchha"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faGithub} className="text-2xl" />
            </a>
            <a
              href="https://www.linkedin.com/in/rajveekadchha/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faLinkedin} className="text-2xl" />
            </a>
            <a href="mailto:rajveedkadchha@gmail.com">
              <FontAwesomeIcon
                icon={faEnvelope}
                className="text-2xl"
                target="_blank"
                rel="noopener noreferrer"
              />
            </a>
          </div>
          <a
            href={Resume}
            download="Rajvee_Resume.pdf"
            className="bg-white text-gray-800 px-4 py-2 rounded-full hover:bg-gray-800 hover:text-white border border-white"
          >
            Download CV
          </a>
        </div>
        <div className="p-8 lg:w-2/3 flex flex-col justify-center">
          <h2 className="text-3xl mb-6 text-gray-800">Contact Me</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              className="w-full p-3 border rounded-md"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your email"
              className="w-full p-3 border rounded-md"
              required
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              placeholder="Your message"
              className="w-full p-3 border rounded-md"
              required
            ></textarea>
            <button
              type="submit"
              className="bg-gray-800 text-white px-4 py-2 rounded-full hover:bg-gray-900"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
