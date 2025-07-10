// src/components/AdminPanel.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/AdminPanel.css'; 
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
    const [pendingUsers, setPendingUsers] = useState([]);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const fetchPending = async () => {
        const res = await axios.get('https://smartgov-backend.onrender.com/api/admin/pending-users', {
            headers: { Authorization: `Bearer ${token}` }
        });
        setPendingUsers(res.data);
    };

    const approveUser = async (id) => {
        await axios.post(`https://smartgov-backend.onrender.com/api/admin/approve/${id}`, {}, {
            headers: { Authorization: `Bearer ${token}` }
        });
        fetchPending();
    };

    useEffect(() => {
        fetchPending();
    }, []);

    return (
        <div className="admin-panel-container">
            <video autoPlay muted loop className="background-video">
                <source src="bg.mp4" type="video/mp4" />
            </video>

            <div className="admin-panel-content">
                <h2>Admin Panel – Verify Makers & Checkers</h2>
                <button onClick={() => navigate('/')} className="back-btn">
                    Back to Home    
                </button>
                <div className="table-wrapper">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Role</th>
                                <th>Email</th>
                                <th>ID Proof</th>
                                <th>Status</th>
                                <th>Approve</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pendingUsers.map(user => (
                                <tr key={user._id}>
                                    <td>{user.name}</td>
                                    <td>{user.role}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <a href={`https://smartgov-backend.onrender.com/uploads/${user.govIdCard}`} target="_blank" rel="noopener noreferrer">
                                            <button className="view-btn">View</button>
                                        </a>
                                    </td>
                                    <td>{user.status}</td>
                                    <td>
                                        <button className="approve-btn" onClick={() => approveUser(user._id)}>
                                            Approve
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;
