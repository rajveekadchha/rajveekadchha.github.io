// Header.js
import React, { useState, useEffect } from "react";
import logo from "../assets/logo-dark.svg";

export default function Header({ onNavClick }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMobileMenuOpen]);

  const handleNavClick = (page) => {
    toggleMobileMenu();
    onNavClick(page);
  };

  return (
    <header className="bg-black sticky top-0 z-40">
      <div className="mx-auto px-10 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="w-8 h-8 mr-2" />
          <button
            onClick={() => onNavClick("Home")}
            className="text-2xl font-bold text-white"
          >
            Rajvee Kadchha
          </button>
        </div>
        {isMobileMenuOpen ? (
          <>
            <nav className="space-y-6 text-center mt-16 fixed inset-0 bg-black z-40 flex flex-col items-center justify-center text-white">
              {["Home", "About", "Experience", "Projects", "Contact"].map(
                (page) => (
                  <button
                    // href=""
                    key={page}
                    className="block hover-target text-3xl"
                    onClick={() => handleNavClick(page)}
                  >
                    {page}
                  </button>
                )
              )}
            </nav>
          </>
        ) : (
          <div className="hidden md:flex space-x-4 ">
            {["Home", "About", "Experience", "Projects", "Contact"].map(
              (page) => (
                <button
                  // href="#"
                  key={page}
                  className="hover-target text-white"
                  onClick={() => onNavClick(page)}
                >
                  {page}
                </button>
              )
            )}
          </div>
        )}
        <div className="md:hidden">
          {isMobileMenuOpen ? (
            <button onClick={toggleMobileMenu} className="text-2xl text-white">
              close
            </button>
          ) : (
            <button
              className="text-white focus:outline-none"
              onClick={toggleMobileMenu}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
