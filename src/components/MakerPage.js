// src/components/MakerPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles/MakerPage.css'; // Custom styles


const MakerPage = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        department: '',
        origin: '',
        schemeName: '',
        announcedDate: '',
        source: '',
        link_to_scheme: ''
    });

    const token = localStorage.getItem('token');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://smartgov-backend.onrender.com/api/maker/submit-scheme', form, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert("Scheme submitted for review!");
            navigate('/MakerProfile'); // Redirect to Maker Profile
        } catch (err) {
            alert("Submission failed");
            console.error(err);
        }
    };

    return (
        <div className="maker-container">
            <video autoPlay muted loop className="background-video">
                <source src="/bg.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <form className="maker-form" onSubmit={handleSubmit}>
                <h2>Submit a New Scheme</h2>

                <label>Department</label>
                <input name="department" placeholder="Department" onChange={handleChange} />

                <label>Origin</label>
                <input name="origin" placeholder="Your Location" onChange={handleChange} />

                <label>Scheme Name</label>
                <input name="schemeName" placeholder="Scheme Name" onChange={handleChange} />

                <label>Announced Date</label>
                <input name="announcedDate" type="date" onChange={handleChange} />

                <label>Source</label>
                <input name="source" placeholder="Where did you hear about it?" onChange={handleChange} />

                <label>Link</label>
                <input name="link_to_scheme" placeholder="Link to more info" onChange={handleChange} />

                <button type="submit">Submit Scheme</button>
            </form>
        </div>
    );
};

export default MakerPage;
