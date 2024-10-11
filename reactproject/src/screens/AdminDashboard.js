import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import logo from '../assets/Voltas 1.png';
import personImage from '../assets/person.png';
import homeIcon from '../assets/Home 1.png';
import icon1 from '../assets/Component 5.png';
import icon2 from '../assets/Safety Vest 1.png';
import icon3 from '../assets/Component 3.png';
import icon4 from '../assets/Component 4.png';
import download from '../assets/download.png';
import * as XLSX from "xlsx";

class PersonStatus {
  constructor(comment, check, name, status) {
    this.comment = comment;
    this.check = check;
    this.name = name;
    this.status = status;
  }

  static fromJson(json) {
    return new PersonStatus(
      json['comments'],
      json['compliance_check'],
      json['name'],
      json['status']
    );
  }
}

class RFIDResponseModel {
  constructor(personStatuses, visitorComment, visitorComplianceCheck, visitorName, visitorStatus, workerComment, workerComplianceCheck, workerName, workerStatus, bootssmall, glovessmall, whiteHelmet, yellowHelmet, greenJacket, redJacket) {
    this.personStatuses = personStatuses;
    this.visitorComment = visitorComment;
    this.visitorComplianceCheck = visitorComplianceCheck;
    this.visitorName = visitorName;
    this.visitorStatus = visitorStatus;
    this.workerComment = workerComment;
    this.workerComplianceCheck = workerComplianceCheck;
    this.workerName = workerName;
    this.workerStatus = workerStatus;
    this.bootssmall = bootssmall;
    this.glovessmall = glovessmall;
    this.whiteHelmet = whiteHelmet;
    this.yellowHelmet = yellowHelmet;
    this.greenJacket = greenJacket;
    this.redJacket = redJacket;
  }

  static fromJson(json) {
    let visitorComment = '';
    let visitorCheck = '';
    let visitorName = '';
    let visitorStatus = '';
    let workerComment = '';
    let workerCheck = '';
    let workerName = '';
    let workerStatus = '';

    // json['person_statuses'].forEach((x) => {
    //   if (x['Person'] === 'Visitor') {
    //     visitorComment = x['comments'];
    //     visitorCheck = x['compliance_check'];
    //     visitorName = x['name'];
    //     visitorStatus = x['status'];
    //   } else {
    //     workerComment = x['comments'];
    //     workerCheck = x['compliance_check'];
    //     workerName = x['name'];
    //     workerStatus = x['status'];
    //   }
    // });
    const personStatuses = json['person_statuses'].map((status) => PersonStatus.fromJson(status));
    return new RFIDResponseModel(
      personStatuses,
      // json['visitor_status']['comments'],
      // json['visitor_status']['compliance_check'],
      // json['visitor_status']['name'],
      // json['visitor_status']['status'],
      // json['worker_status']['comments'],
      // json['worker_status']['compliance_check'],
      // json['worker_status']['name'],
      // json['worker_status']['status'],
      json['item_statuses']['Boots, Small'],
      json['item_statuses']['Gloves, Small'],
      json['item_statuses']['Helmet, White'],
      json['item_statuses']['Helmet, Yellow'],
      json['item_statuses']['Jacket, Green'],
      json['item_statuses']['Jacket, Red']
    );
  }

  toJson() {
    return {
      'Boots, Small': this.bootssmall,
      'Gloves, Small': this.glovessmall,
      'Helmet, White': this.whiteHelmet,
      'Helmet, Yellow': this.yellowHelmet,
      'Jacket, Green': this.greenJacket,
      'Jacket, Red': this.redJacket
    }
  }
}

const BACKEND_URL = 'http://98.130.71.23:3333/latest_rfid_detections';

