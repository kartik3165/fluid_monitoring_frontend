import React, { useState, useEffect } from 'react';
import { PatientStatusCard } from '../components/PatientStatusCard';
import { getStatus } from '../api/mockApi';

const Dashboard = () => {
    const [beds, setBeds] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getStatus();
                setBeds(data);
            } catch (error) {
                console.error("Failed to fetch status:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold">Hospital Dashboard</h1>
                <p className="text-muted-foreground">Patient monitoring and status overview</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {beds.map((bed) => (
                    <PatientStatusCard key={bed.id} bed={bed} />
                ))}
            </div>
        </div>
    );
}
export default Dashboard;