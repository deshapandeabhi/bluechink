import React, { useState } from 'react';
import './Home.css';
import person from '../assets/sampleperson.jpeg';
import rightmark from '../assets/rightmark.jpeg';

const Home = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className='Main-Container'>
      <div className='Person-Types-column'>
        <div
          className={`Person-Type ${selectedOption === 'employee' ? 'selected' : ''}`}
          onClick={() => handleOptionClick('employee')}
        >
          <h3>Employee</h3>
        </div>
        <div
          className={`Person-Type ${selectedOption === 'worker' ? 'selected' : ''}`}
          onClick={() => handleOptionClick('worker')}
        >
          <h3>Worker</h3>
        </div>
        <div
          className={`Person-Type ${selectedOption === 'supervisor' ? 'selected' : ''}`}
          onClick={() => handleOptionClick('supervisor')}
        >
          <h3>Supervisor</h3>
        </div>
        <div
          className={`Person-Type ${selectedOption === 'visitor' ? 'selected' : ''}`}
          onClick={() => handleOptionClick('visitor')}
        >
          <h3>Visitor</h3>
        </div>
      </div>

      <div className='Person-Image'>
        <img src={person} alt='Person' />
      </div>

      <div className='Results-column'>
        <img src={rightmark} className='rightmark_image1' alt='Right Mark' height='10%' width='10%' />
        <img src={rightmark} className='rightmark_image2' alt='Right Mark' height='10%' width='10%' />
        <img src={rightmark} className='rightmark_image3' alt='Right Mark' height='10%' width='10%' />
        <img src={rightmark} className='rightmark_image4' alt='Right Mark' height='10%' width='10%' />
      </div>

      <div className='Remarks-column'>
        <div className='Marks_box'>
          <h5>20</h5>
          <h5>20</h5>
          <h5>20</h5>
          <h5>20</h5>
        </div>
      </div>
    </div>
  );
};

export default Home;
