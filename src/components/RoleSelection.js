// src/components/RoleSelection.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/styles/RoleSelection.css';


const RoleSelection = () => {
    const navigate = useNavigate();

    return (
        <div className="role-container">
            <video autoPlay muted loop className="background-video">
                <source src="bg.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            <div className="container">
                <div className="role-content">
                    <h2>Select Registration Type</h2>
                    <div className="role-buttons">
                        <button onClick={() => navigate('/register/user')}>User</button>
                        <button onClick={() => navigate('/register/maker')}>Maker</button>
                        <button onClick={() => navigate('/register/checker')}>Checker</button>
                        <button onClick={() => navigate('/')}>Back</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoleSelection;
