// import React, { useEffect } from "react";
// import "./CustomCursor.css";
// const CustomCursor = () => {
//   useEffect(() => {
//     const cursor = document.getElementById("custom-cursor");

//     const moveCursor = (e) => {
//       cursor.style.left = `${e.clientX}px`;
//       cursor.style.top = `${e.clientY}px`;
//     };

//     const handleMouseOver = (e) => {
//       const elements = document.elementsFromPoint(e.clientX, e.clientY);
//       const isHoveringOverWhiteText = elements.some((el) =>
//         el.classList.contains("hover-change")
//       );

//       if (isHoveringOverWhiteText) {
//         cursor.classList.add("bg-black");
//       } else {
//         cursor.classList.remove("bg-black");
//       }

//       const isHoveringOverTarget = elements.some((el) =>
//         el.classList.contains("hover-target")
//       );

//       if (isHoveringOverTarget) {
//         cursor.classList.add("scale-200");
//       } else {
//         cursor.classList.remove("scale-200");
//       }
//     };

//     window.addEventListener("mousemove", moveCursor);
//     window.addEventListener("mousemove", handleMouseOver);

//     return () => {
//       window.removeEventListener("mousemove", moveCursor);
//       window.removeEventListener("mousemove", handleMouseOver);
//     };
//   }, []);

//   return (
//     <div
//       id="custom-cursor"
//       className="fixed w-4 h-4 bg-white rounded-full z-50 pointer-events-none transition-colors duration-300"
//       style={{ transform: "translate(-50%, -50%)", mixBlendMode: "difference" }}
//     ></div>
//   );
// };

// export default CustomCursor;

import React, { useEffect } from "react";
import "./custom.css";

const CustomCursor = () => {
  useEffect(() => {
    const cursor = document.getElementById("custom-cursor");

    const moveCursor = (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };

    const handleMouseOver = (e) => {
      const elements = document.elementsFromPoint(e.clientX, e.clientY);
      // console.log("Elements under cursor:", elements);

      const isHoveringOverWhiteText = elements.some((el) =>
        el.classList.contains("hover-change")
      );
      const isHoveringOverTarget = elements.some((el) =>
        el.classList.contains("hover-target")
      );

      // Apply/remove background color change
      if (isHoveringOverWhiteText) {
        cursor.classList.add("bg-black");
      } else {
        cursor.classList.remove("bg-black");
      }

      if (isHoveringOverTarget) {
        cursor.classList.add("custom-scale");
      } else {
        cursor.classList.remove("custom-scale");
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousemove", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousemove", handleMouseOver);
    };
  }, []);

  return (
    <div
      id="custom-cursor"
      className="fixed w-4 h-4 bg-white rounded-full z-50 pointer-events-none transition-transform duration-300 transform"
      style={{
        // transform: "translate(-50%, -50%)",
        mixBlendMode: "difference",
      }}
    ></div>
  );
};

export default CustomCursor;
