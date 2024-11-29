import React, { useState } from 'react';
import './RegisterEmployee.css';
import VoltasLogo from '../assets/Voltas 2.png';
import HomeIcon from '../assets/Home 1.png';
import AddRfid from "./AddRfid";

class RegisterEmployee {
  constructor(idcardRFID,helmetRFID,jacketRFID,glovesRFID,shoesRFID,name,jobRole,department,phoneNumber){
    this.idcardRFID = idcardRFID;
    this.helmetRFID = helmetRFID;
    this.jacketRFID = jacketRFID;
    this.glovesRFID = glovesRFID;
    this.shoesRFID = shoesRFID;
    this.name = name;
    this.jobRole = jobRole;
    this.department = department;
    this.phoneNumber = phoneNumber;
  }
  toJson() {
    return {
      idcardRFID: this.idcardRFID,
      helmetRFID: this.helmetRFID,
      jacketRFID: this.jacketRFID,
      glovesRFID: this.glovesRFID,
      shoesRFID: this.shoesRFID,
      name: this.name,
      jobRole: this.jobRole,
      department: this.department,
      phoneNumber: this.phoneNumber,
    };
  }
}

const registeremployeeUrl = "http://localhost:1114/voltas/v1/signup";

const RegistrationOfEmployee = () => {
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [employeeID, setEmployeeID] = useState('');
  const [department, setDepartment] = useState('');
  const [reportingManger, setReportingManger] = useState('');
  const [listOfRfidDetails, setListOfRfidDetails] = useState([]);
  const handleRfidListChange = (updatedList) => {
    setListOfRfidDetails(updatedList);
  };

  const handleHomeClick = () => {
    // Handle the navigation to "1(1)" here
    console.log('Home button clicked');
  };

  const handleRegisterClick = async () => {
    // Validation for input fields
    if (!firstName || !lastName || !mobileNumber || !employeeID || !department) {
      alert('Please fill all the details.');
      return;
    }

    // Validation for RFID list
    if (listOfRfidDetails.length === 0) {
      alert('Please select items.');
      return;
    }

    // Map RFID details to the model fields
    const itemMapping = {
      'Id Card': 'idcardRFID',
      Helmet: 'helmetRFID',
      Jacket: 'jacketRFID',
      Gloves: 'glovesRFID',
      Shoes: 'shoesRFID',
    };

    const rfidData = {
      idcardRFID: '',
      helmetRFID: '',
      jacketRFID: '',
      glovesRFID: '',
      shoesRFID: '',
    };

    listOfRfidDetails.forEach((item) => {
      const key = itemMapping[item.itemName];
      if (key) {
        rfidData[key] = item.rfidno;
      }
    });

    // Create an object of RegisterEmployee
    const employee = new RegisterEmployee(
      rfidData.idcardRFID,
      rfidData.helmetRFID,
      rfidData.jacketRFID,
      rfidData.glovesRFID,
      rfidData.shoesRFID,
      firstName,
      lastName, // Assuming Job Role is in the "lastName" field for this example
      department,
      mobileNumber
    );

    // Print the created object
    console.log('Registered Employee:', employee.toJson());
    try {
      const response = await fetch("http://localhost:1114/voltas/v1/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employee.toJson()),
      });

      if (response.ok) {
        const responseData = await response.json();
        alert("Employee registered successfully!");
        console.log("Response:", responseData);
      } else {
        const errorData = await response.json();
        alert("Failed to register employee. " + errorData.message);
        console.error("Error:", errorData);
      }
    } catch (error) {
      alert("An error occurred while registering the employee.");
      console.error("Error:", error);
    }
    alert('Employee registered successfully!');
  };

  

  return (
    <div className="Background">
      <img src={VoltasLogo} alt="Voltas Logo" className="Voltas_id43IW1ASi_0" />
      <img src={HomeIcon} alt="Home" className="Home" onClick={handleHomeClick} />
      <div style={{ display: "flex", justifyContent: "start" ,alignItems:"self-end"}}>
        <div className="RegistrationOfEmployeeTitle">Registration of Employee</div>
        <div style={{marginTop:"20px",marginRight:"100px"}}>
        <button
          onClick={handleRegisterClick}
          style={{
            backgroundColor: "#1512c3",
            color: "white",
            border: "none",
            borderRadius: "3px",
            cursor: "pointer",
            padding: "5px 10px",
            fontFamily:"Gilroy-SemiBold",
            letterSpacing:"1.5",
            transform:"scale(1.1)",
            transition:'transform 0.3s ease-in-out'
          }}
        >
          REGISTER
        </button>
        </div>
      </div>
      <div className="Rectangle-18">
        <div className="FirstNameLabel">First Name</div>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="Rectangle-19"
        />
        {/* <div className="MiddleNameLabel">Job Role</div>
        <input
          type="text"
          value={middleName}
          onChange={(e) => setMiddleName(e.target.value)}
          className="Rectangle-20"
        /> */}
        <div className="LastNameLabel">Job Role</div>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="Rectangle-21"
        />
        <div className="MiddleNameLabel">Mobile</div>
        <input
          type="text"
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
          className="Rectangle-20"
        />
        {/* <div className="EmailLabel">Email</div>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="Rectangle-23"
        /> */}
        <div className="MobileNumberLabel">Employee ID</div>
        <input
          type="text"
          value={employeeID}
          onChange={(e) => setEmployeeID(e.target.value)}
          className="Rectangle-22"
        />
        <div className="EmailLabel">Department</div>
        <input
          type="text"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="Rectangle-23"
        />
        <div style={{ width: "100%", marginTop: "220px" }}>
          <AddRfid onRfidListChange={handleRfidListChange} />
        </div>

        {/* Display List of RFID Details in a Row with Scrolling */}
        <div
          style={{
            // marginTop: "20px",
            display: "flex",
            overflowX: "auto", // Enables horizontal scrolling
            whiteSpace: "nowrap", // Prevents items from wrapping
            gap: "10px", // Adds spacing between items
            padding: "10px",
            // border: "1px solid #ccc", // Optional: for better UI visibility
            // borderRadius: "5px",
            // backgroundColor: "#f9f9f9",
          }}
        >
          {listOfRfidDetails.length > 0 ? (
            listOfRfidDetails.map((item, index) => (
              <div
                key={index}
                style={{
                  flex: "0 0 auto", // Prevents shrinking and ensures items remain in a row
                  minWidth: "200px", // Set a fixed width for each item
                  padding: "10px",
                  border: "1px solid white",
                  borderRadius: "5px",
                  backgroundColor: "#f0f0f0",
                }}
              >
                <div style={{ marginBottom: "5px" }}>
                  <strong style={{ color: "black", marginRight: "5px" }}>RFID:</strong>
                  <span style={{ color: "black" }}>{item.rfidno}</span>
                </div>
                <div style={{ marginBottom: "5px" }}>
                  <strong style={{ color: "black", marginRight: "5px" }}>ITEM:</strong>
                  <span style={{ color: "black" }}>{item.itemName}</span>
                </div>
                <button
                  onClick={() => {
                    const updatedList = listOfRfidDetails.filter((_, i) => i !== index);
                    setListOfRfidDetails(updatedList);
                    handleRfidListChange(updatedList); // Call the handler with the updated list
                  }}
                  style={{
                    backgroundColor: "red",
                    color: "white",
                    border: "none",
                    borderRadius: "3px",
                    cursor: "pointer",
                    padding: "5px 10px",
                  }}
                >
                  Delete
                </button>
              </div>
            ))
          ) : (
            <p>No items added yet.</p>
          )}
        </div>



        {/* <div className="ReportingMangerLabel">Reporting Manger</div>
        <input
          type="text"
          value={reportingManger}
          onChange={(e) => setReportingManger(e.target.value)}
          className="Rectangle-26"
        /> */}
        {/* <div className="Rectangle-28">
          <div className="SubmitButton">Submit</div>
        </div> */}
      </div>

    </div>
  );
};

export default RegistrationOfEmployee;





