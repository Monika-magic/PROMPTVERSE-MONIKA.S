import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const SimulationContext = createContext();

export const useSimulation = () => useContext(SimulationContext);

// Initial state of stadium zones
const initialZones = {
  'gate-a': { id: 'gate-a', name: 'Gate A', type: 'gate', crowdLevel: 'low', baseTraffic: 30 },
  'gate-b': { id: 'gate-b', name: 'Gate B', type: 'gate', crowdLevel: 'medium', baseTraffic: 50 },
  'gate-c': { id: 'gate-c', name: 'Gate C', type: 'gate', crowdLevel: 'low', baseTraffic: 20 },
  'food-1': { id: 'food-1', name: 'Food Court 1', type: 'food', crowdLevel: 'high', baseTraffic: 80, waitTime: 15 },
  'food-2': { id: 'food-2', name: 'Food Court 2', type: 'food', crowdLevel: 'low', baseTraffic: 30, waitTime: 5 },
  'restroom-1': { id: 'restroom-1', name: 'Restrooms North', type: 'restroom', crowdLevel: 'medium', baseTraffic: 60, waitTime: 8 },
  'restroom-2': { id: 'restroom-2', name: 'Restrooms South', type: 'restroom', crowdLevel: 'low', baseTraffic: 25, waitTime: 2 },
  'block-a': { id: 'block-a', name: 'Seating Block A', type: 'seating', crowdLevel: 'medium', baseTraffic: 50 },
  'block-b': { id: 'block-b', name: 'Seating Block B', type: 'seating', crowdLevel: 'high', baseTraffic: 90 },
  'block-c': { id: 'block-c', name: 'Seating Block C', type: 'seating', crowdLevel: 'low', baseTraffic: 40 },
};

// Graph representation for routing (distances/weights between nodes)
const stadiumGraph = {
  'gate-a': { 'food-1': 5, 'block-a': 10 },
  'gate-b': { 'food-1': 8, 'food-2': 7, 'block-b': 12 },
  'gate-c': { 'food-2': 5, 'block-c': 10 },
  'food-1': { 'gate-a': 5, 'gate-b': 8, 'restroom-1': 3, 'block-a': 5, 'block-b': 8 },
  'food-2': { 'gate-b': 7, 'gate-c': 5, 'restroom-2': 3, 'block-b': 8, 'block-c': 5 },
  'restroom-1': { 'food-1': 3, 'block-a': 4 },
  'restroom-2': { 'food-2': 3, 'block-c': 4 },
  'block-a': { 'gate-a': 10, 'food-1': 5, 'restroom-1': 4, 'block-b': 15 },
  'block-b': { 'gate-b': 12, 'food-1': 8, 'food-2': 8, 'block-a': 15, 'block-c': 15 },
  'block-c': { 'gate-c': 10, 'food-2': 5, 'restroom-2': 4, 'block-b': 15 }
};

export const SimulationProvider = ({ children }) => {
  const [zones, setZones] = useState(initialZones);
  const [alerts, setAlerts] = useState([]);
  const [isSimulating, setIsSimulating] = useState(true);

  // Function to calculate crowd level category based on a traffic score 0-100
  const getCrowdLevel = (traffic) => {
    if (traffic < 40) return 'low';
    if (traffic < 75) return 'medium';
    return 'high';
  };

  // Function to simulate real-time data fluctuations
  const tickSimulation = useCallback(() => {
    if (!isSimulating) return;

    setZones(prevZones => {
      const newZones = { ...prevZones };
      let newAlerts = [];

      Object.keys(newZones).forEach(key => {
        const zone = newZones[key];
        // Random fluctuation between -15 and +15
        const fluctuation = Math.floor(Math.random() * 31) - 15;
        let newTraffic = Math.max(0, Math.min(100, zone.baseTraffic + fluctuation));
        
        // Sometimes create a massive surge
        if (Math.random() > 0.95) {
           newTraffic = Math.min(100, newTraffic + 40);
        }

        const newLevel = getCrowdLevel(newTraffic);
        
        // Update wait times for food/restrooms based on traffic
        let newWaitTime = zone.waitTime;
        if (zone.type === 'food' || zone.type === 'restroom') {
          newWaitTime = Math.max(1, Math.floor((newTraffic / 100) * (zone.type === 'food' ? 25 : 15)));
        }

        newZones[key] = {
          ...zone,
          baseTraffic: newTraffic,
          crowdLevel: newLevel,
          ...(newWaitTime !== undefined && { waitTime: newWaitTime })
        };

        // Generate alerts for overcrowded areas
        if (newLevel === 'high' && zone.crowdLevel !== 'high') {
          newAlerts.push({
            id: Date.now() + Math.random(),
            message: `${zone.name} is currently overcrowded. Please avoid this area.`,
            type: 'warning'
          });
        }
      });

      // Keep only latest 3 alerts
      if (newAlerts.length > 0) {
        setAlerts(prev => [...newAlerts, ...prev].slice(0, 3));
      }

      return newZones;
    });
  }, [isSimulating]);

  useEffect(() => {
    const intervalId = setInterval(tickSimulation, 5000); // Update every 5 seconds
    return () => clearInterval(intervalId);
  }, [tickSimulation]);

  const updateZoneManual = (zoneId, overrideData) => {
    setZones(prev => ({
      ...prev,
      [zoneId]: { ...prev[zoneId], ...overrideData }
    }));
  };

  const addEmergencyAlert = (message) => {
    setAlerts(prev => [{
      id: Date.now(),
      message,
      type: 'danger'
    }, ...prev].slice(0, 3));
  };

  const toggleSimulation = () => setIsSimulating(!isSimulating);

  return (
    <SimulationContext.Provider value={{
      zones,
      alerts,
      isSimulating,
      toggleSimulation,
      updateZoneManual,
      addEmergencyAlert,
      stadiumGraph
    }}>
      {children}
    </SimulationContext.Provider>
  );
};
