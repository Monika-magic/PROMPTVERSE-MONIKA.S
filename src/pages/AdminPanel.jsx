import React, { useState } from 'react';
import { useSimulation } from '../context/SimulationContext';
import { Settings, Play, Pause, AlertTriangle } from 'lucide-react';
import './AdminPanel.css';

const AdminPanel = () => {
  const { 
    zones, 
    isSimulating, 
    toggleSimulation, 
    updateZoneManual, 
    addEmergencyAlert 
  } = useSimulation();

  const [emergencyText, setEmergencyText] = useState('');

  const handleCrowdChange = (zoneId, newTraffic) => {
    let crowdLevel = 'low';
    if (newTraffic >= 40) crowdLevel = 'medium';
    if (newTraffic >= 75) crowdLevel = 'high';
    
    updateZoneManual(zoneId, { baseTraffic: parseInt(newTraffic), crowdLevel });
  };

  const handleSendEmergency = () => {
    if (emergencyText.trim()) {
      addEmergencyAlert(`EMERGENCY: ${emergencyText}`);
      setEmergencyText('');
    }
  };

  return (
    <div className="container animate-slide-up">
      <div className="admin-header">
        <h2>
          <Settings className="text-gradient" size={28} />
          Admin Control Center
        </h2>
        
        <button 
          className={`btn ${isSimulating ? 'btn-outline' : 'btn-primary'}`}
          onClick={toggleSimulation}
          style={{ width: '200px' }}
        >
          {isSimulating ? <><Pause size={18} /> Pause Simulation</> : <><Play size={18} /> Resume Simulation</>}
        </button>
      </div>

      <div className="admin-grid">
        <div className="glass-panel admin-card">
          <h3>Zone Traffic Overrides</h3>
          <p className="text-muted" style={{ marginBottom: '20px', fontSize: '0.9rem' }}>
            Manually override the traffic percentage (0-100) for any zone. This will instantly reflect on the dashboard.
          </p>

          <div className="zone-controls">
            {Object.values(zones).map(zone => (
              <div key={zone.id} className="zone-control-item">
                <div className="zone-control-header">
                  <span>{zone.name}</span>
                  <span className={`status-text ${zone.crowdLevel}`}>
                    {zone.baseTraffic}% ({zone.crowdLevel})
                  </span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={zone.baseTraffic}
                  onChange={(e) => handleCrowdChange(zone.id, e.target.value)}
                  className={`slider ${zone.crowdLevel}`}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel admin-card">
          <h3><AlertTriangle color="var(--color-danger)" size={20} /> Broadcast Emergency</h3>
          <p className="text-muted" style={{ marginBottom: '20px', fontSize: '0.9rem' }}>
            Send a global emergency alert to all users currently viewing the dashboard.
          </p>
          
          <div className="form-group">
            <textarea 
              className="form-control" 
              rows="4" 
              placeholder="Enter emergency message (e.g. 'Fire drill in progress, evacuate via nearest exit')..."
              value={emergencyText}
              onChange={(e) => setEmergencyText(e.target.value)}
            ></textarea>
          </div>
          <button 
            className="btn btn-primary" 
            style={{ backgroundColor: 'var(--color-danger)', width: '100%' }}
            onClick={handleSendEmergency}
            disabled={!emergencyText.trim()}
          >
            Broadcast Alert Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
