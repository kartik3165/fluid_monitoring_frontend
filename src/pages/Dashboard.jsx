import React, { useState, useEffect } from 'react';
import BedCard from '../components/BedCard';
import { getStatus } from '../api/mockApi';

const Dashboard = () => {
    const [beds, setBeds] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getStatus();
                console.log('Fetched data:', data); // <-- ADD THIS LINE
                setBeds(data);
            } catch (error) {
                console.error("Failed to fetch status:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
        const intervalId = setInterval(fetchData, 3000);
        return () => clearInterval(intervalId);
    }, []);

    console.log('Component is rendering with state:', { loading, beds }); // <-- AND ADD THIS LINE

    if (loading) {
        return <div className="text-center p-10">Loading...</div>;
    }

    return (
        <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Ward Overview</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {beds.map((bed) => (
                    <BedCard key={bed.id} bed={bed} />
                ))}
            </div>
        </div>
    );
};

export default Dashboard;