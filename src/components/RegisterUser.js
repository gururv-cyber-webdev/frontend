// src/components/RegisterUser.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles/RegisterUser.css'; //  CSS file we'll create


const RegisterUser = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: '', email: '', password: '', dob: '', age: '', address: '',
        caste: '', religion: '', community: '', income: '', occupation: '',
        phone: '', idProofType: '', isPhysicallyChallenged: 'no'
    });
    const [photo, setPhoto] = useState(null);
    const [idProof, setIdProof] = useState(null);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.entries(form).forEach(([key, val]) => data.append(key, val));
        data.append('photo', photo);
        data.append('idProofImage', idProof);
        data.append('role', 'user');

        try {
            await axios.post('https://smartgov-backend.onrender.com/api/auth/register', data);
            alert("Registered!");
            navigate('/login');
        } catch (err) {
            console.error(err);
            alert("Registration failed.");
        }
    };

    return (
        <div className="register-container">
            <video autoPlay muted loop className="background-video">
                <source src="/bg.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <form className="register-form" onSubmit={handleSubmit} encType="multipart/form-data">
                <h2>User Registration</h2>

                <div className="form-field">
                    <label>Name</label>
                    <input name="name" onChange={handleChange} />
                </div>

                <div className="form-field">
                    <label>Email</label>
                    <input name="email" onChange={handleChange} />
                </div>

                <div className="form-field">
                    <label>Password</label>
                    <input name="password" type="password" onChange={handleChange} />
                </div>

                <div className="form-field">
                    <label>Date of Birth</label>
                    <input name="dob" type="date" onChange={handleChange} />
                </div>

                <div className="form-field">
                    <label>Age</label>
                    <input name="age" onChange={handleChange} />
                </div>

                <div className="form-field">
                    <label>Address</label>
                    <input name="address" onChange={handleChange} />
                </div>

                <div className="form-field">
                    <label>Caste</label>
                    <input name="caste" onChange={handleChange} />
                </div>

                <div className="form-field">
                    <label>Religion</label>
                    <select name="religion" onChange={handleChange}>
                    <option value="">--Select--</option>
                    <option>HINDU</option>
                    <option>MUSLIM</option>
                    <option>CHRISTIAN</option>
                    </select>
                </div>

                <div className="form-field">
                    <label>Community</label>
                    <select name="community" onChange={handleChange}>
                    <option value="">--Select--</option>
                    <option>BC</option>
                    <option>MBC</option>
                    <option>OC</option>
                    <option>SC</option>
                    <option>ST</option>
                    </select>
                </div>

                <div className="form-field">
                    <label>Annual Income</label>
                    <input name="income" onChange={handleChange} />
                </div>

                <div className="form-field">
                    <label>Occupation</label>
                    <input name="occupation" onChange={handleChange} />
                </div>

                <div className="form-field">
                    <label>Phone</label>
                    <input name="phone" onChange={handleChange} />
                </div>

                <div className="form-field">
                    <label>ID Proof Type</label>
                    <input name="idProofType" onChange={handleChange} />
                </div>

                <div className="form-field">
                    <label>ID Proof</label>
                    <input type="file" onChange={(e) => setIdProof(e.target.files[0])} />
                </div>

                <div className="form-field">
                    <label>Photo</label>
                    <input type="file" onChange={(e) => setPhoto(e.target.files[0])} />
                </div>

                <div className="form-field">
                    <label>Physically Challenged</label>
                    <select name="isPhysicallyChallenged" onChange={handleChange}>
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                    </select>
                </div>

                <button type="submit">Register</button>
                <button type="button" onClick={() => navigate('/')}>Back To Home</button>
            </form>
        </div>
    );
};

export default RegisterUser;
