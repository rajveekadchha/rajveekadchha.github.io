import React, { useEffect, useState } from "react";

export default function TypingAnimation({ text, onComplete }) {
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    let typingTimer;
    if (typedText.length < text.length) {
      typingTimer = setTimeout(() => {
        setTypedText(text.substring(0, typedText.length + 1));
      }, 100);
    } else {
      if (onComplete) onComplete();
    }
    return () => clearTimeout(typingTimer);
  }, [typedText, text, onComplete]);

  return <div>{typedText}</div>;
}
