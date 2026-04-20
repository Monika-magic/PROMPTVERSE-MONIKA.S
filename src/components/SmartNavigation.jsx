import React, { useState } from 'react';
import { useSimulation } from '../context/SimulationContext';
import { calculateOptimalRoute } from '../utils/routing';
import { Navigation2, ArrowRight } from 'lucide-react';

const SmartNavigation = () => {
  const { zones, stadiumGraph } = useSimulation();
  const [startPoint, setStartPoint] = useState('');
  const [endPoint, setEndPoint] = useState('');
  const [routeResult, setRouteResult] = useState(null);

  const handleRouteCalculation = () => {
    if (!startPoint || !endPoint) return;
    const result = calculateOptimalRoute(startPoint, endPoint, stadiumGraph, zones);
    setRouteResult(result);
  };

  const getZoneOptions = () => {
    return Object.values(zones).map(zone => (
      <option key={zone.id} value={zone.id}>{zone.name}</option>
    ));
  };

  return (
    <div className="widget">
      <div className="widget-header">
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', fontSize: '1.1rem' }}>
          <Navigation2 size={20} className="text-gradient" />
          Smart Routing
        </h3>
      </div>
      
      <div className="form-group">
        <label className="form-label">Current Location</label>
        <select 
          className="form-control"
          value={startPoint}
          onChange={(e) => setStartPoint(e.target.value)}
        >
          <option value="">Select starting point...</option>
          {getZoneOptions()}
        </select>
      </div>
      
      <div className="form-group">
        <label className="form-label">Destination</label>
        <select 
          className="form-control"
          value={endPoint}
          onChange={(e) => setEndPoint(e.target.value)}
        >
          <option value="">Select destination...</option>
          {getZoneOptions()}
        </select>
      </div>
      
      <button 
        className="btn btn-primary" 
        style={{ width: '100%', marginTop: '8px' }}
        onClick={handleRouteCalculation}
        disabled={!startPoint || !endPoint || startPoint === endPoint}
      >
        Find Optimal Route
      </button>

      {routeResult && (
        <div style={{ marginTop: '20px', padding: '16px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ color: 'var(--text-muted)' }}>Estimated Time:</span>
            <span style={{ fontWeight: 'bold', color: 'var(--color-success)' }}>{routeResult.estimatedTime} mins</span>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Suggested Path:</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}>
              {routeResult.path.map((step, index) => (
                <React.Fragment key={index}>
                  <span style={{ 
                    color: zones[step].crowdLevel === 'high' ? 'var(--color-danger)' : 
                           zones[step].crowdLevel === 'medium' ? 'var(--color-warning)' : 'var(--text-main)'
                  }}>
                    {zones[step].name}
                  </span>
                  {index < routeResult.path.length - 1 && <ArrowRight size={14} color="var(--text-muted)" />}
                </React.Fragment>
              ))}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-warning)', marginTop: '8px' }}>
              *Route dynamically avoids highly congested areas.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SmartNavigation;
