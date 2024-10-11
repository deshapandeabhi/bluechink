import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';

import logo from '../assets/Voltas 2.png';
import homeIcon from '../assets/Home 1.png';
import icon1 from '../assets/Component 5.png';
import icon2 from '../assets/Safety Vest 1.png';
import icon3 from '../assets/Component 3.png';
import icon4 from '../assets/Component 4.png';
import person from '../assets/pers.png';
import employType from '../assets/employType.png';
import complent from '../assets/complent.png';
import download from '../assets/download.png';
import delet from '../assets/Delete.png';
// import InputTextFieldV from '../components/InputTextFieldV';
import axios from 'axios';
import { downloadExcel } from './DownloadExcel';
import * as XLSX from "xlsx";

class RFIDResponseModel {
  constructor(visitorComment, visitorComplianceCheck, visitorName, visitorStatus, workerComment, workerComplianceCheck, workerName, workerStatus, bootssmall, glovessmall, whiteHelmet, yellowHelmet, greenJacket, redJacket) {
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
    return new RFIDResponseModel(
      json['visitor_status']['comments'],
      json['visitor_status']['compliance_check'],
      json['visitor_status']['name'],
      json['visitor_status']['status'],
      json['worker_status']['comments'],
      json['worker_status']['compliance_check'],
      json['worker_status']['name'] || 'Not Mentioned',
      json['worker_status']['status'],
      json['item_statuses']['Boots, Small'],
      json['item_statuses']['Gloves, Small'],
      json['item_statuses']['Helmet, White'],
      json['item_statuses']['Helmet, Yellow'],
      json['item_statuses']['Jacket, Green'],
      json['item_statuses']['Jacket, Red']
    );
  }
}

class AIResponseModel {
  constructor(bootssmall, glovessmall, whiteHelmet, yellowHelmet, greenJacket, redJacket) {

    this.bootssmall = bootssmall;
    this.glovessmall = glovessmall;
    this.whiteHelmet = whiteHelmet;
    this.yellowHelmet = yellowHelmet;
    this.greenJacket = greenJacket;
    this.redJacket = redJacket;
  }

  static fromJson(json) {
    return new AIResponseModel(
      json['Boots'],
      json['Gloves'],
      json['Helmet, White'],
      json['Helmet, Yellow'],
      json['Jacket, Green'],
      json['Jacket, Red']
    );
  }

  toJson() {
    return {
      'Boots': this.bootssmall == null ? "null" :this.bootssmall ,
      'Gloves': this.glovessmall== null ? "null" :this.glovessmall ,
      'Helmet, White': this.whiteHelmet== null ? "null" :this.whiteHelmet ,
      'Helmet, Yellow': this.yellowHelmet== null ? "null" :this.yellowHelmet,
      'Jacket, Green': this.greenJacket== null ? "null" :this.greenJacket ,
      'Jacket, Red': this.redJacket== null ? "null" :this.redJacket ,
    };
  }
}


const AI_URL = 'http://98.130.71.23:3333/latest_detections';
const RFID_URL = 'http://98.130.71.23:3333/latest_rfid_detections';

