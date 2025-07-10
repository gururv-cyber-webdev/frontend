// src/components/MakerProfile.js
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './styles/MakerProfile.css';

const BASE_URL ='http://localhost:5000';

const MakerProfile = () => {
  const { email } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const token = localStorage.getItem('token');

  const authHeader = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/api/maker/profile`, {
          headers: authHeader,
        });

        const normalized = {
          ...data,
          dob: data.dob?.substring(0, 10) || '',
          isPhysicallyChallenged: data.isPhysicallyChallenged ? 'true' : 'false',
        };

        setUser(data);
        setFormData(normalized);
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
      const updated = {
        ...formData,
        isPhysicallyChallenged: formData.isPhysicallyChallenged === 'true',
      };

      await axios.put(`${BASE_URL}/api/maker/update/${user._id}`, updated, {
        headers: authHeader,
      });

      alert('Profile updated successfully');
      setEditing(false);
      navigate('/MakerProfile');
    } catch (err) {
      console.error(err);
      alert('Update failed');
    }
  };

  if (!user) return <p className="loading">Loading...</p>;

  return (
    <div className="maker-container">
      <video autoPlay muted loop className="background-video">
        <source src="/bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="maker-card">
        <div className="maker-left">
          <img
            src={`${BASE_URL}/uploads/${user.photo}`}
            alt="Profile"
            className="maker-avatar"
          />
          <p><strong>Name:</strong> {formData.name || user.name}</p>
          <p><strong>Age:</strong> {formData.age || user.age}</p>
          <p><strong>Address:</strong> {formData.address || user.address}</p>
          <p><strong>Annual Income:</strong> {formData.income || user.income}</p>
          <p><strong>Caste:</strong> {formData.caste || user.caste}</p>
          <p><strong>Community:</strong> {formData.community || user.community}</p>
          <p><strong>Religion:</strong> {formData.religion || user.religion}</p>
          <p><strong>DOB:</strong> {formData.dob?.substring(0, 10) || user.dob?.substring(0, 10)}</p>
          <p><strong>Physically Challenged:</strong> {formData.isPhysicallyChallenged ? 'Yes' : 'No' || user.isPhysicallyChallenged ? 'Yes' : 'No'}</p>
          <p><strong>Occupation:</strong> {formData.occupation || user.occupation}</p>
          <p><strong>Email:</strong> {formData.email || user.email}</p>
          <p><strong>Phone:</strong> {formData.phone || user.phone}</p>
          <p><strong>Gov Email:</strong> {formData.govEmail || user.govEmail}</p>
          <p><strong>ID Proof:</strong>{' '}
            <a
              href={`${BASE_URL}/uploads/${formData.govIdCard || user.govIdCard}`}
              target="_blank"
              rel="noreferrer"
              className="view-link"
            >
              View
            </a>
          </p>
        </div>

        <div className="maker-right">
          <h2>Actions</h2>
          {editing ? (
            <form className="edit-form" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
              <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
              <input name="age" value={formData.age} onChange={handleChange} placeholder="Age" />
              <input name="address" value={formData.address} onChange={handleChange} placeholder="Address" />
              <input name="income" value={formData.income} onChange={handleChange} placeholder="Income" />
              <input name="caste" value={formData.caste} onChange={handleChange} placeholder="Caste" />
              <input name="community" value={formData.community} onChange={handleChange} placeholder="Community" />
              <input name="religion" value={formData.religion} onChange={handleChange} placeholder="Religion" />
              <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
              <select name="isPhysicallyChallenged" value={formData.isPhysicallyChallenged} onChange={handleChange}>
                <option value="false">No</option>
                <option value="true">Yes</option>
              </select>
              <input name="occupation" value={formData.occupation} onChange={handleChange} placeholder="Occupation" />
              <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" />
              <input name="govEmail" value={formData.govEmail} onChange={handleChange} placeholder="Gov Email" />

              <div className="button-row">
                <button type="submit">Save</button>
                <button type="button" onClick={() => setEditing(false)}>Cancel</button>
              </div>
            </form>
          ) : (
            <div className="button-row">
              <button onClick={() => setEditing(true)}>Edit Profile</button>
              <button onClick={() => navigate('/maker')}>Update New Scheme</button>
              <button onClick={() => navigate('/login')}>Go Back</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MakerProfile;
