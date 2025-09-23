import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import PatientHistory from './pages/PatientHistory.jsx';

function App() {
    const [user, setUser] = useState(null);
    const handleLogin = (loggedInUser) => setUser(loggedInUser);
    const handleLogout = () => setUser(null);

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

    return (
        <Router>
            <div className="min-h-screen bg-gray-100">
                <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-16">
                            <h1 className="text-xl font-bold text-gray-800">Fluid Monitoring Dashboard</h1>
                            <div className="flex items-center">
                                <span className="text-gray-700 mr-4">Welcome, {user.name}</span>
                                <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </nav>
                <main className="pt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Routes>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/patient/:bedId" element={<PatientHistory />} />
                        <Route path="*" element={<Navigate to="/dashboard" />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}
export default App;