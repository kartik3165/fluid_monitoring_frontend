import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import PatientHistory from './pages/PatientHistory.jsx';
import { DashboardLayout } from './components/DashboardLayout.jsx';
import { Patients } from './pages/Patients.jsx';
import { Alerts } from './pages/Alerts.jsx';
import { Settings } from './pages/Settings.jsx';

function App() {
    // --- These lines were missing ---
    const [user, setUser] = useState(null);
    const handleLogin = (loggedInUser) => setUser(loggedInUser);
    const handleLogout = () => setUser(null);
    
    // --- This logic for the logged-out state was also missing ---
    if (!user) {
        return (
            <Router>
                <Routes>
                    <Route path="/login" element={<Login onLoginSuccess={handleLogin} />} />
                    <Route path="*" element={<Navigate to="/login" />} />
                </Routes>
            </Router>
        );
    }

    // This is the view for a logged-in user
    return (
        <Router>
            <DashboardLayout user={user} onLogout={handleLogout}>
                <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/patient/:bedId" element={<PatientHistory />} />
                    <Route path="/patients" element={<Patients />} />
                    <Route path="/alerts" element={<Alerts />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="*" element={<Navigate to="/dashboard" />} />
                </Routes>
            </DashboardLayout>
        </Router>
    );
}
export default App;