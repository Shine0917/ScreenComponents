import React, { useEffect, useState, useRef } from "react";
import "./marque.css";
export default function Marque(props) {
  const { width, text, className, style } = props;
  const [active, setActive] = useState(false);
  const boxEl = useRef(null);
  const itemEl = useRef(null);

  const setAnimate = () => {
    const boxELW = boxEl.current.offsetWidth;
    const itemElW = itemEl.current.offsetWidth;
    setActive(itemElW > boxELW ? true : false);
  };
  const onMouseLeave = () => {
    setAnimate();
  };
  const onMouseEnter = () => {
    if (active) {
      setActive(false);
    }
  };
  useEffect(() => {
    setAnimate();
  }, [width, text]);
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      ref={boxEl}
      className={`marque-box ${className}`}
      style={{ width, ...style }}
    >
      <span
        ref={itemEl}
        className={`marque-item ${active ? "marque-animate" : ""}`}
      >
        {text}
      </span>
    </div>
  );
}
