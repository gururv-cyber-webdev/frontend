// src/components/UserProfile.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles/UserProfile.css';          // make sure this path & name exist

// ⚡️  CHANGE THIS for production or read from .env
const BASE_URL ='http://localhost:5000';

const UserProfile = () => {
  const navigate = useNavigate();

  /** -------------------- state -------------------- **/
  const [loading, setLoading] = useState(true);  // true until first fetch finishes
  const [user, setUser] = useState(null);        // full user object from API
  const [editing, setEditing] = useState(false); // edit‑mode flag
  const [schemes, setSchemes] = useState([]);    // eligible schemes list

  // form state kept separate so we can cancel edits
  const [formData, setFormData] = useState({});

  // file inputs
  const [photo, setPhoto] = useState(null);
  const [idProof, setIdProof] = useState(null);

  // auth
  const token = localStorage.getItem('token');

  /** -------------------- helpers -------------------- **/
  const authHeader = { Authorization: `Bearer ${token}` };

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${BASE_URL}/api/user/profile`, {
        headers: authHeader,
      });

      // normalise a couple of fields for the form
      const normalised = {
        ...data,
        isPhysicallyChallenged: data.isPhysicallyChallenged ? 'yes' : 'no',
        dob: data.dob ? data.dob.substring(0, 10) : '',
      };

      setUser(data);
      setFormData(normalised);
    } catch (err) {
      console.error(err);
      alert('Failed to fetch profile');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    // include only non‑empty values
    Object.entries(formData).forEach(([key, value]) => {
      if (value === '' || value === undefined) return;

      if (key === 'isPhysicallyChallenged') {
        data.append(key, value === 'yes'); // boolean for backend
      } else if (key !== 'password' || value) {
        data.append(key, value);
      }
    });

    if (photo) data.append('photo', photo);
    if (idProof) data.append('idProofImage', idProof);

    try {
      await axios.put(`${BASE_URL}/api/user/update`, data, {
        headers: { ...authHeader, 'Content-Type': 'multipart/form-data' },
      });

      alert('Profile updated');
      setEditing(false);
      setSchemes([]);
      await fetchProfile();
      setPhoto(null);
      setIdProof(null);
    } catch (err) {
      console.error(err);
      alert(`Update failed: ${err?.response?.data?.message || err.message}`);
    }
  };

  const fetchSchemes = async () => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/api/user/eligible-schemes`,
        { headers: authHeader }
      );

      if (data.length === 0) {
        alert('No schemes found for your profile');
        return;
      }
      setSchemes(data);
    } catch (err) {
      console.error(err);
      alert('Failed to fetch schemes');
    }
  };

  /** -------------------- render -------------------- **/
  if (loading) return <p className="loading">Loading…</p>;
  if (!user) return <p className="loading">No user data.</p>;

  return (
    <div className="profile-container">
      {/* background video */}
      <video autoPlay muted loop className="background-video">
        <source src="/bg.mp4" type="video/mp4" />
        Your browser does not support the video tag
      </video>

      <div className="profile-card">
        {/* ---------------- left panel ---------------- */}
        <div className="profile-left">
          <img
            src={
              user.photo
                ? `${BASE_URL}/uploads/${user.photo}`
                : '/placeholder-avatar.png'
            }
            alt="User"
            className="avatar"
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
          <p>
            <strong>Gov ID:</strong>{' '}
            {user.idProofImage ? (
              <a
                href={`${BASE_URL}/uploads/${user.idProofImage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="view-link"
              >
                View
              </a>
            ) : (
              '—'
            )}
          </p>
        </div>

        {/* ---------------- right panel ---------------- */}
        <div className="profile-right">
          {editing ? (
            <form className="edit-form" onSubmit={handleSubmit}>
              {/* text inputs */}
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                required
              />
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
              />
              <input
                name="password"
                type="password"
                value={formData.password || ''}
                onChange={handleChange}
                placeholder="New password (leave blank to keep)"
              />
              <input
                name="dob"
                type="date"
                value={formData.dob}
                onChange={handleChange}
              />
              <input
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Age"
              />
              <input
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Address"
              />
              <input
                name="caste"
                value={formData.caste}
                onChange={handleChange}
                placeholder="Caste"
              />
              <input
                name="income"
                value={formData.income}
                onChange={handleChange}
                placeholder="Income"
              />
              <input
                name="occupation"
                value={formData.occupation}
                onChange={handleChange}
                placeholder="Occupation"
              />
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone"
              />
              <input
                name="idProofType"
                value={formData.idProofType}
                onChange={handleChange}
                placeholder="Gov ID type"
              />

              {/* selects */}
              <select
                name="religion"
                value={formData.religion}
                onChange={handleChange}
              >
                <option value="">Religion</option>
                <option value="HINDU">Hindu</option>
                <option value="MUSLIM">Muslim</option>
                <option value="CHRISTIAN">Christian</option>
              </select>
              <select
                name="community"
                value={formData.community}
                onChange={handleChange}
              >
                <option value="">Community</option>
                <option value="BC">BC</option>
                <option value="MBC">MBC</option>
                <option value="OC">OC</option>
                <option value="SC">SC</option>
                <option value="ST">ST</option>
              </select>
              <select
                name="isPhysicallyChallenged"
                value={formData.isPhysicallyChallenged}
                onChange={handleChange}
              >
                <option value="no">Physically challenged? No</option>
                <option value="yes">Physically challenged? Yes</option>
              </select>

              {/* files */}
              <label>
                Photo:
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                />
              </label>
              <label>
                ID proof image:
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setIdProof(e.target.files[0])}
                />
              </label>

              {/* buttons */}
              <div className="button-row">
                <button type="submit">Save changes</button>
                <button type="button" onClick={() => setEditing(false)}>
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <>
              <div className="button-row">
                <button onClick={() => setEditing(true)}>Edit profile</button>
                <button onClick={fetchSchemes}>Search eligible schemes</button>
                <button onClick={() => navigate('/login')}>Back</button>
              </div>

              {/* schemes list */}
              {schemes.length > 0 && (
                <ul className="scheme-list">
                  {schemes.map((s) => (
                    <li key={s._id}>
                      {s.schemeName}{' '}
                      <a
                        href={s.eligibility.link_to_scheme}
                        target="_blank"
                        rel="noreferrer"
                      >
                        View
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
