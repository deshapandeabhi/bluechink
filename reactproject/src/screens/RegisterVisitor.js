import React, { useState } from 'react';
import './RegisterVisitor.css';
import VoltasLogo from '../assets/Voltas 2.png';
import HomeIcon from '../assets/Home 1.png';

const RegistrationOfVisitor = () => {
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [department, setDepartment] = useState('');
  const [address, setAddress] = useState('');

  const handleHomeClick = () => {
    // Handle the navigation to "1(1)" here
    console.log('Home button clicked');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Visitor Registration Submitted:', {
      firstName,
      middleName,
      lastName,
      mobileNumber,
      email,
      company,
      department,
      address,
    });
  };

  return (
    <div className="Background">
      <img src={VoltasLogo} alt="Voltas Logo" className="Voltas_id43IW1ASi_0" />
      <img src={HomeIcon} alt="Home" className="Home" onClick={handleHomeClick} />
      <div className="RegistrationOfVisitorTitle">Registration of Visitor</div>
      <form onSubmit={handleSubmit} className="Rectangle-18">
        <div className="FirstNameLabel">First Name</div>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="Rectangle-19"
        />
        <div className="MiddleNameLabel">Middle Name</div>
        <input
          type="text"
          value={middleName}
          onChange={(e) => setMiddleName(e.target.value)}
          className="Rectangle-20"
        />
        <div className="LastNameLabel">Last Name</div>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="Rectangle-21"
        />
        <div className="MobileNumberLabel">Mobile Number</div>
        <input
          type="text"
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
          className="Rectangle-22"
        />
        <div className="EmailLabel">Email</div>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="Rectangle-23"
        />
        <div className="CompanyLabel">Company</div>
        <input
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="Rectangle-24"
        />
        <div className="DepartmentLabel">Department</div>
        <input
          type="text"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="Rectangle-25"
        />
        <div className="AddressLabel">Address</div>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="Rectangle-26"
        />
        <div className="Rectangle-28">
          <div className="SubmitButton">Submit</div>
        </div>
      </form>
    </div>
  );
};

export default RegistrationOfVisitor;