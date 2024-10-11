import React, { useState, useEffect } from 'react';
import Voltas from '../assets/Voltas 2.png';
import Exit from '../assets/Exit.png';

function RegisterDashboard() {
  const [data, setData] = useState({ employee: 1000, worker: 800, visitor: 300 });

  useEffect(() => {
    // Simulate live data updates
    const interval = setInterval(() => {
      setData({
        employee: 3000 - Math.floor(Math.random() * 2000),
        worker: 3000 - Math.floor(Math.random() * 1500),
        visitor: 3000 - Math.floor(Math.random() * 500),
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleRegisterClick = (type) => {
    alert(`Registering ${type}!`);
    if(type == 'Employee') {
        window.location.href = 'registeremployee'
    }
    else if(type == 'Visitor') {
        window.location.href = '/registervisitor'
    }
    else {
        window.location.href = '/registerworker'
    }
  };

  const handleExitClick = () => {
    alert('Exiting the page!');
  };

  return (
    <div style={styles.app}>
      <div style={styles.topBar}>
        <img src={Voltas} alt="Voltas Logo" style={styles.logo} />
        <button onClick={handleExitClick} style={styles.exitButton}>
          <img src={Exit} alt="Exit" style={styles.exitIcon} />
        </button>
      </div>
      <div style={styles.registration}>
        <h2 style={styles.heading}>New Registration</h2>
        <div style={styles.buttonContainer}>
          <button
            style={{
              ...styles.registerButton,
              position: 'relative',
              overflow: 'hidden',
            }}
            onClick={() => handleRegisterClick('Employee')}
          >
            Employee
            <span
              style={{
                position: 'absolute',
                top: '0',
                left: '0',
                width: '100%',
                height: '50%',
                background: 'rgba(255, 255, 255, 0.3)',
                borderRadius: '5px 5px 0 0',
              }}
            ></span>
          </button>
          <button
            style={{
              ...styles.registerButton,
              position: 'relative',
              overflow: 'hidden',
            }}
            onClick={() => handleRegisterClick('Worker')}
          >
            Worker
            <span
              style={{
                position: 'absolute',
                top: '0',
                left: '0',
                width: '100%',
                height: '50%',
                background: 'rgba(255, 255, 255, 0.3)',
                borderRadius: '5px 5px 0 0',
              }}
            ></span>
          </button>
          <button
            style={{
              ...styles.registerButton,
              position: 'relative',
              overflow: 'hidden',
            }}
            onClick={() => handleRegisterClick('Visitor')}
          >
            Visitor
            <span
              style={{
                position: 'absolute',
                top: '0',
                left: '0',
                width: '100%',
                height: '50%',
                background: 'rgba(255, 255, 255, 0.3)',
                borderRadius: '5px 5px 0 0',
              }}
            ></span>
          </button>
        </div>
      </div>
      <div style={styles.dashboard}>
        <h2 style={styles.heading}>Dashboard</h2>
        <div style={styles.chartContainer}>
          <div style={{ ...styles.bar, height: `${data.employee / 20}px`, backgroundColor: '#32CD32' }}>
            <span style={styles.barValue}>{data.employee}</span>
            <p style={styles.barLabel}>Employee</p>
          </div>
          <div style={{ ...styles.bar, height: `${data.worker / 20}px`, backgroundColor: '#FF0000' }}>
            <span style={styles.barValue}>{data.worker}</span>
            <p style={styles.barLabel}>Worker</p>
          </div>
          <div style={{ ...styles.bar, height: `${data.visitor / 20}px`, backgroundColor: '#800080' }}>
            <span style={styles.barValue}>{data.visitor}</span>
            <p style={styles.barLabel}>Visitor</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  app: {
    textAlign: 'center',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    background: 'linear-gradient(1.21deg, rgba(11, 143, 194, 1) 35.02%, rgba(68, 24, 124, 1) 107.96%)',
    height: '100vh',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  topBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: '20px',
  },
  logo: {
    height: '30px',
    width: '120px',
  },
  exitButton: {
    background: 'none',
    border: 'none',
  },
  exitIcon: {
    height: '40px',
  },
  registration: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
    paddingLeft: '85px',
    marginBottom: '40px',
  },
  heading: {
    marginBottom: '20px',
    fontSize: '30px',
    lineHeight: '39.2px',
    textAlign: 'left',
  },
  buttonContainer: {
    display: 'flex',
    gap: '50px',
  },
  registerButton: {
    padding: '10px 40px',
    background: 'linear-gradient(to bottom, #452AB2, #452AB2)',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', // Outer shadow
    width: '180px', // Equal width for all buttons
    height: '40px', // Reduced height
  },
  dashboard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
    paddingLeft: '85px',
  },
  chartContainer: {
    display: 'flex',
    marginTop: '50px',
  },
  bar: {
    display: 'inline-block',
    width: '100px',
    margin: '0 20px',
    verticalAlign: 'bottom',
    borderRadius: '5px 5px 0 0',
    position: 'relative',
    color: 'white',
  },
  barLabel: {
    margin: '10px 0 0',
    fontSize: '16px',
  },

  barValue: {
    position: 'absolute',
    top: '-35px',
    width: '100%',
    textAlign: 'center',
    fontSize: '20px',
  },
};

export default RegisterDashboard;