const AIDashBoard = () => {
  const [personImage, setPersonImage] = useState(null);
  const [aiData, setAIData] = useState(null);
  const [rfidData, setRfidData] = useState(null);
  const [livestreamFrame, setLiveStream] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(AI_URL);
        const data = AIResponseModel.fromJson(response.data);
        setAIData(data);
      } catch (error) {
        console.error('Error fetching AI report:', error);
      }
    };

    const fetchRFIDData = async () => {
      try {
        const response = await axios.get(RFID_URL);
        const data = RFIDResponseModel.fromJson(response.data);
        setRfidData(data); // Assuming response is in the right format
      } catch (error) {
        console.error('Error fetching RFID data:', error);
      }
    };

    const fetchLiveStream = async () => {
      try {
        const response = await axios.get('http://98.130.71.23:3333/latest_frame');
        // console.error(response)
        setLiveStream(response); // Assuming response is in the right format
      } catch (error) {
        console.error('Error fetching RFID data:', error);
      }
    };

    // const refreshPage = () => {
    //   window.location.reload(); // Refresh the page
    // };

    fetchData(); // Initial call to fetch data
    fetchRFIDData();
    // fetchLiveStream();
    // refreshPage();
    const intervalId = setInterval(fetchData, 1000); // Fetch data every second
    const rfidIntervalId = setInterval(fetchRFIDData, 1000);
    const liveStreamIntervalId = setInterval(fetchLiveStream, 5000);
    // const lrefreshId = setInterval(refreshPage, 500);

    return () => {
      clearInterval(intervalId);
      clearInterval(rfidIntervalId);
      clearInterval(liveStreamIntervalId);
      // clearInterval(lrefreshId);
    }; // Cleanup interval on component unmount
  }, []);

  const handleHomeClick = () => {
    alert('Home button clicked!');
    window.location.href = '/homelist';
  };

  const getIconColor = (itemStatus) => {
    return itemStatus === 'Present' ? 'hue-rotate(90deg) brightness(0.8)' : 'hue-rotate(0deg) brightness(0.8)';
  };

  const handleDownloadClick = () => {
    downloadExcel(aiData.toJson);
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

  const renderIcons = () => {
    if (!aiData) return (
      <>
        <img src={icon1} alt="Icon 1" style={styles.icon} />
        <img src={icon2} alt="Icon 2" style={styles.icon} />
        <img src={icon3} alt="Icon 3" style={styles.icon} />
        <img src={icon4} alt="Icon 4" style={styles.icon} />
      </>
    );

    const { whiteHelmet, redJacket, glovessmall, bootssmall, yellowHelmet, greenJacket } = aiData;

    return (
      <>
        <img src={icon1} alt="Icon 1" style={{ ...styles.icon, filter: getIconColor(yellowHelmet) }} />
        <img src={icon2} alt="Icon 2" style={{ ...styles.icon, filter: getIconColor(redJacket) }} />
        <img src={icon3} alt="Icon 3" style={{ ...styles.icon, filter: getIconColor(glovessmall) }} />
        <img src={icon4} alt="Icon 4" style={{ ...styles.icon, filter: getIconColor(bootssmall) }} />
      </>
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
         <img src={icon} alt="icon" onClick={() => downloadExcelSheet(aiData.toJson())} style={styles.textfieldicon} />


        </div>
      </div>
    );
  };


  return (
    <div style={styles.container}>
      <img src={logo} alt="Logo" style={styles.logo} />
      <div style={styles.safetyIcons}>
        {renderIcons()}
        {/* <img src={icon1} alt="Icon 1" style={styles.icon} />
        <img src={icon2} alt="Icon 2" style={styles.icon} />
        <img src={icon3} alt="Icon 3" style={styles.icon} />
        <img src={icon4} alt="Icon 4" style={styles.icon} /> */}
      </div>

      {/* <div style={styles.headerButtons}>
        <button style={styles.button}><span style={styles.buttonText}>Employee</span></button>
        <button style={styles.button}><span style={styles.buttonText}>Worker</span></button>
        <button style={styles.button}><span style={styles.buttonText}>Visitor</span></button>
      </div> */}


      <div style={styles.mainrow}>
        <div style={styles.leftColumn}>
          <InputTextFieldV hintText={rfidData?.visitorStatus === 'Present' ? rfidData.visitorName : rfidData?.workerStatus === 'Present' ? rfidData.workerName : 'N/A'} icon={person} />
          <InputTextFieldV hintText="Employee Type" icon={employType} />
          {/* <InputTextFieldV hintText="Complent" icon={complent} /> */}
          {/* <div style={{
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
                // value={value}
                // onChange={(e) => setValue(e.target.value)}
                placeholder={'Complent'}
                style={{
                  border: 'none',
                  outline: 'none',
                  flex: 1,
                  fontSize: '16px', // adjust font size for better UI
                }}
              />
              <img src={complent} alt="icon" style={styles.textfieldicon} />

            </div>
          </div> */}

          <InputTextFieldV hintText="Download" icon={download} />
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '10px',
              border: '1px solid black',
              padding: '0 10px',
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
              height: '50px', // to maintain a consistent height
              width: '80%'
            }}>
              <h6 style={{ alignItems: 'center', justifyContent: 'center', left: '50%' }}>REGISTER</h6>
            </div>


            <div style={{
              backgroundColor: 'white',
              borderRadius: '10px',
              border: '1px solid black',
              padding: '20px 20px',

              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
              height: '50px', // to maintain a consistent height
              width: '80%'
            }}>
              <h6 style={{ alignItems: 'center', justifyContent: 'center', left: '50%' }}>START</h6>
            </div>
          </div>
        </div>
        <div style={styles.personContainer}>
          {/* <img
            src={livestreamFrame}
            alt="Live Stream"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          /> */}
          <iframe
            id="inlineFrameExample"
            title="Inline Frame Example"
            width="100%"
            height="100%"
            src='http://98.130.71.23:3333/video_stream'>
          </iframe>
          {/* <ReactPlayer
          url="http://192.168.1.7:5010/video_feed" // Replace with your MPEG-DASH stream URL
          playing
          controls
          width='100%'
          height='100%'
          config={{
            dash: {
              manifestUrl: 'http://192.168.1.7:5010/video_feed', // Same as url
            },
          }}
        /> */}
        </div>
      </div>

      {/* <div style={styles.detailsContainer}>
        <div style={styles.details}>
          <div style={styles.detailItem}>
            <span style={styles.detailLabel}>Name:</span>
            <input type="text" style={styles.detailInput} />
          </div>
          <div style={styles.detailItem}>
            <span style={styles.detailLabel}>Department:</span>
            <input type="text" style={styles.detailInput} />
          </div>
          <div style={styles.detailItem}>
            <span style={styles.detailLabel}>Employee Id:</span>
            <input type="text" style={styles.detailInput} />
          </div>
          <div style={styles.detailItem}>
            <span style={styles.detailLabel}>Manager:</span>
            <input type="text" style={styles.detailInput} />
          </div>
          <div style={styles.detailItem}>
            <span style={styles.detailLabel}>Remark:</span>
            <input type="text" style={styles.detailInput} />
          </div>
          <div style={styles.detailItem}>
            <span style={styles.detailLabel}>Remark:</span>
            <input type="text" style={styles.detailInput} />
          </div>
        </div>
      </div> */}

      <button onClick={handleHomeClick} style={styles.homeButton}>
        <img src={homeIcon} alt="Home" style={styles.homeIcon} />
      </button>

      {/* Display AI data  */}
      {/* <div style={styles.aiContainer}>
        {aiData ? (
          <pre style={styles.aiData}>{JSON.stringify(aiData, null, 2)}</pre>
        ) : (
          <p style={styles.loading}>Loading AI data...</p>
        )}
      </div> */}


      {/* <div style={styles.safetyIcons}>
        <img src={icon1} alt="Icon 1" style={styles.icon} />
        <img src={icon2} alt="Icon 2" style={styles.icon} />
        <img src={icon3} alt="Icon 3" style={styles.icon} />
        <img src={icon4} alt="Icon 4" style={styles.icon} />
      </div> */}
    </div>


  );
};

