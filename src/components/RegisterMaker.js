// src/components/RegisterMaker.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles/RegisterMaker.css'; //  New CSS file

const RegisterMaker = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '', age: '', address: '', income: '', caste: '', community: '',
        religion: '', dob: '', physicallyChallenged: '', occupation: '',
        email: '', phone: '', password: '', govEmail: ''
    });

    const [photo, setPhoto] = useState(null);
    const [govIdCard, setGovIdCard] = useState(null);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.entries(formData).forEach(([key, value]) => data.append(key, value));
        data.append("photo", photo);
        data.append("govIdCard", govIdCard);
        data.append("role", "maker");

        await axios.post("https://smartgov-backend.onrender.com/api/auth/register", data);
        alert("Maker registration submitted for approval! Kindly wait for admin approval.");
        navigate('/');
    };

    return (
        <div className="maker-container">
            <video autoPlay muted loop className="background-video">
                <source src="/bg.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            <form className="maker-form" onSubmit={handleSubmit} encType="multipart/form-data">
                <h2>Register as Maker</h2>

                <div className="form-field">
                    <label>Name</label>
                    <input name="name" onChange={handleChange} />
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
                    <label>Annual Income</label>
                    <input name="income" onChange={handleChange} />
                </div>

                <div className="form-field">
                    <label>Religion</label>
                    <select name="religion" onChange={handleChange}>
                        <option value="">Select Religion</option>
                        <option value="Hindu">Hindu</option>
                        <option value="Muslim">Muslim</option>
                        <option value="Christian">Christian</option>
                    </select>
                </div>

                <div className="form-field">
                    <label>Community</label>
                    <select name="community" onChange={handleChange}>
                        <option value="">Select Community</option>
                        <option value="BC">BC</option>
                        <option value="MBC">MBC</option>
                        <option value="OC">OC</option>
                        <option value="SC">SC</option>
                        <option value="ST">ST</option>
                    </select>
                </div>

                <div className="form-field">
                    <label>Caste</label>
                    <input name="caste" onChange={handleChange} />
                </div>

                <div className="form-field">
                    <label>Date of Birth</label>
                    <input name="dob" type="date" onChange={handleChange} />
                </div>

                <div className="form-field">
                    <label>Physically Challenged</label>
                    <select name="physicallyChallenged" onChange={handleChange}>
                        <option value="">Select</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                </div>

                <div className="form-field">
                    <label>Occupation</label>
                    <input name="occupation" onChange={handleChange} />
                </div>

                <div className="form-field">
                    <label>Email</label>
                    <input name="email" onChange={handleChange} />
                </div>

                <div className="form-field">
                    <label>Govt. Email</label>
                    <input name="govEmail" onChange={handleChange} />
                </div>

                <div className="form-field">
                    <label>Phone</label>
                    <input name="phone" onChange={handleChange} />
                </div>

                <div className="form-field">
                    <label>Password</label>
                    <input name="password" type="password" onChange={handleChange} />
                </div>

                <div className="form-field">
                    <label>Photo</label>
                    <input type="file" onChange={(e) => setPhoto(e.target.files[0])} />
                </div>

                <div className="form-field">
                    <label>Govt ID Card</label>
                    <input type="file" onChange={(e) => setGovIdCard(e.target.files[0])} />
                </div>

                <button type="submit">Register</button>
                <button type="button" onClick={() => navigate('/')}>Back To Home</button>
            </form>
        </div>
    );
};

export default RegisterMaker;
