import React from 'react';
import { useHistory } from 'react-router-dom';
import editsquare from '../assets/Edit square.png';
import delete1 from '../assets/Delete.png';
import voltas from '../assets/Voltas 2.png';
import home1 from '../assets/Home 1.png';
import search from '../assets/Search.png';
import addIcon from '../assets/addIcon.png';

const employees = [
  { id: 1, name: 'John Doe', empId: 'E101', department: 'HR' },
  { id: 2, name: 'Jane Smith', empId: 'E102', department: 'Finance' },
  { id: 3, name: 'Mike Johnson', empId: 'E103', department: 'IT' },
  { id: 4, name: 'Emily Davis', empId: 'E104', department: 'Marketing' },
  { id: 5, name: 'James Wilson', empId: 'E105', department: 'Sales' },
  { id: 6, name: 'Sarah Brown', empId: 'E106', department: 'R&D' },
  { id: 7, name: 'Chris Taylor', empId: 'E107', department: 'Support' },
  { id: 8, name: 'Anna Lee', empId: 'E108', department: 'HR' },
  { id: 9, name: 'David Martin', empId: 'E109', department: 'Finance' },
  { id: 10, name: 'Sophia Thompson', empId: 'E110', department: 'IT' },
  { id: 11, name: 'Daniel Moore', empId: 'E111', department: 'Marketing' },
  { id: 12, name: 'Ella White', empId: 'E112', department: 'Sales' },
  { id: 13, name: 'Matthew Harris', empId: 'E113', department: 'R&D' },
  { id: 14, name: 'Olivia Martin', empId: 'E114', department: 'Support' },
  { id: 15, name: 'Lucas Jackson', empId: 'E115', department: 'HR' },
  { id: 16, name: 'Ava Scott', empId: 'E116', department: 'Finance' },
  { id: 17, name: 'William Walker', empId: 'E117', department: 'IT' },
  { id: 18, name: 'Mia Young', empId: 'E118', department: 'Marketing' },
  { id: 19, name: 'Benjamin Allen', empId: 'E119', department: 'Sales' },
  { id: 20, name: 'Charlotte King', empId: 'E120', department: 'R&D' },
];

function HomeList() {
  const history = useHistory();

  const handleEdit = (id) => {
    alert(`Editing employee with ID: ${id}`);
  };

  const handleDelete = (id) => {
    alert(`Deleting employee with ID: ${id}`);
  };

  const handleAdd = () => {
    alert('Register new person');
    window.location.href =  '/registerdashboard';
  };

  return (
    <div style={styles.app}>
      <div style={styles.topBar}>
        <img src={voltas} alt="Voltas Logo" style={styles.logo} />
        <img src={home1} alt="Home" style={styles.icon} aria-label="Home" />
      </div>
      <div style={styles.headingContainer}>
        <h2 style={styles.heading}>List of Employees</h2>
        <img src={addIcon} alt="Add" style={styles.icon} aria-label="Add" onClick={handleAdd} />
        <img src={search} alt="Search" style={styles.icon} aria-label="Search" />
      </div>
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.headerRow}>
              <th style={styles.headerCell}>Sr. No.</th>
              <th style={styles.headerCell}>Name</th>
              <th style={styles.headerCell}>Employee Id</th>
              <th style={styles.headerCell}>Department</th>
              <th style={styles.headerCell}>Edit</th>
              <th style={styles.headerCell}>Delete</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp, index) => (
              <tr key={emp.id} style={styles.row}>
                <td style={styles.cell}>{index + 1}</td>
                <td style={styles.cell}>{emp.name}</td>
                <td style={styles.cell}>{emp.empId}</td>
                <td style={styles.cell}>{emp.department}</td>
                <td style={styles.cell}>
                  <img
                    src={editsquare}
                    alt="Edit Employee"
                    onClick={() => handleEdit(emp.id)}
                    style={{ cursor: 'pointer', width: '24px' }}
                    aria-label={`Edit ${emp.name}`}
                  />
                </td>
                <td style={styles.cell}>
                  <img
                    src={delete1}
                    alt="Delete Employee"
                    onClick={() => handleDelete(emp.id)}
                    style={{ cursor: 'pointer', width: '24px' }}
                    aria-label={`Delete ${emp.name}`}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const styles = {
  app: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    background: 'linear-gradient(180deg, rgba(68,24,124,1) 0%, rgba(11,143,194,1) 100%)',
    height: '100vh',
    width: '100vw',
    color: 'white',
    overflow: 'auto',
  },
  topBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: '20px',
  },
  logo: {
    height: '40px', // Reduced the size of the logo
  },
  headingContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: '0 20px', // Adjust padding for alignment
    marginTop: '10px', // Adjust margin-top to position below the top bar
  },
  heading: {
    fontSize: '32px',
    fontWeight: 'normal',
    lineHeight: '39.2px',
  },
  icon: {
    height: '40px',
    marginLeft: '10px',
    cursor: 'pointer',
  },
  tableContainer: {
    width: '100%',
    overflowX: 'auto',
    marginTop: '20px', // Add margin-top to provide space between heading and table
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  headerRow: {
    backgroundColor: 'rgba(106,43,183,0.8)',
  },
  headerCell: {
    padding: '10px',
    fontWeight: 'bold',
    border: '1px solid white',
    textAlign: 'left',
    fontSize: '24px',
    color: 'white',
  },
  row: {
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  cell: {
    padding: '10px',
    border: '1px solid white',
    color: 'white',
    fontSize: '18px',
  },
};

export default HomeList;
