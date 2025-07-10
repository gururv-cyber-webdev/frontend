import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './styles/CheckerProfile.css'; // make sure to create this

const CheckerProfile = () => {
    const navigate = useNavigate();
    const { email } = useParams();
    const [user, setUser] = useState(null);
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({});
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get('https://smartgov-backend.onrender.com/api/checker/profile', {
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
            const updatedData = {
                ...formData,
                isPhysicallyChallenged:
                    formData.isPhysicallyChallenged === 'true' ||
                    formData.isPhysicallyChallenged === true ||
                    formData.isPhysicallyChallenged === 'Yes'
            };

            await axios.put(`https://smartgov-backend.onrender.com/api/checker/update/${user._id}`, updatedData, {
                headers: { Authorization: `Bearer ${token}` }
            });

            alert("Profile updated successfully");
            setEditing(false);
        } catch (err) {
            console.error(err);
            alert("Update failed");
        }
        navigate('/CheckerProfile');
    };

    if (!user) return <p>Loading...</p>;

    return (
        <div className="checker-profile-container">
            <video autoPlay muted loop className="background-video">
                <source src="/bg.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            <div className="profile-box">
                <div className="profile-left">
                    <img src={`https://smartgov-backend.onrender.com/uploads/${user.photo}`} alt="Profile" />
                    <p><strong>Name:</strong> {editing ? <input name="name" value={formData.name} onChange={handleChange} /> : formData.name}</p>
                    <p><strong>Age:</strong> {editing ? <input name="age" value={formData.age} onChange={handleChange} /> : formData.age}</p>
                    <p><strong>Address:</strong> {editing ? <input name="address" value={formData.address} onChange={handleChange} /> : formData.address}</p>
                    <p><strong>Annual Income:</strong> {editing ? <input name="income" value={formData.income} onChange={handleChange} /> : formData.income}</p>
                    <p><strong>Caste:</strong> {editing ? <input name="caste" value={formData.caste} onChange={handleChange} /> : user.caste}</p>
                    <p><strong>Community:</strong> {editing ? <input name="community" value={formData.community} onChange={handleChange} /> : formData.community}</p>
                    <p><strong>Religion:</strong> {editing ? <input name="religion" value={formData.religion} onChange={handleChange} /> : formData.religion}</p>
                    <p><strong>DOB:</strong> {editing ? <input type="date" name="dob" value={formData.dob?.substring(0, 10)} onChange={handleChange} /> : formData.dob?.substring(0, 10)}</p>
                    <p><strong>Physically Challenged:</strong> {editing ? (
                        <select name="isPhysicallyChallenged" value={formData.isPhysicallyChallenged} onChange={handleChange}>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                    ) : formData.isPhysicallyChallenged ? 'Yes' : 'No'}</p>
                    <p><strong>Occupation:</strong> {editing ? <input name="occupation" value={formData.occupation} onChange={handleChange} /> : formData.occupation}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Phone:</strong> {editing ? <input name="phone" value={formData.phone} onChange={handleChange} /> : formData.phone}</p>
                    <p><strong>Gov Email:</strong> {editing ? <input name="govEmail" value={formData.govEmail} onChange={handleChange} /> : formData.govEmail}</p>
                    <p><strong>Joining Date:</strong> {editing ? <input type="date" name="joiningDate" value={formData.joiningDate?.substring(0, 10)} onChange={handleChange} /> : formData.joiningDate?.substring(0, 10)}</p>
                    <p><strong>Department:</strong> {editing ? <input name="department" value={formData.department} onChange={handleChange} /> : formData.department}</p>
                    <p><strong>Gov ID Proof:</strong>
                        <a
                            href={`https://smartgov-backend.onrender.com/uploads/${user.govIdCard}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="view-link"
                        >
                            View
                        </a>
                    </p>
                </div>

                <div className="profile-right">
                    {editing ? (
                        <>
                            <button onClick={handleSubmit}>Save</button>
                            <button onClick={() => setEditing(false)} >Cancel</button>
                        </>
                    ) : (
                        <>
                            <button onClick={() => setEditing(true)}>Edit Profile</button>
                        </>
                    )}
                    <button onClick={() => navigate('/checker')} style={{ marginTop: '15px' }}>
                        UPDATE NEW SCHEME
                    </button>
                    <button onClick={() => navigate('/login')} style={{ marginTop: '15px' }}>
                        Go Back    
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CheckerProfile;
