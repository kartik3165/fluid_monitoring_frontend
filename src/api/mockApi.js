// This object holds all our sample data, just like a database would.
const mockData = {
    beds: [
        { id: 1, bed_number: '101-A', ward: { id: 1, name: 'General Medicine' }, patient: { id: 10, name: 'John Doe' } },
        { id: 2, bed_number: '101-B', ward: { id: 1, name: 'General Medicine' }, patient: { id: 11, name: 'Jane Smith' } },
        { id: 3, bed_number: '102-A', ward: { id: 1, name: 'General Medicine' }, patient: { id: 12, name: 'Peter Jones' } },
        { id: 4, bed_number: '201-A', ward: { id: 2, name: 'Cardiology' }, patient: { id: 13, name: 'Mary Williams' } },
    ],
    fluidBags: {
        '1': { id: 1, type: 'IV', capacity_ml: 1000, current_level_ml: 850, threshold_low: 200, threshold_high: 900 },
        '2': { id: 2, type: 'Blood', capacity_ml: 500, current_level_ml: 150, threshold_low: 100, threshold_high: 450 },
        '3': { id: 3, type: 'Urine', capacity_ml: 2000, current_level_ml: 1850, threshold_low: 500, threshold_high: 1900 },
        '4': { id: 4, type: 'IV', capacity_ml: 1000, current_level_ml: 950, threshold_low: 200, threshold_high: 900 },
    },
    history: {
        '1': Array.from({ length: 24 }, (_, i) => ({ timestamp: new Date(Date.now() - (24 - i) * 3600000).toISOString(), fluid_level: 950 - i * 10 + (Math.random() - 0.5) * 20 })),
        '2': Array.from({ length: 24 }, (_, i) => ({ timestamp: new Date(Date.now() - (24 - i) * 3600000).toISOString(), fluid_level: 450 - i * 15 + (Math.random() - 0.5) * 20 })),
        '3': Array.from({ length: 24 }, (_, i) => ({ timestamp: new Date(Date.now() - (24 - i) * 3600000).toISOString(), fluid_level: 100 + i * 75 + (Math.random() - 0.5) * 40 })),
        '4': Array.from({ length: 24 }, (_, i) => ({ timestamp: new Date(Date.now() - (24 - i) * 3600000).toISOString(), fluid_level: 980 - i * 2 + (Math.random() - 0.5) * 10 })),
    }
};

// This function simulates fluid levels changing over time.
const simulateRealTimeUpdates = () => {
    Object.values(mockData.fluidBags).forEach(bag => {
        if (bag.type === 'IV' || bag.type === 'Blood') {
            bag.current_level_ml = Math.max(0, bag.current_level_ml - Math.random() * 5); // Level decreases
        } else if (bag.type === 'Urine') {
            bag.current_level_ml = Math.min(bag.capacity_ml, bag.current_level_ml + Math.random() * 5); // Level increases
        }
    });
};

// We run the simulation every 5 seconds to make the data feel "live".
setInterval(simulateRealTimeUpdates, 5000);

// --- Exported API Functions ---

// Simulates POST /login
export const login = (username, password) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if ((username.toLowerCase() === 'doctor' || username.toLowerCase() === 'nurse') && password === 'pass123') {
                resolve({ user: { name: username.charAt(0).toUpperCase() + username.slice(1), role: username.toLowerCase() } });
            } else {
                reject(new Error('Invalid credentials'));
            }
        }, 500); // 500ms delay
    });
};

// Simulates GET /status
export const getStatus = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const statusData = mockData.beds.map(bed => ({
                ...bed,
                fluidBag: mockData.fluidBags[bed.id]
            }));
            resolve(statusData);
        }, 500);
    });
};

// Simulates GET /history/:bedId
export const getHistory = (bedId) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const bed = mockData.beds.find(b => b.id === parseInt(bedId));
            const fluidBag = mockData.fluidBags[bedId];
            const historyData = mockData.history[bedId];
            resolve({ bed, fluidBag, history: historyData });
        }, 700);
    });
};