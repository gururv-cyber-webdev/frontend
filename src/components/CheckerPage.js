// src/components/CheckerPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/CheckerPage.css'; // Make sure to create this file
import { useNavigate } from 'react-router-dom';

const CheckerPage = () => {
    const [pendingSchemes, setPendingSchemes] = useState([]);
    const [selectedScheme, setSelectedScheme] = useState(null);
    const navigate = useNavigate(); 
    const [minAge, setMinAge] = useState('');
    const [maxAge, setMaxAge] = useState('');
    const [income, setIncome] = useState('');
    const [caste, setCaste] = useState('');
    const [community, setCommunity] = useState('');
    const [religion, setReligion] = useState('');
    const [isphysicallyChallenged, setIsphysicallyChallenged] = useState(false);
    const [link_to_scheme, setLinkToScheme] = useState('');
    const token = localStorage.getItem('token');

    const fetchPending = async () => {
        const res = await axios.get('https://smartgov-backend.onrender.com/api/checker/pending-schemes', {
            headers: { Authorization: `Bearer ${token}` }
        });
        setPendingSchemes(res.data);
    };

    const approveScheme = async () => {
        const data = new FormData();
        data.append('minAge', minAge);
        data.append('maxAge', maxAge);
        data.append('income', income);
        data.append('caste', caste);
        data.append('community', community);
        data.append('religion', religion);
        data.append('isPhysicallyChallenged', isphysicallyChallenged ? 'true' : 'false');
        data.append('link_to_scheme', link_to_scheme);

        try {
            await axios.post(
                `https://smartgov-backend.onrender.com/api/checker/approve-scheme/${selectedScheme._id}`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );
            alert("Scheme verified and added!");
            setSelectedScheme(null);
            fetchPending();
            navigate('/CheckerProfile'); // Redirect to Checker Profile
        } catch (error) {
            console.error(error.response?.data || error);
            alert("Approval failed");
        }
    };

    useEffect(() => {
        fetchPending();
    }, []);

    return (
        <div className="checker-container">
            <video autoPlay muted loop className="background-video">
                <source src="/bg.mp4" type="video/mp4" />
            </video>

            <div className="checker-content">
                <h2>Checker Panel</h2>
                {!selectedScheme ? (
                    <ul className="scheme-list">
                            {pendingSchemes.map(s => (
                            <li key={s._id}>
                                <h5>
                                    {s.schemeName}<br />
                                    <a href={s.link_to_scheme} target="_blank" rel="noopener noreferrer">
                                        {s.link_to_scheme}
                                    </a>
                                        <br />
                                    {s.submittedBy.name}<br />
                                    {s.submittedBy.email}
                                </h5>
                                <button onClick={() => setSelectedScheme(s)}>Verify</button>
                                <button onClick={() => navigate('/CheckerProfile')}>Back</button>
                            </li>
                            ))}
                    </ul>
                ) : (
                    <div className="form-section">
                        <h3>Approve Scheme: {selectedScheme.schemeName}</h3>
                        <input placeholder="Min Age" value={minAge} onChange={(e) => setMinAge(e.target.value)} />
                        <input placeholder="Max Age" value={maxAge} onChange={(e) => setMaxAge(e.target.value)} />
                        <input placeholder="Income Limit" value={income} onChange={(e) => setIncome(e.target.value)} />
                        <input placeholder="Caste" value={caste} onChange={(e) => setCaste(e.target.value)} />
                        <input placeholder="Community" value={community} onChange={(e) => setCommunity(e.target.value)} />
                        <input placeholder="Religion" value={religion} onChange={(e) => setReligion(e.target.value)} />
                        <select onChange={(e) => setIsphysicallyChallenged(e.target.value === 'true')}>
                            <option value="">Select Physically Challenged Status</option>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                        <input
                            placeholder="Link to Scheme"
                            value={link_to_scheme}
                            onChange={(e) => setLinkToScheme(e.target.value)}></input>
                        <div className="btn-group">
                            <button onClick={approveScheme}>Approve</button>
                            <button onClick={() => setSelectedScheme(null)}>Cancel</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CheckerPage;