const AdminDashBoard = () => {
  const [rfidData, setRfidData] = useState(null);
  const [isRedOnTop, setIsRedOnTop] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const pageController = useRef(null); // Equivalent to PageController
  const pagelength = rfidData?.personStatuses?.length || 0;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(BACKEND_URL);
        const data = RFIDResponseModel.fromJson(response.data);
        setRfidData(data);
      } catch (error) {
        console.error('Error fetching RFID report:', error);
      }
    };

    fetchData(); // Initial call to fetch data
    const intervalId = setInterval(fetchData, 5000); // Fetch data every second

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  const handleHomeClick = () => {
    alert('Home button clicked!');
    window.location.href = '/homelist';
  };

  const handlePageClick = (index) => {
    setCurrentPage(index);
    // This assumes you want to scroll into view the page that's clicked
    if (pageController.current) {
      pageController.current.scrollTo({
        left: index * 300, // Adjust based on the width of the page
        behavior: 'smooth',
      });
    }
  };

  const getIconColor = (itemStatus) => {
    return itemStatus === 'Present' ? 'hue-rotate(90deg) brightness(0.8)' : 'hue-rotate(0deg) brightness(0.8)';
  };

  const renderIcons = () => {
    if (!rfidData) return null;

    const { visitorStatus, whiteHelmet, redJacket, glovessmall, bootssmall, yellowHelmet, greenJacket } = rfidData;

    if (visitorStatus === 'Present') {
      return (
        <>
          <img src={icon1} alt="Icon 1" style={{ ...styles.icon, filter: getIconColor(whiteHelmet) }} />
          <img src={icon2} alt="Icon 2" style={{ ...styles.icon, filter: getIconColor(redJacket) }} />
          <img src={icon3} alt="Icon 3" style={{ ...styles.icon, filter: getIconColor(glovessmall) }} />
          <img src={icon4} alt="Icon 4" style={{ ...styles.icon, filter: getIconColor(bootssmall) }} />
        </>
      );
    } else {
      return (
        <>
          <img src={icon1} alt="Icon 1" style={{ ...styles.icon, filter: getIconColor(yellowHelmet) }} />
          <img src={icon2} alt="Icon 2" style={{ ...styles.icon, filter: getIconColor(greenJacket) }} />
          <img src={icon3} alt="Icon 3" style={{ ...styles.icon, filter: getIconColor(glovessmall) }} />
          <img src={icon4} alt="Icon 4" style={{ ...styles.icon, filter: getIconColor(bootssmall) }} />
        </>
      );
    }
  };

  const getButtonStyle = (isVisitor) => {
    return isVisitor ? { ...styles.button, backgroundColor: 'green' } : styles.button;
  };

  const getWorkerButtonStyle = (isWorker, isVisitor) => {
    return isVisitor ? styles.button : isWorker ? { ...styles.button, backgroundColor: 'green' } : styles.button;
  };

  const downloadExcelSheet = (jsonData) => {
    if (!Array.isArray(jsonData)) {
      console.error('jsonData is not an array:', jsonData);

      // Convert single object or invalid data into an array to prevent errors
      jsonData = [jsonData];
    }
    // Convert JSON to a worksheet
    const worksheet = XLSX.utils.json_to_sheet(jsonData);

    // Create a new workbook
    const workbook = XLSX.utils.book_new();

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Generate a binary Excel file and download it
    XLSX.writeFile(workbook, "data.xlsx");
  };

  const renderCurrentPageDetails = () => {
    if (!rfidData || pagelength === 0) return null;

    const personStatus = rfidData.personStatuses[currentPage];

    return (
      <div style={styles.detailsContainer}>
        <div style={styles.details}>
          <h2 style={styles.detailsTitle}>
            {rfidData?.visitorStatus === 'Present' ? 'Visitor Details' : 'Worker Details'}
          </h2>
          <div style={styles.detailItem}>
            <span style={styles.detailLabel}>Name: </span>
            <input
              type="text"
              style={styles.detailInput}
              value={personStatus?.name || ''}
              readOnly
            />
          </div>
          <div style={styles.detailItem}>
            <span style={styles.detailLabel}>Department: </span>
            <input
              type="text"
              style={styles.detailInput}
              value='Production'
              readOnly
            />
          </div>
          <div style={styles.detailItem}>
            <span style={styles.detailLabel}>Employee Id: </span>
            <input
              type="text"
              style={styles.detailInput}
              value={currentPage + 1} // Assuming employee ID as page index + 1
              readOnly
            />
          </div>
          <div style={styles.detailItem}>
            <span style={styles.detailLabel}>Manager: </span>
            <input
              type="text"
              style={styles.detailInput}
              value={rfidData?.personStatuses?.length || 0}
              readOnly
            />
          </div>
          <InputTextFieldV hintText="Download" icon={download} />
          
          {/* Pagination Buttons Below the Download Button */}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            {Array.from({ length: pagelength }).map((_, index) => (
              <div
                key={`page-button-${index}`} 
                onClick={() => handlePageClick(index)}
                style={{
                  cursor: 'pointer',
                  height: '50px',
                  width: '50px',
                  border: '1px solid black',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  margin: '0 10px',
                  background: currentPage === index ? 'lightblue' : 'transparent', // Highlight current page
                }}
              >
                {index + 1}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };


  const InputTextFieldV = ({ hintText, icon }) => {
    const [value, setValue] = useState('');

    return (
      <div style={{
        display: 'flex',
        flexDirection: 'row'
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '10px',
          border: '1px solid black',
          padding: '0 10px',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'row',
          height: '50px', // to maintain a consistent height
          width: '100%'
        }}>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={hintText}
            style={{
              border: 'none',
              outline: 'none',
              flex: 1,
              fontSize: '16px', // adjust font size for better UI
            }}
          />
          <img src={icon} alt="icon" onClick={() => downloadExcelSheet(rfidData.toJson())} style={styles.textfieldicon} />


        </div>
      </div>
    );
  };

  return (
    <div style={styles.container}>
      <img src={logo} alt="Logo" style={styles.logo} />

      <div style={styles.sidebar}>
        <button style={styles.button}>
          <span style={styles.buttonText}>Employee</span>
        </button>
        <button style={getWorkerButtonStyle(rfidData?.workerStatus === 'Present', rfidData?.visitorStatus === 'Present')}>
          <span style={styles.buttonText}>Worker</span>
        </button>
        <button style={getButtonStyle(rfidData?.visitorStatus === 'Present')}>
          <span style={styles.buttonText}>Visitor</span>
        </button>
      </div>

      <div style={styles.personContainer}>
        <img src={personImage} alt="Person" style={styles.personImage} />
      </div>

      <div style={styles.safetyIcons}>
        {renderIcons()}
      </div>
      <div ref={pageController}>
        {renderCurrentPageDetails()}

        {/* <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          {Array.from({ length: pagelength }).map((_, index) => (
            <div
              key={`page-button-${index}`} 
              onClick={() => handlePageClick(index)}
              style={{
                cursor: 'pointer',
                height: '50px',
                width: '50px',
                border: '1px solid black',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '0 10px',
                background: currentPage === index ? 'lightblue' : 'transparent', // Highlight current page
              }}
            >
              {index + 1}
            </div>
          ))} */}
        {/* </div> */}


        {/* 
        <div style={styles.detailsContainer}>
          <div style={styles.details}>
            <h2 style={styles.detailsTitle}>
              {rfidData?.visitorStatus === 'Present' ? 'Visitor Details' : rfidData?.workerStatusStatus ? 'Worker Details' : 'Details'}
            </h2>
            <div style={styles.detailItem}>
              <span style={styles.detailLabel}>Name: </span>
              <input
                type="text"
                style={styles.detailInput}
                value={rfidData ? (rfidData.visitorStatus === 'Present' ? rfidData.visitorName : rfidData.workerStatus === 'Present' ? rfidData.workerName : '') : ''}
                readOnly
              />
            </div>
            <div style={styles.detailItem}>
              <span style={styles.detailLabel}>Department: </span>
              <input
                type="text"
                style={styles.detailInput}
                value='Production'
                readOnly
              />
            </div>
            <div style={styles.detailItem}>
              <span style={styles.detailLabel}>Employee Id: </span>
              <input
                type="text"
                style={styles.detailInput}
                value='001'
                readOnly
              />
            </div>
            <div style={styles.detailItem}>
              <span style={styles.detailLabel}>Manager: </span>
              <input
                type="text"
                style={styles.detailInput}
                value={rfidData?.personStatuses?.length || 0}
                readOnly
              />
            </div>
            <InputTextFieldV hintText="Download" icon={download} />
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
              {Array.from({ length: pagelength }).map((_, index) => (
                <div
                  key={index}
                  onClick={() => handlePageClick(index)}
                  style={{
                    cursor: 'pointer',
                    height: '50px',
                    width: '50px',
                    border: '1px solid black',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: '0 10px',
                  }}
                >
                  {index + 1}
                </div>
              ))}
            </div>

          </div>

        </div> */}

      </div>

      <img onClick={handleHomeClick} src={homeIcon} alt="Home" style={styles.homeIcon} />

      {/* Display RFID data  */}
      {/* <div style={styles.rfidContainer}>
        {rfidData ? (
          <pre style={styles.rfidData}>{JSON.stringify(rfidData, null, 2)}</pre>
        ) : (
          <p style={styles.loading}>Loading RFID data...</p>
        )}
      </div> */}

    </div>
  );
};

const styles = {
  container: {
    width: '100%',
    height: '832px',
    background: 'linear-gradient(0deg, rgba(11,143,194,1) 0%, rgba(68,24,124,1) 100%)',
    display: 'flex',
    position: 'relative',
    padding: '20px',
    boxSizing: 'border-box',
  },
  logo: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    width: '158px',
    height: '29px',
  },
  sidebar: {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    top: '163px',
    left: '95px',
  },
  button: {
    width: '218px',
    height: '54px',
    borderRadius: '10px',
    background: '#2D119C',
    border: 'none',
    color: '#ffffff',
    fontSize: '32px',
    fontWeight: '400',
    lineHeight: '39.2px',
    cursor: 'pointer',
    marginBottom: '80px',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
  },
  buttonText: {
    fontFamily: 'Gilroy-SemiBold',
    textAlign: 'center',
  },
  personContainer: {
    position: 'absolute',
    top: '120px',
    left: '400px',
    width: '200px',
    height: '400px',
    borderRadius: '10px',
    border: '2px solid lime',
    overflow: 'hidden',
  },
  personImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  safetyIcons: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    position: 'absolute',
    top: '120px',
    left: '660px',
    height: '400px',
    gap: '10px',
  },
  icon: {
    width: '80px',
    height: '80px',
  },
  detailsContainer: {
    position: 'absolute',
    top: '120px',
    left: '820px',
    width: '320px',
    height: '400px',
    borderRadius: '10px',
    background: 'rgba(69, 42, 178, 0.8)',
    padding: '15px',
    boxSizing: 'border-box',
  },
  details: {
    borderRadius: '10px',
    padding: '10px',
    color: 'white',
  },
  detailsTitle: {
    fontSize: '24px',
    textAlign: 'center',
    marginBottom: '15px',
  },
  detailItem: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '15px',
  },
  detailLabel: {
    fontSize: '18px',
    fontWeight: '400',
    marginBottom: '5px',
  },
  detailInput: {
    fontSize: '16px',
    padding: '5px',
    borderRadius: '5px',
    border: '1px solid white',
    background: 'transparent',
    color: 'white',
  },
  homeIcon: {
    position: 'absolute',
    top: '10px',
    right: '20px',
    width: '52px',
    height: '48px',
    cursor: 'pointer',
  },
  rfidContainer: {
    position: 'absolute',
    bottom: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    background: 'rgba(255, 255, 255, 0.8)',
    padding: '10px',
    borderRadius: '10px',
  },
  rfidData: {
    color: 'black',
  },
  loading: {
    color: 'black',
  },

  //===============


};

export default AdminDashBoard;
