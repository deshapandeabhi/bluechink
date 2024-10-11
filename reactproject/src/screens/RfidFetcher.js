import axios from 'axios';

const BACKEND_URL = 'http://localhost:2001';

const getRfidReport = async () => {
  try {
    const response = await axios.get(`http://100.95.34.46:27001/get_status`);
    const data = response.data;
    console.log(response);  // Use console.log instead of print
    return data;
  } catch (error) {
    console.error('Error fetching RFID report:', error);
    throw error;
  }
};

export default getRfidReport;
