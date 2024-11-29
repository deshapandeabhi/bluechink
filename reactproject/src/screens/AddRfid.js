import React, { useState, useRef, useEffect } from "react";

const AddRfid = ({ onRfidListChange }) => {
  const [rfid, setRfid] = useState(""); // RFID input
  const [itemType, setItemType] = useState(""); // Dropdown value
  const [listOfRfidDetails, setListOfRfidDetails] = useState([]); // List of added items
  const dropdownRef = useRef(null); // Reference for dropdown positioning
  const [isDropdownOpen, setDropdownOpen] = useState(false); // Dropdown visibility

  const handleDropdownSelect = (item) => {
    setItemType(item);
    setDropdownOpen(false);
  };

  const handleDropdownToggle = (e) => {
    e.stopPropagation();
    setDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false); // Close dropdown when clicking outside
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleAddRfid = () => {
    if (rfid.trim() && itemType.trim()) {
      const updatedList = [...listOfRfidDetails, { rfidno: rfid, itemName: itemType }];
      setListOfRfidDetails(updatedList);
      setRfid("");
      setItemType("");
      onRfidListChange(updatedList); // Pass updated list to parent
    } else {
      alert("Please fill both fields before adding!");
    }
  };

  const renderDropdown = () => {
    if (!isDropdownOpen) return null;

    const options = ["Id Card","Helmet", "Jacket","Gloves","Shoes"];

    const styles = {
      position: "absolute",
      top: "50px", // Temporary fixed position
      left: "50px", // Temporary fixed position
      background: "white",
      border: "1px solid black",
      zIndex: 1000,
      width: "200px", // Test with fixed width
    };

    return (
      <div style={styles}>
        {options.map((item) => (
          <div
            key={item}
            onClick={() => handleDropdownSelect(item)}
            style={{
              padding: "8px",
              cursor: "pointer",
              fontFamily: "gilroy-medium",
            }}
          >
            {item}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{
          display: "flex",
          gap: "30px",
          width: "100%",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        {/* First Input Field */}
        <div
          style={{
            width: "30%",
            border: "2px solid black",
            padding: "0.5px",
          }}
        >
          <input
            type="text"
            value={rfid}
            onChange={(e) => setRfid(e.target.value)}
            placeholder="Enter RFID"
            style={{
              width: "100%",
              height: "100%",
              fontSize: "19px",
              letterSpacing: "1.3px",
              border: "none",
              outline: "none",
            }}
          />
        </div>

        {/* Dropdown Input */}
        <div
          style={{
            width: "30%",
            position: "relative",
            border: "2px solid black",
            padding: "0px",
            cursor: "pointer",
          }}
          ref={dropdownRef}
          onClick={handleDropdownToggle}
        >
          <input
            type="text"
            value={itemType}
            readOnly
            placeholder="Select Item Type"
            style={{
              width: "100%",
              height: "100%",
              fontSize: "19px",
              letterSpacing: "1.3px",
              border: "none",
              outline: "none",
            }}
          />
          <span
            style={{
              position: "absolute",
              right: "10px",
              top: "30%",
              transform: "translateY(-50%)",
              fontSize: "30px",
            }}
          >
            ⌄
          </span>
          {renderDropdown()}
        </div>

        {/* Add Button */}
        <button
          style={{
            padding: "10px 20px",
            fontSize: "16px",
          }}
          onClick={handleAddRfid}
        >
          ADD
        </button>
      </div>
    </div>
  );
};

export default AddRfid;