const styles = {
  container: {
    width: '100%',
    height: '832px',
    background: 'linear-gradient(0.37deg, rgba(11,143,194,1) 0.36%, rgba(68,24,124,1) 99.72%)',
    display: 'flex',
    position: 'relative',
    padding: '30px',
    boxSizing: 'border-box',
  },
  logo: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    width: '158px',
    height: '29px',
  },
  headerButtons: {
    display: 'flex',
    position: 'absolute',
    top: '157px',
    left: '594px',
    gap: '20px',
  },
  button: {
    width: '204px',
    height: '47px',
    borderRadius: '10px',
    border: '1px solid white',
    color: '#ffffff',
    fontSize: '30px',
    fontWeight: '400',
    lineHeight: '39.2px',
    background: '#4A1C9A',
    cursor: 'pointer',
  },
  buttonText: {
    textAlign: 'center',
  },
  // personContainer: {
  //   position: 'absolute',
  //   top: '150px',
  //   left: '2.5%',
  //   width: '35%',
  //   height: '550px',
  //   borderRadius: '10px',
  //   border: '2px solid lime',
  //   background: '#FFFFFF',
  //   display: 'flex',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   overflow: 'hidden',
  //   objectFit: 'cover'
  // },
  personImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  detailsContainer: {
    position: 'absolute',
    top: '276px',
    left: '640px',
    width: '615px',
    height: '360px',
    borderRadius: '10px',
    background: 'rgba(255, 255, 255, 0.2)',
    padding: '20px',
    boxSizing: 'border-box',
  },
  details: {
    background: 'transparent',
    borderRadius: '10px',
    padding: '20px',
  },
  aiContainer: {
    position: 'absolute',
    bottom: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    background: 'rgba(255, 255, 255, 0.8)',
    padding: '10px',
    borderRadius: '10px',
  },
  detailItem: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '8px',
  },
  detailLabel: {
    fontSize: '20px',
    fontWeight: '400',
    width: '150px',
    color: '#FFFFFF',
  },
  detailInput: {
    flexGrow: 1,
    fontSize: '20px',
    border: 'none',
    borderBottom: '2px solid white',
    background: 'transparent',
    color: 'white',
    padding: '5px',
    outline: 'none',
  },
  homeButton: {
    position: 'absolute',
    top: '10px',
    right: '20px',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '0',
  },
  homeIcon: {
    width: '52px',
    height: '48px',
  },
  safetyIcons: {
    display: 'flex',
    flexDirection: 'row',
    position: 'absolute',
    top: '50px',
    left: '450px',
    gap: '50px',
  },
  icon: {
    width: '94px',
    height: '90px',
    left: '100px',
    right: '100px'
  },
  textfieldicon: {
    width: '30px',
    height: '30px',
    // left: '100px',
    // right: '100px'
  },
  mainrow: {
    display: 'flex',
    flexDirection: 'row', // Ensure it's a row
    position: 'absolute',
    height: '100vh', // Make it take the full screen height
    width: '100%', // Ensure it takes the full width
    top: '20%'

  },
  leftColumn: {
    width: '40%', // Adjust the percentage to fit your layout
    display: 'flex',
    flexDirection: 'column',
    gap: '30px', // Adds space between text fields
    padding: '20px',
    boxSizing: 'border-box',
  },
  personContainer: {
    width: '55%', // Adjust the percentage to fit your layout
    height: '70%',
    borderRadius: '10px',
    border: '2px solid lime',
    background: '#FFFFFF',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    objectFit: 'cover',
  },
};

export default AIDashBoard;
