import React, {useEffect, useRef} from "react";

function OnOutsideClick(props) {
  const ref = useRef(null);

  const handleOutsideClick = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      props.onOutsideClick();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  });
  return <div ref={ref}>{props.children}</div>;
}

export default OnOutsideClick;
