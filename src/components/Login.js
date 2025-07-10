// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles/Login.css'; // 👈 Add your separate CSS

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const login = async () => {
        try {
            const res = await axios.post('https://smartgov-backend.onrender.com/api/auth/login', { email, password });
            const { role, status } = res.data.user;
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('role', role);

            if (role === 'admin') {
                navigate('/admin');
            } else if (status === 'pending') {
                alert('Your account is not verified by admin yet.');
            } else {
                if (role === 'maker') navigate(`/MakerProfile/${email}`);
                else if (role === 'checker') navigate(`/CheckerProfile/${email}`);
                else if (role === 'user') navigate('/user');
                else alert('Unknown role!');
            }
        } catch (err) {
            alert("Login Failed");
        }
    };

    return (
        <div className="login-container">
            <video autoPlay loop muted className="login-background">
                <source src="/bg.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className="login-box">
                <h2>Login</h2>
                <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" />
                <button onClick={login}>Login</button>
                <button onClick={() => navigate('/')}>Back to Home</button>
            </div>
        </div>
    );
};

export default Login;
