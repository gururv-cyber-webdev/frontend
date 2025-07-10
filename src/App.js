import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'; // Import global styles
import Home from './components/Home';
import RoleSelection from './components/RoleSelection';
import RegisterUser from './components/RegisterUser';
import RegisterMaker from './components/RegisterMaker';
import RegisterChecker from './components/RegisterChecker';
import Login from './components/Login';
import AdminPanel from './components/AdminPanel';
import MakerPage from './components/MakerPage';
import CheckerPage from './components/CheckerPage';
import UserProfile from './components/UserProfile';
import MakerProfile from './components/MakerProfile';
import CheckerProfile from './components/CheckerProfile';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<RoleSelection />} />
                <Route path="/register/user" element={<RegisterUser />} />
                <Route path="/register/maker" element={<RegisterMaker />} />
                <Route path="/register/checker" element={<RegisterChecker />} />
                <Route path="/login" element={<Login />} />
                <Route path="/admin" element={<AdminPanel />} />
                <Route path="/maker" element={<MakerPage />} />
                <Route path="/MakerProfile/:email?" element={<MakerProfile />} />
                <Route path="/checker" element={<CheckerPage />} />
                <Route path="/CheckerProfile/:email?" element={<CheckerProfile />} />
                <Route path="/user" element={<UserProfile />} />
            </Routes>
        </Router>
    );
};

export default App;

