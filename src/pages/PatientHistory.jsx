import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getHistory } from '../api/mockApi';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const PatientHistory = () => {
    const { bedId } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const historyData = await getHistory(bedId);
                setData(historyData);
            } catch (error) {
                console.error("Failed to fetch patient history:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchHistory();
    }, [bedId]);

    if (loading) {
        return <div className="text-center p-10">Loading history...</div>;
    }

    if (!data) {
        return <div className="text-center p-10">No data found for this patient.</div>;
    }

    const { bed, fluidBag, history } = data;

    // Format the timestamp for the chart's X-axis
    const chartData = history.map(item => ({
        ...item,
        time: new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }));

    return (
        <div>
            {/* Replaced MUI Button with a styled Link component */}
            <Link to="/dashboard" className="inline-flex items-center mb-6 px-4 py-2 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors">
                {/* SVG icon for the back arrow */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Back to Dashboard
            </Link>

            {/* Header Text */}
            <h2 className="text-3xl font-bold text-gray-800">
                Fluid Level History for Bed {bed.bed_number}
            </h2>
            <p className="text-lg text-gray-600 mt-1">
                Patient: {bed.patient.name} | {fluidBag.type} Bag ({fluidBag.capacity_ml} mL)
            </p>

            {/* Replaced MUI Paper with a styled div for the chart container */}
            <div className="mt-6 bg-white rounded-lg shadow-md p-4" style={{ height: '400px' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis label={{ value: 'Fluid Level (mL)', angle: -90, position: 'insideLeft' }} />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="fluid_level" name="Fluid Level (mL)" stroke="#4f46e5" strokeWidth={2} dot={false} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default PatientHistory;