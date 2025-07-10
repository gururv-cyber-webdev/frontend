// src/components/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Home.css'; 
const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="home-container">
            <video autoPlay muted loop className="background-video">
                <source src="/bg.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            <div className="home-content">
                <h1>Welcome to Scheme Finder Portal</h1>
                <div className="home-buttons">
                    <button onClick={() => navigate('/login')}>Login</button>
                    <button onClick={() => navigate('/register')}>Register</button>
                </div>
            </div>
        </div>
    );
};

export default Home;
