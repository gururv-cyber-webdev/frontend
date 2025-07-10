import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './styles/MakerProfile.css'; 

const MakerProfile = () => {
    const { email } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({});
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get('https://smartgov-backend.onrender.com/api/maker/profile', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUser(res.data);
                setFormData(res.data);
            } catch (err) {
                console.error(err);
                alert('Error fetching profile');
            }
        };
        fetchUser();
    }, [email]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        try {
            await axios.put(`https://smartgov-backend.onrender.com/api/maker/update/${user._id}`, formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert("Profile updated successfully");
            setEditing(false);
            navigate('/MakerProfile');
        } catch (err) {
            console.error(err);
            alert("Update failed");
        }
    };

    if (!user) return <p>Loading...</p>;

    return (
        <div className="maker-container">
            <video autoPlay muted loop className="background-video">
                <source src="/bg.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            <div className="maker-content">
                {/* LEFT SIDE – DISPLAY INFO ONLY */}
                <div className="maker-left">
                    <img
                        src={`https://smartgov-backend.onrender.com/uploads/${user.photo}`}
                        alt="Profile"
                        className="profile-pic"
                    />
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Age:</strong> {user.age}</p>
                    <p><strong>Address:</strong> {user.address}</p>
                    <p><strong>Annual Income:</strong> {user.income}</p>
                    <p><strong>Caste:</strong> {user.caste}</p>
                    <p><strong>Community:</strong> {user.community}</p>
                    <p><strong>Religion:</strong> {user.religion}</p>
                    <p><strong>DOB:</strong> {user.dob?.substring(0, 10)}</p>
                    <p><strong>Physically Challenged:</strong> {user.isPhysicallyChallenged ? 'Yes' : 'No'}</p>
                    <p><strong>Occupation:</strong> {user.occupation}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Phone:</strong> {user.phone}</p>
                    <p><strong>Gov Email:</strong> {user.govEmail}</p>
                    <p><strong>ID Proof:</strong>
                        <a href={`https://smartgov-backend.onrender.com/uploads/${user.govIdCard}`} target="_blank" rel="noreferrer">View</a>
                    </p>
                </div>

                {/* RIGHT SIDE – ONLY ACTIONS */}
                <div className="maker-right">
                    <h2>Actions</h2>
                    {editing ? (
                        <>
                            <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
                            <input name="age" value={formData.age} onChange={handleChange} placeholder="Age" />
                            <input name="address" value={formData.address} onChange={handleChange} placeholder="Address" />
                            <input name="income" value={formData.income} onChange={handleChange} placeholder="Income" />
                            <input name="caste" value={formData.caste} onChange={handleChange} placeholder="Caste" />
                            <input name="community" value={formData.community} onChange={handleChange} placeholder="Community" />
                            <input name="religion" value={formData.religion} onChange={handleChange} placeholder="Religion" />
                            <input type="date" name="dob" value={formData.dob?.substring(0, 10)} onChange={handleChange} />
                            <select name="isPhysicallyChallenged" value={formData.isPhysicallyChallenged} onChange={handleChange}>
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </select>
                            <input name="occupation" value={formData.occupation} onChange={handleChange} placeholder="Occupation" />
                            <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" />
                            <input name="govEmail" value={formData.govEmail} onChange={handleChange} placeholder="Gov Email" />
                            <button onClick={handleSubmit}>Save</button>
                            <button onClick={() => setEditing(false)}>Cancel</button>
                        </>
                    ) : (
                        <>
                            <button onClick={() => setEditing(true)}>Edit Profile</button>
                            <button onClick={() => navigate('/maker')}>Update New Scheme</button>
                            <button onClick={() => navigate('/login')}>Go Back</button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MakerProfile;
