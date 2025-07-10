// src/components/RegisterChecker.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles/RegisterChecker.css';

const RegisterChecker = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '', age: '', address: '', income: '', caste: '', community: '',
        religion: '', dob: '', physicallyChallenged: '', occupation: '', email: '',
        phone: '', password: '', govEmail: '', joiningDate: '', department: ''
    });

    const [photo, setPhoto] = useState(null);
    const [govIdCard, setGovIdCard] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        for (let key in formData) data.append(key, formData[key]);
        data.append("photo", photo);
        data.append("govIdCard", govIdCard);
        data.append("role", "checker");

        try {
            await axios.post("https://smartgov-backend.onrender.com/api/auth/register", data);
            alert("Checker registration submitted for approval!");
            navigate('/');
        } catch (error) {
            alert("Registration failed!");
            console.error(error);
        }
    };

    return (
        <div className="checker-container">
            <video autoPlay muted loop className="background-video">
                <source src="/bg.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <form className="checker-form" onSubmit={handleSubmit} encType="multipart/form-data">
                <h2>Register as Checker</h2>
                <div className="form-grid">
                    <div className="form-group">
                        <label>Name</label>
                        <input name="name" onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label>Age</label>
                        <input name="age" onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label>Address</label>
                        <input name="address" onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label>Annual Income</label>
                        <input name="income" onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label>Caste</label>
                        <input name="caste" onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label>Community</label>
                        <select name="community" onChange={handleChange}>
                            <option value="">Select</option>
                            <option>BC</option>
                            <option>MBC</option>
                            <option>OC</option>
                            <option>SC</option>
                            <option>ST</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Religion</label>
                        <select name="religion" onChange={handleChange}>
                            <option value="">Select</option>
                            <option>Hindu</option>
                            <option>Muslim</option>
                            <option>Christian</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Date of Birth</label>
                        <input name="dob" type="date" onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label>Physically Challenged</label>
                        <select name="physicallyChallenged" onChange={handleChange}>
                            <option value="">Select</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Occupation</label>
                        <input name="occupation" onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input name="email" onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label>Govt. Email</label>
                        <input name="govEmail" onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label>Phone</label>
                        <input name="phone" onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input name="password" type="password" onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label>Joining Date</label>
                        <input name="joiningDate" type="date" onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label>Department</label>
                        <input name="department" onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label>Photo</label>
                        <input type="file" onChange={(e) => setPhoto(e.target.files[0])} />
                    </div>

                    <div className="form-group">
                        <label>Govt ID Card</label>
                        <input type="file" onChange={(e) => setGovIdCard(e.target.files[0])} />
                    </div>
                </div>

                <button type="submit">Register</button>
                <button type="button" onClick={() => navigate('/')}>Back To Home</button>
            </form>
        </div>
    );
};

export default RegisterChecker;
