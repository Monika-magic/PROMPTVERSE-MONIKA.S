import React from 'react';
import { useSimulation } from '../context/SimulationContext';
import { Clock } from 'lucide-react';

const WaitTimes = () => {
  const { zones } = useSimulation();

  const waitTimeZones = Object.values(zones).filter(zone => zone.type === 'food' || zone.type === 'restroom');

  return (
    <div className="widget">
      <div className="widget-header">
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', fontSize: '1.1rem' }}>
          <Clock size={20} className="text-gradient" />
          Live Wait Times
        </h3>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {waitTimeZones.map(zone => (
          <div key={zone.id} style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            padding: '12px',
            background: 'rgba(0,0,0,0.2)',
            borderRadius: '8px',
            borderLeft: `4px solid var(--color-${zone.crowdLevel === 'high' ? 'danger' : zone.crowdLevel === 'medium' ? 'warning' : 'success'})`
          }}>
            <span style={{ fontSize: '0.95rem' }}>{zone.name}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Clock size={14} color="var(--text-muted)" />
              <span style={{ 
                fontWeight: 'bold',
                color: zone.crowdLevel === 'high' ? 'var(--color-danger)' : 'var(--text-main)'
              }}>
                {zone.waitTime} min
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WaitTimes;
