// import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';

// import './AdminLogin.css';

// const AdminLogin = () => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const history = useHistory();

//     const handleLogin = () => {  
//         if (username === 'admin' && password === 'admin123') {
//             alert('Login successful!');
//             history.push('/main'); // Navigate to '/main' on successful login
//         } else {
//             alert('Invalid username or password!');
//         }
//     };

//     return (
//         <div style={{ width: '30%', margin: 'auto', marginTop: '15%', border: '1px solid #ccc', padding: '20px', borderRadius: '5px' }}>
//             <h2 style={{ textAlign: 'center' }}>Admin Login</h2>
//             <div>
//                 <label>Username:</label>
//                 <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
//             </div>
//             <div style={{ marginTop: '10px' }}>
//                 <label>Password:</label>
//                 <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//             </div>
//             <div style={{ marginTop: '20px', textAlign: 'center' }}>
//                 <button onClick={handleLogin}>Login</button>
//             </div>
//             <p>Don't have an account? <a href="#">Create Admin Account</a></p>
//         </div>
//     );
// }

// export default AdminLogin;
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'; // Import useHistory hook
import './AdminLogin.css';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory(); // Initialize useHistory hook

    // const handleLogin = () => {  
    //     if (username === 'admin' && password === 'admin123') {
    //         alert('Login successful!');
    //         history.push('/main'); // Navigate to '/main' on successful login
    //     } else {
    //         alert('Invalid username or password!');
    //     }
    // };

    const handleLogin = () => {  
        if (username === 'admin' && password === 'admin123') {
            alert('Admin Login successful!');
            window.location.href = '/main'; // Navigate to '/main' on successful login
        }
        else if(username == 'aiadmin' && password == 'aiadmin123') {
            alert('AI Login successful');
            window.location.href = '';
        }
         else {
            alert('Invalid username or password!');
        }
    };
    

    return (
        <div style={{ width: '30%', margin: 'auto', marginTop: '15%', border: '1px solid #ccc', padding: '20px', borderRadius: '5px' }}>
            <h2 style={{ textAlign: 'center' }}>Admin Login</h2>
            <div>
                <label>Username:</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div style={{ marginTop: '10px' }}>
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <button onClick={handleLogin}>Login</button>
            </div>
            <p>Don't have an account? <a href="#">Create Admin Account</a></p>
        </div>
    );
}

export default AdminLogin;
