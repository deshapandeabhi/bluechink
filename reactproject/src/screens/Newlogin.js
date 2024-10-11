import React, { useState } from 'react';
import Voltas from '../assets/Voltas 1.png';
import { useHistory } from 'react-router-dom';

const AdminLogin = () => {

  const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory(); 

  const handleLogin = () => {  
    if (username === 'admin' && password === 'admin123') {
        alert('Login successful!');
        window.location.href = '/admindashboard'; // Navigate to '/main' on successful login
    }
    else if(username == 'aiadmin' && password == 'aiadmin123') {
      alert('Login successful!');
        window.location.href = '/aidashboard'; 
    }
     else {
        alert('Invalid username or password!');
    }
};
    const containerStyle = {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: '100vh',
        background: 'linear-gradient(352.92deg, rgba(17,106,141,1) 0.64%, rgba(57,10,58,1) 103.3%)',
    };

    const loginBoxStyle = {
        background: 'rgba(68,24,124,0.9)',
        borderRadius: '20px',
        padding: '40px',
        width: '350px',
        height: '400px', // Adjust the height as needed
        opacity: '0.9',
        boxShadow: '0px 6px 10px rgba(0, 0, 0, 0.2)', // Adding outer shadow
    };
    
    const headingStyle = {
        color: 'white',
        textAlign: 'center',
        fontSize: '32px',
        
    };

    const inputGroupStyle = {
        position: 'relative',
        margin: '20px 0',
    };

    const inputStyle = {
        position: 'relative', // Set position to relative to make pseudo-elements absolute
        width: '100%',
        padding: '5px 40px', // Reduce the vertical padding as needed
        borderRadius: '10px',
        border: 'none',
        background: 'rgba(20,70,96,1)',
        color: 'white',
        fontSize: '18px',
        fontFamily: "'Gilroy-SemiBold', sans-serif",
    };
    
    
    const inputBeforeAfter = {
        content: "''",
        position: 'absolute',
        width: '100%',
        height: '10px', // Adjust the height as needed
        background: 'transparent',
        boxShadow: 'inset 0 6px 10px -10px rgba(0,0,0,0.5)', // Adjust the shadow values as needed
        pointerEvents: 'none', // Make sure pseudo-elements do not interfere with mouse events
        top: 0,
    };
    const iconStyle = {
        position: 'absolute',
        right: '10px',
        top: '50%',
        transform: 'translateY(-50%)',
        width: '24px',
        height: '24px',
        backgroundSize: 'contain',
    };

    const userIconStyle = {
        ...iconStyle,
        background: 'url("./src/assets/User.png") no-repeat center center',
    };

    const eyeIconStyle = {
        ...iconStyle,
        background: 'url("./src/assets/Eye.png") no-repeat center center',
    };

    const passwordResetStyle = {
        color: 'white',
        fontSize: '10px',
        display: 'block',
        textAlign: 'right',
        marginBottom: '50px',
        fontFamily: "'NTR', sans-serif",
       
    };

    const loginButtonStyle = {
        width: '200px', // Adjust the width as needed
        height: '40px', // Adjust the height as needed
        margin: '0 auto', // Add this line to center the button horizontally
        padding: '10px', // Adjust padding to center content vertically
        border: 'none',
        borderRadius: '10px',
        background: 'rgba(4,70,96,1)',
        color: 'white',
        fontSize: '20px',
        fontFamily: "'Gilroy-SemiBold', sans-serif",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0px 6px 10px rgba(0, 0, 0, 0.2)', // Adding outer shadow on bottom side
    };
    
    
    const loginIconStyle = {
        width: '24px',
        height: '24px',
        background: 'url("./src/assets/Login.png") no-repeat center center',
        backgroundSize: 'contain',
        marginRight: '10px',
    };

    const footerLinksStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '20px',
        fontFamily: "'NTR', sans-serif",
    };

    const footerLinkStyle = {
        color: 'white',
        fontSize: '10px',
    };

    const logoStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };

    const logoImgStyle = {
        width: '400px',
        height: 'auto',
    };

    return (
        <div style={containerStyle}>
            <div style={loginBoxStyle}>
                <h2 style={headingStyle}>Login</h2>
                <div style={inputGroupStyle}>
                    <input type="text" placeholder="Username" style={inputStyle} value={username} onChange={(e) => setUsername(e.target.value)}/>
                    <div style={inputBeforeAfter}></div>
                </div>
                <div style={inputGroupStyle}>
                    <input type="password" placeholder="Password" style={inputStyle} value={password} onChange={(e) => setPassword(e.target.value)} />
                    <div style={inputBeforeAfter}></div>
                </div>
                <div style={passwordResetStyle}>
                    <a href="#" style={{ color: 'white' }}>Forget Password?</a>
                </div>
                <button onClick={
                  handleLogin
                } style={loginButtonStyle}>
                    <i style={loginIconStyle}></i>Login
                </button>
                <div style={footerLinksStyle}>
                    <a href="#" style={footerLinkStyle}>Don't have an account</a>
                    <a href="#" style={footerLinkStyle}>Create account</a>
                </div>
            </div>
            <div style={logoStyle}>
                <img src={Voltas} alt='Voltas' height='100' width='500' />
            </div>
        </div>
    );
};

export default AdminLogin;
