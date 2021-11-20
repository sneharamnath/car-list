import "./Select.css";
import React, { useState } from "react";
import OnOutsideClick from "../OnOutsideClick/OnOutsideClick";

function SelectComponent(props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    if (props.options.length) {
      setIsOpen(!isOpen);
    }
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const handleClick = (option) => {
    props.onChange(option);
    setIsOpen(false);
  };

  return (
    <div>
      <OnOutsideClick onOutsideClick={closeDropdown}>
        <div className="dropdown-container">
          <div className="dropdown-header" onClick={toggleDropdown}>
            {props.value || "Select"}
          </div>
          {isOpen && (
            <div className="dropdown-list-container">
              <ul className="dropdown-list">
                {props.options.map((option, index) => (
                  <li
                    className="dropdown-list-item"
                    key={index}
                    onClick={() => {
                      handleClick(option);
                    }}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </OnOutsideClick>
    </div>
  );
}

export default SelectComponent;
