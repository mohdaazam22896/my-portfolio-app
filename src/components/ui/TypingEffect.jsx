import { useState, useEffect } from 'react';

export default function TypingEffect({ text }) {
  const [displayed, setDisplayed] = useState('');
  useEffect(() => {
    let i = 0;
    setDisplayed('');
    const timer = setInterval(() => {
      if (i < text.length) { setDisplayed(text.slice(0, i + 1)); i++; }
      else clearInterval(timer);
    }, 55);
    return () => clearInterval(timer);
  }, [text]);
  return <span>{displayed}<span className="typing-cursor">|</span></span>;
}
