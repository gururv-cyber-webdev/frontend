// src/components/UserProfile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles/UserProfile.css';

const UserProfile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [editing, setEditing] = useState(false);
    const [schemes, setSchemes] = useState([]);
    const token = localStorage.getItem('token');
    const [photo, setPhoto] = useState(null);
    const [idProof, setIdProof] = useState(null);

    const fetchProfile = async () => {
        const res = await axios.get('https://smartgov-backend.onrender.com/api/user/profile', {
            headers: { Authorization: `Bearer ${token}` }
        });
        setUser(res.data);
    };

    const updateProfile = async (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.entries(user).forEach(([key, val]) => data.append(key, val));
        if (photo) data.append('photo', photo);
        if (idProof) data.append('idProofImage', idProof);

        try {
            await axios.put('https://smartgov-backend.onrender.com/api/user/update-profile', data, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('Profile Updated!');
            navigate('/user')
            setSchemes([]);
            setEditing(false);
            fetchProfile();
        } catch (err) {
            console.error(err);
            alert("Update failed.");
        }
    };

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const fetchSchemes = async () => {
        const res = await axios.get('https://smartgov-backend.onrender.com/api/user/eligible-schemes', {
            headers: { Authorization: `Bearer ${token}` }
        });
        if (res.data.length === 0) {
            alert("No schemes found for your profile.");
            return;
        }
        alert("Schemes fetched successfully!");
        setSchemes(res.data);
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    return (
        <div className="user-profile-container">
            <video autoPlay muted loop className="background-video">
                <source src="/bg.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            <div className="profile-content">
                {/* Left Side: Info */}
                <div className="profile-left">
                    <img
                        src={`https://smartgov-backend.onrender.com/uploads/${user.photo}`}
                        alt="User"
                        className="profile-image"
                    />
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Age:</strong> {user.age}</p>
                    <p><strong>Occupation:</strong> {user.occupation}</p>
                    <p><strong>Income:</strong> {user.income}</p>
                    <p><strong>Caste:</strong> {user.caste}</p>
                    <p><strong>Religion:</strong> {user.religion}</p>
                    <p><strong>Community:</strong> {user.community}</p>
                    <p><strong>Address:</strong> {user.address}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                </div>

                {/* Right Side: Edit and Scheme */}
                <div className="profile-right">
                    {!editing ? (
                        <>
                            <button onClick={() => setEditing(true)}>Edit Profile</button>
                            <button onClick={fetchSchemes}>Search Eligible Schemes</button>
                            <button onClick={() => navigate('/login')}>Back</button>
                            <ul className="scheme-list">
                                {schemes.map(s => (
                                    <li key={s._id}>
                                        {s.schemeName}  {" "}
                                        <a href={s.eligibility.link_to_scheme} target="_blank" rel="noopener noreferrer">
                                        View Scheme
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </>
                    ) : (
                        <form className="profile-edit-form" onSubmit={updateProfile}>
                            <h2>Edit Profile</h2>
                            <input name="name" value={user.name || ''} onChange={handleChange} placeholder="Name" />
                            <input name="email" value={user.email || ''} onChange={handleChange} placeholder="Email" />
                            <input name="password" onChange={handleChange} placeholder="Password" type="password" />
                            <input name="dob" value={user.dob || ''} type="date" onChange={handleChange} />
                            <input name="age" value={user.age || ''} onChange={handleChange} placeholder="Age" />
                            <input name="address" value={user.address || ''} onChange={handleChange} placeholder="Address" />
                            <input name="caste" value={user.caste || ''} onChange={handleChange} placeholder="Caste" />
                            <select name="religion" value={user.religion || ''} onChange={handleChange}>
                                <option>Religion</option>
                                <option>HINDU</option>
                                <option>MUSLIM</option>
                                <option>CHRISTIAN</option>
                            </select>
                            <select name="community" value={user.community || ''} onChange={handleChange}>
                                <option>Community</option>
                                <option>BC</option>
                                <option>MBC</option>
                                <option>OC</option>
                                <option>SC</option>
                                <option>ST</option>
                            </select>
                            <input name="income" value={user.income || ''} onChange={handleChange} placeholder="Annual Income" />
                            <input name="occupation" value={user.occupation || ''} onChange={handleChange} placeholder="Occupation" />
                            <input name="phone" value={user.phone || ''} onChange={handleChange} placeholder="Phone" />
                            <input name="idProofType" value={user.idProofType || ''} onChange={handleChange} placeholder="ID Proof Type" />
                            <label>ID Proof:</label>
                            <input type="file" onChange={(e) => setIdProof(e.target.files[0])} />
                            <label>Photo:</label>
                            <input type="file" onChange={(e) => setPhoto(e.target.files[0])} />
                            <select name="isPhysicallyChallenged" value={user.isPhysicallyChallenged || 'no'} onChange={handleChange}>
                                <option value="no">No</option>
                                <option value="yes">Yes</option>
                            </select>
                            <button type="submit">Save Changes</button>
                            <button type="button" onClick={() => setEditing(false)}>Cancel</button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
